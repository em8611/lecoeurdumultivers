import React from 'react';
import { exportFicheTransport } from '../../utils/ficheExport.js';

export default function FicheTransportButton({ transport }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTransport(transport)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du moyen de transport"
    >
      📄 Fiche
    </button>
  );
}
