import React from 'react';
import { exportFicheRoute } from '../../utils/ficheExport.js';

export default function FicheRouteButton({ route }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheRoute(route)}
      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de la route commerciale"
    >
      📄 Fiche
    </button>
  );
}
