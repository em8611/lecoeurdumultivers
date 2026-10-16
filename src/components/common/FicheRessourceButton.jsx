import React from 'react';
import { exportFicheRessource } from '../../utils/ficheExport.js';

export default function FicheRessourceButton({ ressource }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheRessource(ressource)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la ressource"
    >
      📄 Fiche
    </button>
  );
}
