import React from 'react';
import { exportFicheCarte } from '../../utils/ficheExport.js';

export default function FicheCarteButton({ carte }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheCarte(carte)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la carte"
    >
      Fiche
    </button>
  );
}
