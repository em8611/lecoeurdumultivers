import React from 'react';
import { exportFicheTradition } from '../../utils/ficheExport.js';

export default function FicheTraditionButton({ tradition }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTradition(tradition)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la tradition"
    >
      📄 Fiche
    </button>
  );
}
