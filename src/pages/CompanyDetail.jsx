import { Link, Navigate, useParams } from "react-router-dom";
import ApplicationPreparation from "../components/ApplicationPreparation";
import { getCompanyById } from "../data/companies";

function CompanyDetail() {
  const { companyId } = useParams();
  const company = getCompanyById(companyId);

  if (!company) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-muted underline underline-offset-4 hover:text-brand">
        ← Till företagen
      </Link>

      <header className="border-b border-edge pb-6 pt-2">
        <p className="text-sm text-muted">{company.industry} <span aria-hidden="true">·</span> {company.area}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{company.name}</h1>
        <p className="mt-3 max-w-prose text-sm leading-6 text-muted">{company.evidenceSummary}</p>
      </header>

      <div className="grid gap-8 py-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <aside aria-labelledby="contact-heading" className="self-start rounded-2xl bg-brand-soft p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-strong dark:text-brand">Företagets egen sida</p>
          <h2 id="contact-heading" className="mt-2 font-display text-xl font-semibold">{company.contactLabel}</h2>
          {company.contactEmail && (
            <a href={`mailto:${company.contactEmail}`} className="mt-3 inline-flex min-h-11 items-center break-all font-semibold text-brand-strong underline underline-offset-4 dark:text-brand">
              {company.contactEmail}
            </a>
          )}
          <a href={company.contactUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-on-brand transition hover:bg-brand-strong active:scale-[0.98]">
            {company.contactActionLabel} <span aria-hidden="true" className="ml-2">↗</span>
          </a>
          <p className="mt-3 text-sm leading-5 text-ink">Du fortsätter hos företaget. SafeLIA skickar inte din ansökan eller ditt CV.</p>
        </aside>

        <div className="space-y-7">
          <section aria-labelledby="facts-heading">
            <h2 id="facts-heading" className="font-display text-2xl font-semibold">Vad vi vet</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-ink">
              {company.facts.map((fact) => <li key={fact} className="flex gap-3"><span aria-hidden="true" className="text-muted">—</span>{fact}</li>)}
            </ul>
            <p className="mt-4 text-sm leading-6 text-muted">
              Källa: <a href={company.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">{company.sourceLabel} ↗</a>
            </p>
          </section>

          <section aria-labelledby="check-heading" className="border-t border-edge pt-5">
            <h2 id="check-heading" className="font-display text-xl font-semibold">Kontrollera själv</h2>
            <p className="mt-1 text-sm leading-6 text-muted">Fråga företaget och din utbildningsanordnare innan du räknar med en LIA-plats.</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
              {company.checkQuestions.map((question) => <li key={question}>— {question}</li>)}
            </ul>
          </section>

          {company.secondaryUrl && (
            <p className="text-sm leading-6">
              <a href={company.secondaryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4 hover:text-brand-strong">
                {company.secondaryLabel} ↗
              </a>
            </p>
          )}
        </div>
      </div>

      <ApplicationPreparation />
    </div>
  );
}

export default CompanyDetail;
