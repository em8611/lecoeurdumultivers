import React from 'react';
import { exportFicheDiscipline } from '../../utils/ficheExport.js';

export default function FicheDisciplineButton({ discipline, family }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDiscipline(discipline, family)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche"
    >
      📄 Fiche
    </button>
  );
}
