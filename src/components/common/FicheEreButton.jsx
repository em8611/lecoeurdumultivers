import React from 'react';
import { exportFicheEre } from '../../utils/ficheExport.js';

export default function FicheEreButton({ ere }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheEre(ere)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'ère"
    >
      📄 Fiche
    </button>
  );
}
