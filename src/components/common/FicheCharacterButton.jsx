import React from 'react';
import { exportFicheCharacter } from '../../utils/ficheExport.js';

function FicheCharacterButton({ character }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheCharacter(character)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche technique"
    >
      Fiche
    </button>
  );
}

export default FicheCharacterButton;
