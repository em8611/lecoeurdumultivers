import React from 'react';
import { exportFicheTradition } from '../../utils/ficheExport.js';

export default function FicheTraditionButton({ tradition }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheTradition(tradition)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la tradition"
    >
      Fiche
    </button>
  );
}
