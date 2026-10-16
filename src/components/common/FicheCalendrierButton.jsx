import React from 'react';
import { exportFicheCalendrier } from '../../utils/ficheExport.js';

export default function FicheCalendrierButton({ calendrier }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheCalendrier(calendrier)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du calendrier"
    >
      Fiche
    </button>
  );
}
