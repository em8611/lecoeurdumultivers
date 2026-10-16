import React from 'react';
import { exportFicheQuete } from '../../utils/ficheExport.js';

export default function FicheQueteButton({ quete }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheQuete(quete)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la quête"
    >
      Fiche
    </button>
  );
}
