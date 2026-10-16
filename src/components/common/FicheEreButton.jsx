import React from 'react';
import { exportFicheEre } from '../../utils/ficheExport.js';

export default function FicheEreButton({ ere }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheEre(ere)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'ère"
    >
      Fiche
    </button>
  );
}
