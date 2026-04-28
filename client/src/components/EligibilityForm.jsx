import { Mic, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const initialProfile = {
  age: "",
  gender: "female",
  state: "Maharashtra",
  income: "",
  category: "General",
  occupation: "student"
};

const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal"
];

const occupations = ["student", "farmer", "worker", "self-employed", "unemployed", "artisan", "homemaker"];

export default function EligibilityForm({ onSubmit, loading, onVoiceText }) {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState(initialProfile);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const speechSupported = useMemo(() => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition), []);

  function updateProfile(event) {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!profile.age || !profile.income) {
      setError("Age and income are required.");
      return;
    }
    setError("");
    onSubmit(profile);
  }

  function startVoiceInput() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = i18n.language === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceText(transcript);
    };
    recognition.start();
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label>
          <span className="field-label">{t("form.age")}</span>
          <input className="field-control" type="number" name="age" min="0" max="120" value={profile.age} onChange={updateProfile} placeholder="24" />
        </label>
        <label>
          <span className="field-label">{t("form.gender")}</span>
          <select className="field-control" name="gender" value={profile.gender} onChange={updateProfile}>
            <option value="female">{t("gender.female")}</option>
            <option value="male">{t("gender.male")}</option>
            <option value="other">{t("gender.other")}</option>
          </select>
        </label>
        <label>
          <span className="field-label">{t("form.state")}</span>
          <select className="field-control" name="state" value={profile.state} onChange={updateProfile}>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="field-label">{t("form.income")}</span>
          <input className="field-control" type="number" name="income" min="0" value={profile.income} onChange={updateProfile} placeholder="250000" />
        </label>
        <label>
          <span className="field-label">{t("form.category")}</span>
          <select className="field-control" name="category" value={profile.category} onChange={updateProfile}>
            {["SC", "ST", "OBC", "General"].map((category) => (
              <option key={category} value={category}>
                {t(`category.${category}`)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="field-label">{t("form.occupation")}</span>
          <select className="field-control" name="occupation" value={profile.occupation} onChange={updateProfile}>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-leaf px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Search size={18} />
          {loading ? "Checking..." : t("checkEligibility")}
        </button>
        <button
          type="button"
          onClick={() => setProfile(initialProfile)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          <RotateCcw size={18} />
          {t("reset")}
        </button>
        <button
          type="button"
          onClick={startVoiceInput}
          disabled={!speechSupported}
          title={speechSupported ? t("voice") : "Speech recognition is not supported in this browser."}
          className="icon-button disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Mic size={18} />
        </button>
        {listening ? <span className="text-sm font-semibold text-leaf">{t("listening")}</span> : null}
      </div>
    </form>
  );
}
