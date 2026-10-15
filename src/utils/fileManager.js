// Capacités disponibles selon l'environnement (Electron vs navigateur web)
export function fileManagerCapabilities() {
  return {
    canSaveToProject: typeof window !== 'undefined' && !!window.api,
    fileSystemAPI: typeof window !== 'undefined' && !!window.showSaveFilePicker
  };
}

function slugify(name) {
  return (name || 'element')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function downloadJSON(data, fileName) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function saveCharacter(character) {
  const fileName = `${slugify(character.name)}.json`;
  downloadJSON({ type: 'character', ...character }, fileName);
  return { success: true, fileName };
}

export function saveLocation(location) {
  const fileName = `${slugify(location.name)}.json`;
  downloadJSON({ type: 'location', ...location }, fileName);
  return { success: true, fileName };
}

export function importElementFromFile(file, callback) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      callback({ success: true, data });
    } catch (err) {
      callback({ success: false, error: err.message });
    }
  };
  reader.onerror = () => callback({ success: false, error: 'Lecture du fichier impossible' });
  reader.readAsText(file);
}

// En mode web (pas d'Electron), on retombe simplement sur le téléchargement du fichier
export async function saveCharacterToProject(character) {
  if (!fileManagerCapabilities().canSaveToProject) {
    const result = saveCharacter(character);
    return { ...result, info: 'Mode web: fichier téléchargé au lieu d\'être enregistré dans le projet' };
  }
  try {
    const result = await window.api.saveElementToProject?.('character', character);
    return result || { success: false, error: 'API indisponible' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function saveLocationToProject(location) {
  if (!fileManagerCapabilities().canSaveToProject) {
    const result = saveLocation(location);
    return { ...result, info: 'Mode web: fichier téléchargé au lieu d\'être enregistré dans le projet' };
  }
  try {
    const result = await window.api.saveElementToProject?.('location', location);
    return result || { success: false, error: 'API indisponible' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
