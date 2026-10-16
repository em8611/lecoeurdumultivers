import React from 'react';
import { exportFicheEvenement } from '../../utils/ficheExport.js';

export default function FicheEvenementButton({ evenement }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheEvenement(evenement)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de l'événement"
    >
      Fiche
    </button>
  );
}
