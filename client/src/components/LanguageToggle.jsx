import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
      <Languages size={18} className="ml-2 text-slate-500" />
      {["en", "hi"].map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => i18n.changeLanguage(lang)}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
            i18n.language === lang ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
