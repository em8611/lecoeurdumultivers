import React from 'react';
import { exportFicheDivinite } from '../../utils/ficheExport.js';

export default function FicheDiviniteButton({ divinite }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheDivinite(divinite)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la divinité"
    >
      Fiche
    </button>
  );
}
