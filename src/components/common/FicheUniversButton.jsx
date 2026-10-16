import React from 'react';
import { exportFicheUnivers } from '../../utils/ficheExport.js';

export default function FicheUniversButton({ univers }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheUnivers(univers)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'univers"
    >
      Fiche
    </button>
  );
}
