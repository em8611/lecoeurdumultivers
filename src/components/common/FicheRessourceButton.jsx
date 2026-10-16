import React from 'react';
import { exportFicheRessource } from '../../utils/ficheExport.js';

export default function FicheRessourceButton({ ressource }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheRessource(ressource)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la ressource"
    >
      Fiche
    </button>
  );
}
