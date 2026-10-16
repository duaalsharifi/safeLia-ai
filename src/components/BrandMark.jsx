import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function BrandMark({ compact = false }) {
  const { theme } = useTheme();
  return (
    <Link
      to="/"
      className="inline-flex min-w-0 items-center gap-3 rounded-lg text-ink no-underline"
      aria-label="SafeLIA AI – till företagskatalogen"
    >
      <img
        src={theme === "dark" ? "/safe-lia-mark-dark.svg" : "/safe-lia-mark.svg"}
        alt=""
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
      />
      {!compact && (
        <span className="min-w-0">
          <span className="block font-display text-lg font-bold leading-tight tracking-tight">
            SafeLIA <span className="text-brand">AI</span>
          </span>
          <span className="block text-xs leading-tight text-muted">Tryggare steg mot LIA</span>
        </span>
      )}
    </Link>
  );
}

export default BrandMark;
