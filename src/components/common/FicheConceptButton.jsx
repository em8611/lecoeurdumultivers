import React from 'react';
import { exportFicheConcept } from '../../utils/ficheExport.js';

export default function FicheConceptButton({ concept }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheConcept(concept)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du concept"
    >
      Fiche
    </button>
  );
}
