function slugify(name) {
  return (name || 'element')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Exporte un élément générique (hors store global) en téléchargement JSON.
export async function exportElement(element, options = {}) {
  const fileName = `${options.module || element.category || 'element'}-${slugify(element.nom || element.name)}.json`;
  try {
    const blob = new Blob([JSON.stringify(element, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return { success: true, fileName, hint: 'Fichier téléchargé.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
