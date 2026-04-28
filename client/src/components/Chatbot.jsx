import { Bot, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendChatMessage } from "../services/api.js";

export default function Chatbot({ profile, prompt }) {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState(prompt || "");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Ask me about schemes for students, farmers, women, workers, or a state." }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) setMessage(prompt);
  }, [prompt]);

  async function submit(event) {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages((current) => [...current, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await sendChatMessage({ message: userMessage, language: i18n.language, profile });
      setMessages((current) => [...current, { role: "assistant", content: response.answer }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: error.response?.data?.message || "Sorry, I could not answer that right now." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <Bot size={20} />
        </span>
        <h2 className="text-lg font-bold text-ink">{t("chatbot")}</h2>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
        {messages.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={`rounded-lg px-3 py-2 text-sm leading-6 ${
              item.role === "user" ? "ml-8 bg-ink text-white" : "mr-8 bg-slate-100 text-slate-700"
            }`}
          >
            {item.content}
          </div>
        ))}
        {loading ? <div className="mr-8 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">Thinking...</div> : null}
      </div>

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field-control mt-0"
          placeholder={t("askPlaceholder")}
        />
        <button type="submit" className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white transition hover:bg-slate-700">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
