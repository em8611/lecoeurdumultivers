// Helpers de navigation basés sur le hash de l'URL (lu par App.jsx)
export function gotoFiches() {
  window.location.hash = '#module/fiches';
}

export function gotoModule(slug) {
  window.location.hash = `#module/${slug}`;
}
