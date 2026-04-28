import OpenAI from "openai";
import { z } from "zod";
import { getAllSchemes } from "../services/schemeRepository.js";
import { searchSchemes } from "../services/eligibilityService.js";

const chatSchema = z.object({
  message: z.string().min(2).max(1000),
  language: z.enum(["en", "hi"]).default("en"),
  profile: z
    .object({
      age: z.coerce.number().optional(),
      gender: z.string().optional(),
      state: z.string().optional(),
      income: z.coerce.number().optional(),
      category: z.string().optional(),
      occupation: z.string().optional()
    })
    .optional()
});

function fallbackAnswer(message, schemes, language) {
  const matches = searchSchemes(message, schemes).slice(0, 5);
  if (!matches.length) {
    return language === "hi"
      ? "मुझे आपके सवाल से कोई सटीक योजना नहीं मिली। आप occupation, state, income या category के साथ फिर पूछें।"
      : "I could not find an exact scheme from that query. Try asking with occupation, state, income, or category.";
  }

  const names = matches.map((scheme) => scheme.name).join(", ");
  return language === "hi"
    ? `आपके सवाल के आधार पर ये योजनाएं उपयोगी हो सकती हैं: ${names}. पात्रता जांचने के लिए फॉर्म भरें।`
    : `Based on your query, these schemes may be useful: ${names}. Fill the eligibility form to confirm matches.`;
}

export async function chat(req, res, next) {
  try {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      const error = new Error("Invalid chat request");
      error.statusCode = 400;
      error.details = parsed.error.flatten();
      throw error;
    }

    const { message, language, profile } = parsed.data;
    const schemes = await getAllSchemes();

    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        answer: fallbackAnswer(message, schemes, language),
        source: "rule-based-fallback"
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const schemeContext = schemes
      .map((scheme) => `${scheme.name}: ${scheme.description}. Benefits: ${scheme.benefits.join("; ")}. Link: ${scheme.link}`)
      .join("\n");

    try {
      const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You are an assistant for an Indian Government Scheme Finder app. Answer briefly, mention relevant schemes from the provided dataset, avoid legal guarantees, and tell users to verify on official portals. Reply in Hindi when language is hi, otherwise English."
          },
          {
            role: "user",
            content: `Dataset:\n${schemeContext}\n\nUser profile: ${JSON.stringify(profile || {})}\n\nQuestion: ${message}`
          }
        ]
      });

      return res.json({
        answer: response.choices[0]?.message?.content || fallbackAnswer(message, schemes, language),
        source: "openai"
      });
    } catch (openAiError) {
      return res.json({
        answer: fallbackAnswer(message, schemes, language),
        source: "openai-fallback",
        warning: process.env.NODE_ENV === "production" ? undefined : openAiError.message
      });
    }
  } catch (error) {
    next(error);
  }
}
