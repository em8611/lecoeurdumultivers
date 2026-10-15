// Import générique multi-fichiers JSON (utilisé par les modules listant plusieurs éléments)
export function importElementsFromFiles(files, callback) {
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        callback({ success: true, data, fileName: file.name });
      } catch (err) {
        callback({ success: false, error: err.message, fileName: file.name });
      }
    };
    reader.onerror = () => callback({ success: false, error: 'Lecture du fichier impossible', fileName: file.name });
    reader.readAsText(file);
  });
}
