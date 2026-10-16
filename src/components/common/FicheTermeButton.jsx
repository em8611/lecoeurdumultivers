import React from 'react';
import { exportFicheTerme } from '../../utils/ficheExport.js';

export default function FicheTermeButton({ terme }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTerme(terme)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du terme"
    >
      Fiche
    </button>
  );
}
