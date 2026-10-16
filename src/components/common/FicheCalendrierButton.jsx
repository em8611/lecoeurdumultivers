import React from 'react';
import { exportFicheCalendrier } from '../../utils/ficheExport.js';

export default function FicheCalendrierButton({ calendrier }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheCalendrier(calendrier)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du calendrier"
    >
      📄 Fiche
    </button>
  );
}
