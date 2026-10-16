import { useRef, useState } from "react";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const EXTENSION_PATTERN = /\.(pdf|doc|docx)$/i;
const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/x-pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function formatFileSize(sizeBytes) {
  if (sizeBytes < 1024 * 1024) return `${Math.max(1, Math.round(sizeBytes / 1024))} kB`;
  return `${(sizeBytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function validateFile(file) {
  if (!EXTENSION_PATTERN.test(file.name)) {
    return "Välj en PDF-, DOC- eller DOCX-fil.";
  }
  if (file.type && !ACCEPTED_MIME_TYPES.has(file.type)) {
    return "Filen har ett format som inte stöds. Välj en PDF-, DOC- eller DOCX-fil.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Filen är större än 10 MB. Välj en mindre fil.";
  }
  if (file.size === 0) {
    return "Filen verkar vara tom. Välj ett annat CV.";
  }
  return "";
}

function CVUpload({ cv, onSave, onRemove, onDownload, loading, saving, storageError }) {
  const inputRef = useRef(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const errorId = validationError ? "cv-file-error" : storageError ? "cv-storage-error" : undefined;

  const chooseFile = (file) => {
    setValidationError("");
    setMessage("");
    if (!file) return;
    const nextError = validateFile(file);
    if (nextError) {
      setPendingFile(null);
      setValidationError(nextError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setPendingFile(file);
  };

  const saveFile = async () => {
    if (!pendingFile) return;
    const savedFile = await onSave(pendingFile);
    if (savedFile) {
      setPendingFile(null);
      setValidationError("");
      setMessage(`CV:t ${savedFile.name} sparades i den här webbläsaren.`);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeFile = async () => {
    if (!window.confirm("Ta bort ditt sparade CV från den här webbläsaren?")) return;
    const removed = await onRemove();
    if (removed) {
      setPendingFile(null);
      setMessage("CV:t har tagits bort från den här webbläsaren.");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  };

  const savedAt = cv?.savedAtISO
    ? new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date(cv.savedAtISO))
    : null;

  return (
    <section aria-labelledby="cv-upload-heading">
      <h2 id="cv-upload-heading" className="font-display text-2xl font-semibold">Spara ett CV</h2>
      <p className="mt-2 text-sm leading-6 text-muted">PDF, DOC eller DOCX · högst 10 MB. CV:t sparas bara i den här webbläsaren.</p>

      <div
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`mt-4 rounded-xl border-2 border-dashed p-4 transition-colors sm:p-5 ${
          validationError || storageError
            ? "border-danger bg-surface"
            : dragging
              ? "border-brand bg-brand-soft"
              : "border-edge bg-surface"
        }`}
      >
        <label htmlFor="cv-file" className="block cursor-pointer font-semibold text-ink">Välj CV-fil</label>
        <p className="mt-1 text-sm leading-5 text-muted">Välj en fil från enheten eller släpp den här.</p>
        <input
          ref={inputRef}
          id="cv-file"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-describedby={[
            "cv-file-help",
            errorId,
            pendingFile ? "cv-pending-status" : null,
          ].filter(Boolean).join(" ")}
          aria-invalid={Boolean(validationError)}
          className="mt-3 block min-h-12 w-full cursor-pointer rounded-lg border border-edge bg-page text-sm text-ink file:mr-4 file:min-h-12 file:border-0 file:bg-brand-soft file:px-4 file:font-semibold file:text-brand-strong hover:file:bg-surface-soft focus-visible:outline-offset-2"
          onChange={(event) => chooseFile(event.target.files?.[0])}
          disabled={loading || saving}
        />
        <p id="cv-file-help" className="mt-2 text-sm leading-5 text-muted">SafeLIA granskar eller delar inte filen med företag.</p>
        {validationError && <p id="cv-file-error" role="alert" className="mt-3 text-sm font-semibold text-danger">{validationError}</p>}
        {storageError && <p id="cv-storage-error" role="alert" className="mt-3 text-sm font-semibold text-danger">{storageError}</p>}
      </div>

      {message && <p aria-live="polite" className="mt-3 text-sm font-semibold text-brand-strong dark:text-brand">{message}</p>}

      {pendingFile && (
        <div id="cv-pending-status" className="mt-4 flex flex-col gap-3 border-b border-edge py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">Vald fil — inte sparad</p>
            <p className="mt-1 break-all text-sm text-muted">{pendingFile.name} · {formatFileSize(pendingFile.size)}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={saveFile} disabled={saving} className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-strong disabled:cursor-wait disabled:opacity-60 active:scale-[0.98]">
              {saving ? "Sparar…" : "Spara CV i webbläsaren"}
            </button>
            <button type="button" onClick={() => setPendingFile(null)} disabled={saving} className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-surface-soft">
              Avbryt
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="mt-4 text-sm text-muted" role="status">Hämtar sparat CV…</p>
      ) : cv ? (
        <div className="mt-4 flex flex-col gap-3 border-y border-edge py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">Sparat CV</p>
            <p className="mt-1 break-all text-sm text-muted">{cv.name}</p>
            <p className="mt-1 text-sm text-muted">{formatFileSize(cv.sizeBytes)}{savedAt ? ` · sparat ${savedAt}` : ""}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={() => onDownload?.(cv)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-strong active:scale-[0.98]">Ladda ned CV</button>
            <button type="button" onClick={() => inputRef.current?.click()} disabled={saving} className="inline-flex min-h-11 items-center rounded-full border border-edge px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-soft">Byt ut</button>
            <button type="button" onClick={removeFile} disabled={saving} className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-surface-soft">Ta bort</button>
          </div>
        </div>
      ) : !storageError && !pendingFile ? (
        <p className="mt-4 border-y border-edge py-3 text-sm text-muted">Inget CV är sparat i den här webbläsaren.</p>
      ) : null}

      <p className="mt-4 text-sm leading-5 text-muted">När du kontaktar ett företag laddar du ned CV:t och bifogar det själv på företagets webbplats.</p>
    </section>
  );
}

export default CVUpload;
