import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AnalysisContext from "../context/AnalysisContextValue";

const TEST_WORDS = ["okänd", "påhitt", "test"];

function findRuleMatch(name) {
  const normalizedName = name.toLocaleLowerCase("sv");
  return TEST_WORDS.find((word) => normalizedName.includes(word)) ?? null;
}

function describeHistoryItem(item) {
  if (item.matchedRule) return `Testord ”${item.matchedRule}” hittades. Det säger inget om företaget.`;
  if (item.source === "keyword-demo") return "Inget av de listade testorden hittades. Det betyder inte att företaget är säkert.";
  if (item.riskLevel) return `Äldre prototyputfall: ${item.riskLevel}. Det är inte en verifierad bedömning.`;
  return item.flag ?? "Äldre namnkontroll utan verifierat företagsunderlag.";
}

function CompanyAnalysis() {
  const [company, setCompany] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { history, addAnalysis } = useContext(AnalysisContext);

  function handleAnalyze(event) {
    event.preventDefault();
    const companyName = company.trim();
    if (!companyName) {
      setError("Skriv in företagsnamnet för att göra en namnkontroll.");
      return;
    }

    setError("");
    const matchedRule = findRuleMatch(companyName);
    const analysisResult = {
      company: companyName,
      matchedRule,
      source: "keyword-demo",
      createdAt: new Date().toISOString(),
    };

    setResult(analysisResult);
    addAnalysis(analysisResult);
    setCompany("");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <header className="max-w-3xl border-b border-edge pb-5">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Kontrollera företagsnamn</h1>
        <p className="mt-2 max-w-prose text-sm leading-6 text-muted sm:text-base">
          Kontrollen letar bara efter orden ”okänd”, ”påhitt” och ”test” i texten du skriver. Den söker inte på webben och bedömer inte företaget.
        </p>
      </header>

      <div className="grid gap-7 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(230px,0.55fr)] lg:gap-12">
        <div>
          <form onSubmit={handleAnalyze} className="max-w-3xl border-b border-edge pb-6">
            <label htmlFor="company-name" className="mb-2 block text-sm font-semibold">Företagsnamn</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="company-name"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Skriv företagsnamn"
                aria-describedby={error ? "analysis-error" : "analysis-help"}
                aria-invalid={Boolean(error)}
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-edge bg-surface px-4 text-ink placeholder:text-muted"
              />
              <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-on-brand transition hover:bg-brand-strong active:scale-[0.98]">
                Gör namnkontroll
              </button>
            </div>
            {error ? (
              <p id="analysis-error" role="alert" className="mt-2 text-sm font-medium text-danger">{error}</p>
            ) : (
              <p id="analysis-help" className="mt-2 text-sm leading-5 text-muted">Skriv bara in namnet. Resultatet visar en träff eller ingen träff på dessa tre ord.</p>
            )}
          </form>

          {result && (
            <section aria-live="polite" className="max-w-3xl border-b border-edge py-6">
              <h2 className="font-display text-2xl font-semibold">Resultat av namnkontroll</h2>
              <p className="mt-3 text-sm text-muted">{result.company}</p>
              <p className="mt-1 text-base font-semibold">
                {result.matchedRule
                  ? `Testordet ”${result.matchedRule}” hittades i namnet.`
                  : "Inget av de tre testorden hittades i namnet."}
              </p>
              <p className="mt-2 max-w-prose text-sm leading-6 text-muted">
                {result.matchedRule
                  ? "Det här är en träff i ett ordtest. Den säger inget om hur tryggt företaget är."
                  : "En utebliven träff betyder inte att företaget är säkert."
                }
              </p>
              <div className="mt-5 rounded-xl bg-surface-soft p-4 text-sm leading-6 text-ink">
                <h3 className="font-semibold">Frågor att ta vidare</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Vem ansvarar för din handledning?</li>
                  <li>Vilka arbetsuppgifter ingår i LIA-perioden?</li>
                  <li>Kan din utbildningsanordnare godkänna upplägget?</li>
                </ul>
              </div>
            </section>
          )}

          <section aria-labelledby="previous-heading" className="max-w-3xl pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="previous-heading" className="font-display text-xl font-semibold">Senaste namnkontroller</h2>
              {history.length > 5 && <Link to="/dashboard" className="min-h-11 inline-flex items-center text-sm font-semibold text-brand underline underline-offset-4">Visa alla {history.length}</Link>}
            </div>
            {history.length ? (
              <ul className="mt-2 divide-y divide-edge">
                {history.slice(0, 5).map((item, index) => (
                  <li key={`${item.createdAt ?? item.company}-${index}`} className="grid gap-1 py-3 sm:grid-cols-[minmax(140px,0.65fr)_minmax(0,1fr)] sm:gap-5">
                    <span className="font-semibold">{item.company}</span>
                    <span className="text-sm leading-5 text-muted">{describeHistoryItem(item)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted">Tidigare kontroller visas här.</p>
            )}
          </section>
        </div>

        <aside className="self-start border-l-2 border-edge pl-4 sm:pl-5">
          <h2 className="font-display text-lg font-semibold">Vad du fortfarande behöver veta</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Kontakta företaget och din utbildning för att fråga om plats, handledare och upplägg. Jämför också företagets officiella kontaktväg.</p>
          <Link to="/" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">Visa officiella företagskällor →</Link>
        </aside>
      </div>
    </div>
  );
}

export default CompanyAnalysis;
