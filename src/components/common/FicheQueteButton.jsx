import React from 'react';
import { exportFicheQuete } from '../../utils/ficheExport.js';

export default function FicheQueteButton({ quete }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheQuete(quete)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la quête"
    >
      📄 Fiche
    </button>
  );
}
