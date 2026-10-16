import React from 'react';
import { exportFicheArtefact } from '../../utils/ficheExport.js';

export default function FicheArtefactButton({ artefact }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheArtefact(artefact)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'artefact"
    >
      Fiche
    </button>
  );
}
