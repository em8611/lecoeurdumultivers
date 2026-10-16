import React from 'react';
import { exportFicheArtefact } from '../../utils/ficheExport.js';

export default function FicheArtefactButton({ artefact }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheArtefact(artefact)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'artefact"
    >
      📄 Fiche
    </button>
  );
}
