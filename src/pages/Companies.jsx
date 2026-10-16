import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CompanyList from "../components/CompanyList";
import { companies, evidenceFilters, locationFacets } from "../data/companies";

function Home() {
  const [query, setQuery] = useState("");
  const [locationFacet, setLocationFacet] = useState("");
  const [evidenceKind, setEvidenceKind] = useState("");

  const visibleCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("sv");

    return companies.filter((company) => {
      const matchesQuery = !normalizedQuery || [
        company.name,
        company.industry,
        company.area,
        company.summary,
        company.evidenceLabel,
        company.sourceLabel,
      ].some((value) => value.toLocaleLowerCase("sv").includes(normalizedQuery));
      const matchesLocation = !locationFacet || company.locationFacet === locationFacet;
      const matchesEvidence = !evidenceKind || company.evidenceKind === evidenceKind;
      return matchesQuery && matchesLocation && matchesEvidence;
    });
  }, [evidenceKind, locationFacet, query]);

  const resetFilters = () => {
    setQuery("");
    setLocationFacet("");
    setEvidenceKind("");
  };

  const activeFilters = [
    query.trim() ? `sökning ”${query.trim()}”` : null,
    locationFacet || null,
    evidenceKind ? evidenceFilters.find((filter) => filter.value === evidenceKind)?.label : null,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-9 lg:px-8">
      <header className="border-b border-edge pb-5 sm:pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Hitta företag att kontakta för din LIA
          </h1>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-muted" aria-live="polite">
            {visibleCompanies.length} av {companies.length} företag
          </p>
        </div>
        <p className="mt-2 max-w-prose text-sm leading-6 text-muted sm:text-base">
          Jämför företagets egna kontaktväg och vad som faktiskt står om LIA.
        </p>
      </header>

      <section aria-label="Sök och filtrera företag" className="py-5 sm:py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(240px,1fr)_190px_220px] sm:items-end">
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <label htmlFor="company-search" className="mb-2 block text-sm font-semibold">Sök företag</label>
            <div className="flex min-h-12 items-center gap-2 rounded-xl border border-edge bg-surface px-3 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <input
                id="company-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Företagsnamn eller bransch"
                className="min-h-11 min-w-0 flex-1 bg-transparent py-2 text-sm text-ink placeholder:text-muted"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-semibold text-muted hover:bg-surface-soft hover:text-ink"
                  aria-label="Rensa sökning"
                >
                  Rensa
                </button>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="location-filter" className="mb-2 block text-sm font-semibold">Ort enligt källa</label>
            <select
              id="location-filter"
              value={locationFacet}
              onChange={(event) => setLocationFacet(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-edge bg-surface px-3 text-sm text-ink transition focus:border-brand"
            >
              <option value="">Alla orter</option>
              {locationFacets.map((facet) => <option key={facet} value={facet}>{facet}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="evidence-filter" className="mb-2 block text-sm font-semibold">Underlag för LIA</label>
            <select
              id="evidence-filter"
              value={evidenceKind}
              onChange={(event) => setEvidenceKind(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-edge bg-surface px-3 text-sm text-ink transition focus:border-brand"
            >
              <option value="">Alla kontaktvägar</option>
              {evidenceFilters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3 flex min-h-8 flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted" aria-live="polite">
            {activeFilters.length > 0 ? `Filter: ${activeFilters.join(" · ")}` : "LIA-status beskriver källan – inte om en plats är ledig."}
          </p>
          {activeFilters.length > 0 && visibleCompanies.length > 0 && (
            <button type="button" onClick={resetFilters} className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-semibold text-brand underline underline-offset-4 hover:bg-brand-soft">
              Rensa sökning och filter
            </button>
          )}
        </div>
      </section>

      <section aria-labelledby="directory-heading">
        <div className="mb-1 flex items-end justify-between gap-3">
          <h2 id="directory-heading" className="font-display text-xl font-semibold sm:text-2xl">
            Företag att undersöka
          </h2>
          <Link to="/analysis" className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-muted underline underline-offset-4 hover:text-brand">
            Kontrollera namn
          </Link>
        </div>
        <CompanyList companies={visibleCompanies} onReset={resetFilters} />
      </section>

      <p className="mt-5 max-w-prose text-sm leading-6 text-muted">
        En kontaktväg är en början, inte ett löfte. Kontrollera alltid plats, period och handledning med företaget och din utbildning.
      </p>
    </div>
  );
}

export default Home;
