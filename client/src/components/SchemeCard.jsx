import { ExternalLink, FileCheck2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function BulletList({ title, items }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-slate-900">{title}</h4>
      <ul className="space-y-1 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <FileCheck2 size={15} className="mt-0.5 flex-none text-leaf" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SchemeCard({ scheme }) {
  const { t } = useTranslation();

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">{scheme.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{scheme.description}</p>
        </div>
        <a
          href={scheme.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-leaf px-3 py-2 text-sm font-bold text-leaf transition hover:bg-green-50"
        >
          {t("apply")}
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <BulletList title={t("sections.benefits")} items={scheme.benefits} />
        <BulletList title={t("sections.eligibility")} items={scheme.eligibilityText} />
        <BulletList title={t("sections.documents")} items={scheme.requiredDocuments} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {scheme.tags?.map((tag) => (
          <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
