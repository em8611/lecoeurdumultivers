import React from 'react';
import { exportFicheEquipe } from '../../utils/ficheExport.js';

export default function FicheEquipeButton({ equipe }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheEquipe(equipe)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'équipe"
    >
      📄 Fiche
    </button>
  );
}
