import React from 'react';
import { exportFicheCarte } from '../../utils/ficheExport.js';

export default function FicheCarteButton({ carte }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheCarte(carte)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la carte"
    >
      📄 Fiche
    </button>
  );
}
