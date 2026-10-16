import { Link } from "react-router-dom";

function CompanyList({ companies, onReset }) {
  if (companies.length === 0) {
    return (
      <div className="flex flex-col gap-4 border-y border-edge py-7 sm:flex-row sm:items-center sm:justify-between" role="status">
        <div>
          <h2 className="font-display text-xl font-semibold">Inga företag matchar just nu</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Ändra sökningen eller återställ filtret för att visa alla fyra företagen.</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-edge px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-soft active:scale-[0.98]"
        >
          Rensa sökning och filter
        </button>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-edge">
      {companies.map((company) => (
        <li key={company.id} className="py-5 sm:py-6">
          <article className="grid gap-x-7 gap-y-3 sm:grid-cols-[minmax(150px,0.7fr)_minmax(220px,1.2fr)_minmax(190px,auto)] sm:items-center">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                <Link to={`/companies/${company.id}`} className="rounded-sm text-ink decoration-brand decoration-2 underline-offset-4 hover:text-brand hover:underline">
                  {company.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-5 text-muted">{company.area}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{company.industry}</p>
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Underlag för LIA</p>
              <p className={`mt-1 text-sm font-semibold leading-5 ${company.evidenceKind === "lia-application" ? "text-brand-strong dark:text-brand" : "text-ink"}`}>
                {company.evidenceLabel}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted">{company.evidenceSummary}</p>
            </div>

            <div className="flex flex-col items-start gap-1 sm:items-end sm:text-right">
              <a
                href={company.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-strong active:scale-[0.98] sm:w-auto"
              >
                {company.contactActionLabel} <span aria-hidden="true" className="ml-2">↗</span>
              </a>
              <Link to={`/companies/${company.id}`} className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-muted underline decoration-edge underline-offset-4 hover:text-brand hover:decoration-brand">
                Fakta och källor
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default CompanyList;
