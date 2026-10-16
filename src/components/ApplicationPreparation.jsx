import { Link } from "react-router-dom";
import { useSavedCV } from "../hooks/useSavedCV";

function ApplicationPreparation() {
  const { cv, loading, error } = useSavedCV();

  return (
    <section aria-labelledby="cv-preparation-heading" className="mt-8 border-t border-edge pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-prose">
          <h2 id="cv-preparation-heading" className="font-display text-lg font-semibold">Förbered med ditt CV</h2>
          {loading ? (
            <p className="mt-1 text-sm leading-6 text-muted" role="status">Kontrollerar om ett CV finns sparat…</p>
          ) : error ? (
            <p className="mt-1 text-sm leading-6 text-danger">CV:t kunde inte läsas i den här webbläsaren.</p>
          ) : cv ? (
            <p className="mt-1 break-words text-sm leading-6 text-muted">{cv.name} är sparat här. Ladda ned filen och bifoga den själv på företagets webbplats om de ber om det.</p>
          ) : (
            <p className="mt-1 text-sm leading-6 text-muted">Inget CV är sparat här ännu. Ladda ned och bifoga ditt CV själv hos företaget.</p>
          )}
        </div>
        <Link to="/cv" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-edge px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-soft">
          {loading || error || !cv ? "Öppna Mitt CV" : "Visa eller ladda ned CV"} <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}

export default ApplicationPreparation;
