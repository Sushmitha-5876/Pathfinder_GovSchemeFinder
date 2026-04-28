import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Chatbot from "../components/Chatbot.jsx";
import EligibilityForm from "../components/EligibilityForm.jsx";
import LanguageToggle from "../components/LanguageToggle.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import { checkEligibility, getSchemes } from "../services/api.js";

export default function HomePage() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [profile, setProfile] = useState(null);
  const [voicePrompt, setVoicePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showingEligible, setShowingEligible] = useState(false);

  useEffect(() => {
    getSchemes()
      .then((data) => setSchemes(data.schemes))
      .catch((err) => setError(err.response?.data?.message || "Could not load schemes."));
  }, []);

  async function handleEligibility(formProfile) {
    setLoading(true);
    setError("");
    try {
      const data = await checkEligibility(formProfile);
      setProfile(data.profile);
      setSchemes(data.schemes);
      setShowingEligible(true);
    } catch (err) {
      setError(err.response?.data?.message || "Eligibility check failed.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAllSchemes() {
    setShowingEligible(false);
    setError("");
    const data = await getSchemes();
    setSchemes(data.schemes);
  }

  function handleVoiceText(text) {
    setVoicePrompt(text);
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-saffron">India welfare discovery</p>
            <h1 className="text-2xl font-black text-ink">{t("appName")}</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="mb-5">
              <h2 className="max-w-3xl text-3xl font-black leading-tight text-ink sm:text-5xl">{t("heroTitle")}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{t("heroSubtitle")}</p>
            </div>
            <EligibilityForm onSubmit={handleEligibility} loading={loading} onVoiceText={handleVoiceText} />
          </div>
          <Chatbot profile={profile} prompt={voicePrompt} />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-ink">{showingEligible ? t("eligibleSchemes") : t("allSchemes")}</h2>
              <p className="text-sm text-slate-500">{schemes.length} schemes found</p>
            </div>
            {showingEligible ? (
              <button type="button" onClick={loadAllSchemes} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                {t("allSchemes")}
              </button>
            ) : null}
          </div>

          {error ? <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div> : null}

          {schemes.length ? (
            <div className="grid gap-4">
              {schemes.map((scheme) => (
                <SchemeCard key={scheme.slug || scheme._id} scheme={scheme} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-600">{t("noResults")}</div>
          )}
        </section>
      </main>
    </div>
  );
}
