import { createContext, useContext } from "react";

const ThemeContext = createContext(null);
export default ThemeContext;

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme måste användas i ThemeProvider.");
  return context;
}
