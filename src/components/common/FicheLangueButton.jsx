import React from 'react';
import { exportFicheLangue } from '../../utils/ficheExport.js';

export default function FicheLangueButton({ langue }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheLangue(langue)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la langue"
    >
      Fiche
    </button>
  );
}
