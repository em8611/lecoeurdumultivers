import React from 'react';
import { exportFicheTerritoire } from '../../utils/ficheExport.js';

export default function FicheTerritoireButton({ territoire }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTerritoire(territoire)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du territoire"
    >
      Fiche
    </button>
  );
}
