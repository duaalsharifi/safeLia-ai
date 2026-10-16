import { useContext } from "react";
import { Link } from "react-router-dom";
import AnalysisContext from "../context/AnalysisContextValue";
import { useSavedCV } from "../hooks/useSavedCV";

function describeHistoryItem(item) {
  if (item.matchedRule) return `Testord ”${item.matchedRule}” hittades. Det säger inget om företaget.`;
  if (item.source === "keyword-demo") return "Inget av de listade testorden hittades. Det betyder inte att företaget är säkert.";
  if (item.riskLevel) return `Äldre prototyputfall: ${item.riskLevel}. Det är inte en verifierad bedömning.`;
  return item.flag ?? "Äldre namnkontroll utan verifierat företagsunderlag.";
}

function Dashboard() {
  const { history } = useContext(AnalysisContext);
  const { cv, loading, error } = useSavedCV();

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex flex-col gap-4 border-b border-edge pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Din översikt</h1>
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted">Ditt sparade CV och namnkontroller på den här enheten.</p>
        </div>
        <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-strong active:scale-[0.98]">
          Hitta företag <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </header>

      <section aria-label="Ditt sparade CV" className="flex flex-col gap-2 border-b border-edge py-5 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Mitt CV</h2>
          {loading ? (
            <p className="mt-1 text-sm text-muted" role="status">Kontrollerar webbläsarens lagring…</p>
          ) : error ? (
            <p className="mt-1 text-sm leading-5 text-danger">CV:t kunde inte läsas i den här webbläsaren.</p>
          ) : cv ? (
            <p className="mt-1 break-all text-sm text-muted">{cv.name} är sparat här.</p>
          ) : (
            <p className="mt-1 text-sm text-muted">Inget CV är sparat här.</p>
          )}
        </div>
        <Link to="/cv" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">
          {loading || error || !cv ? "Öppna Mitt CV" : "Visa eller ladda ned CV"} →
        </Link>
      </section>

      <section aria-labelledby="history-heading" className="py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-edge pb-3">
          <div>
            <h2 id="history-heading" className="font-display text-xl font-semibold">Senaste namnkontroller</h2>
            <p className="mt-1 text-sm leading-5 text-muted">{history.length} {history.length === 1 ? "sparad kontroll" : "sparade kontroller"}. Ordkontroller är inte säkerhetsbedömningar.</p>
          </div>
          <Link to="/analysis" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">Gör namnkontroll →</Link>
        </div>

        {history.length ? (
          <ul className="divide-y divide-edge">
            {history.map((item, index) => (
              <li key={`${item.createdAt ?? item.company}-${index}`} className="grid gap-1 py-3 sm:grid-cols-[minmax(160px,0.5fr)_minmax(0,1fr)] sm:gap-5">
                <div>
                  <p className="font-semibold">{item.company}</p>
                  {item.createdAt && <time dateTime={item.createdAt} className="mt-1 block text-sm text-muted">{new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</time>}
                </div>
                <p className="text-sm leading-5 text-muted">{describeHistoryItem(item)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-7">
            <p className="text-sm text-muted">Inga namnkontroller har sparats ännu.</p>
            <Link to="/analysis" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">Kontrollera ett företagsnamn →</Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
