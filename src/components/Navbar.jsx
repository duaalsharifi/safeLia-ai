import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

const primaryLinks = [
  { to: "/", label: "Start", end: true },
  { to: "/companies", label: "Företag" },
  { to: "/analysis", label: "Kontrollera namn" },
  { to: "/cv", label: "Mitt CV" },
  { to: "/dashboard", label: "Översikt" },
];

const linkClass = ({ isActive }) =>
  `inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? "bg-brand-soft text-brand-strong" : "text-muted hover:bg-surface-soft hover:text-ink"
  }`;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-edge bg-page">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Huvudmeny" className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link to="/login" className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-ink">
            Logga in
          </Link>

           <Link
    to="/companies"
    className="inline-flex min-h-11 items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-strong"
  >
    Utforska företag →
  </Link>

        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-edge bg-surface px-3 text-sm font-semibold text-ink transition hover:bg-surface-soft active:scale-[0.98]"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Stäng" : "Meny"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Huvudmeny" className="border-t border-edge bg-surface px-4 py-2 sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {primaryLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-surface-soft">
              Logga in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
