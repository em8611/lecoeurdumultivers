import React from 'react';
import { exportFichePouvoir } from '../../utils/ficheExport.js';

export default function FichePouvoirButton({ pouvoir }) {
  return (
    <button
      type="button"
      onClick={() => exportFichePouvoir(pouvoir)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche du pouvoir"
    >
      Fiche
    </button>
  );
}
