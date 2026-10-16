import { useCallback, useEffect, useState } from "react";
import { deleteSavedCV, getSavedCV, saveCV as persistCV } from "../utils/cvStorage";

export function useSavedCV() {
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getSavedCV()
      .then((savedCV) => {
        if (active) setCV(savedCV ?? null);
      })
      .catch(() => {
        if (active) setError("CV-lagringen kunde inte läsas. Kontrollera webbläsarens inställningar och försök igen.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const save = useCallback(async (file) => {
    setSaving(true);
    setError("");
    try {
      const savedCV = await persistCV(file);
      setCV(savedCV);
      return savedCV;
    } catch {
      setError("CV:t kunde inte sparas. Kontrollera att webbläsaren tillåter lokal lagring och att det finns ledigt utrymme.");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async () => {
    setSaving(true);
    setError("");
    try {
      await deleteSavedCV();
      setCV(null);
      return true;
    } catch {
      setError("CV:t kunde inte tas bort från webbläsarens lagring. Försök igen.");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { cv, loading, saving, error, save, remove };
}
