import React from 'react';
import { exportFicheTerme } from '../../utils/ficheExport.js';

export default function FicheTermeButton({ terme }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTerme(terme)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du terme"
    >
      📄 Fiche
    </button>
  );
}
