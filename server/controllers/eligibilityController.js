import { z } from "zod";
import { getAllSchemes } from "../services/schemeRepository.js";
import { filterEligibleSchemes } from "../services/eligibilityService.js";

export const profileSchema = z.object({
  age: z.coerce.number().int().min(0).max(120),
  gender: z.enum(["male", "female", "other"]),
  state: z.string().min(2).max(80),
  income: z.coerce.number().min(0).max(100000000),
  category: z.enum(["SC", "ST", "OBC", "General"]),
  occupation: z.string().min(2).max(80)
});

export async function checkEligibility(req, res, next) {
  try {
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      const error = new Error("Invalid eligibility form data");
      error.statusCode = 400;
      error.details = parsed.error.flatten();
      throw error;
    }

    const schemes = await getAllSchemes();
    const eligibleSchemes = filterEligibleSchemes(parsed.data, schemes);

    res.json({
      profile: parsed.data,
      count: eligibleSchemes.length,
      schemes: eligibleSchemes
    });
  } catch (error) {
    next(error);
  }
}
