import React from 'react';
import { exportFicheMythe } from '../../utils/ficheExport.js';

export default function FicheMytheButton({ mythe }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheMythe(mythe)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du mythe"
    >
      📄 Fiche
    </button>
  );
}
