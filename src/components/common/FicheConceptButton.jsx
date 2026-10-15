import React from 'react';
import { exportFicheConcept } from '../../utils/ficheExport.js';

export default function FicheConceptButton({ concept }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheConcept(concept)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du concept"
    >
      📄 Fiche
    </button>
  );
}
