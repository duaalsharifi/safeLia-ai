import { useCallback, useEffect, useState } from "react";
import AnalysisContext from "./AnalysisContextValue";

const STORAGE_KEY = "analyses";

function readAnalysisHistory() {
  try {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (!savedHistory) return [];
    const parsedHistory = JSON.parse(savedHistory);
    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch {
    return [];
  }
}

export function AnalysisProvider({ children }) {
  const [history, setHistory] = useState(readAnalysisHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Existing history remains available for the current session.
    }
  }, [history]);

  useEffect(() => {
    const syncFromAnotherTab = (event) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        const nextHistory = event.newValue ? JSON.parse(event.newValue) : [];
        setHistory(Array.isArray(nextHistory) ? nextHistory : []);
      } catch {
        setHistory([]);
      }
    };
    window.addEventListener("storage", syncFromAnotherTab);
    return () => window.removeEventListener("storage", syncFromAnotherTab);
  }, []);

  const addAnalysis = useCallback((analysis) => {
    setHistory((previousHistory) => [analysis, ...previousHistory]);
  }, []);

  return (
    <AnalysisContext.Provider value={{ history, addAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}
