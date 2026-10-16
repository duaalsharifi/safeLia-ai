import CVUpload from "../components/CVUpload";
import { useSavedCV } from "../hooks/useSavedCV";

function CVPage() {
  const { cv, loading, saving, error, save, remove } = useSavedCV();

  const downloadCV = () => {
    if (!cv?.blob) return;
    const fileUrl = URL.createObjectURL(cv.blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = cv.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <header className="max-w-3xl border-b border-edge pb-5">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Mitt CV</h1>
        <p className="mt-2 max-w-prose text-sm leading-6 text-muted sm:text-base">
          Spara en fil här så att du kan ladda ned den när du kontaktar ett företag. CV:t stannar i den här webbläsaren.
        </p>
      </header>

      <div className="max-w-3xl py-6">
        <CVUpload
          cv={cv}
          onSave={save}
          onRemove={remove}
          onDownload={downloadCV}
          loading={loading}
          saving={saving}
          storageError={error}
        />
      </div>
    </div>
  );
}

export default CVPage;
