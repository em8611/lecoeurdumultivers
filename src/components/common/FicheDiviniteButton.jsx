import React from 'react';
import { exportFicheDivinite } from '../../utils/ficheExport.js';

export default function FicheDiviniteButton({ divinite }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDivinite(divinite)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la divinité"
    >
      📄 Fiche
    </button>
  );
}
