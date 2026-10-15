import React from 'react';
import { exportFicheDiplomatie } from '../../utils/ficheExport.js';

export default function FicheDiplomatieButton({ relation, fromName, toName }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDiplomatie(relation, fromName, toName)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la relation diplomatique"
    >
      📄 Fiche
    </button>
  );
}
