import React from 'react';
import { exportFicheRoute } from '../../utils/ficheExport.js';

export default function FicheRouteButton({ route }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheRoute(route)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la route commerciale"
    >
      Fiche
    </button>
  );
}
