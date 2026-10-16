import React from 'react';
import { exportFicheDiscipline } from '../../utils/ficheExport.js';

export default function FicheDisciplineButton({ discipline, family }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDiscipline(discipline, family)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche"
    >
      Fiche
    </button>
  );
}
