import React from 'react';
import { exportFicheUnivers } from '../../utils/ficheExport.js';

export default function FicheUniversButton({ univers }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheUnivers(univers)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'univers"
    >
      📄 Fiche
    </button>
  );
}
