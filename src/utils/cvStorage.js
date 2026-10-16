const DATABASE_NAME = "safelia-cv-v1";
const STORE_NAME = "documents";
const CV_RECORD_ID = "saved-cv";

function openDatabase() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("Den här webbläsaren stöder inte lokal fillagring."));
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () => reject(request.error ?? new Error("Kunde inte öppna CV-lagringen."));
    request.onblocked = () => reject(new Error("Stäng en annan SafeLIA-flik och försök igen."));
  });
}

function runTransaction(mode, operation) {
  return openDatabase().then((database) => new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    let result;

    try {
      result = operation(store);
    } catch (error) {
      database.close();
      reject(error);
      return;
    }

    transaction.oncomplete = () => {
      database.close();
      resolve(result?.result);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error("Kunde inte uppdatera CV-lagringen."));
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? new Error("Ändringen avbröts. Försök igen."));
    };
  }));
}

export function getSavedCV() {
  return runTransaction("readonly", (store) => store.get(CV_RECORD_ID));
}

export function saveCV(file) {
  const record = {
    id: CV_RECORD_ID,
    blob: file,
    name: file.name,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.size,
    savedAtISO: new Date().toISOString(),
  };

  return runTransaction("readwrite", (store) => store.put(record)).then(() => record);
}

export function deleteSavedCV() {
  return runTransaction("readwrite", (store) => store.delete(CV_RECORD_ID));
}
