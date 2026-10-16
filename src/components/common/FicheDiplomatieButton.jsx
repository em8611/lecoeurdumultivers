import React from 'react';
import { exportFicheDiplomatie } from '../../utils/ficheExport.js';

export default function FicheDiplomatieButton({ relation, fromName, toName }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDiplomatie(relation, fromName, toName)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la relation diplomatique"
    >
      Fiche
    </button>
  );
}
