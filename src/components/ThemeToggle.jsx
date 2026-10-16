import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "ljust" : "mörkt";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Byt till ${nextTheme} läge`}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-edge bg-surface text-sm font-semibold text-ink transition-colors hover:bg-surface-soft active:scale-[0.98] ${compact ? "min-w-[4.75rem] px-2" : "px-3"}`}
    >
      <span aria-hidden="true" className="text-coral">{theme === "dark" ? "☼" : "◐"}</span>
      <span>{theme === "dark" ? compact ? "Ljust" : "Ljust läge" : compact ? "Mörkt" : "Mörkt läge"}</span>
    </button>
  );
}

export default ThemeToggle;
