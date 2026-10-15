import React from 'react';
import { exportFicheEvenement } from '../../utils/ficheExport.js';

export default function FicheEvenementButton({ evenement }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheEvenement(evenement)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'événement"
    >
      📄 Fiche
    </button>
  );
}
