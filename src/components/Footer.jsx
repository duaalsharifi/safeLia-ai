import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-edge bg-page">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="max-w-prose text-sm leading-5 text-muted">
          SafeLIA visar officiella kontaktvägar att undersöka — inte garanterade LIA-platser.
        </p>
        <nav aria-label="Sidfot" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted">
          <Link className="min-h-11 inline-flex items-center hover:text-brand" to="/">Företag</Link>
          <Link className="min-h-11 inline-flex items-center hover:text-brand" to="/analysis">Kontrollera namn</Link>
          <Link className="min-h-11 inline-flex items-center hover:text-brand" to="/cv">Mitt CV</Link>
          <Link className="min-h-11 inline-flex items-center hover:text-brand" to="/dashboard">Översikt</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
