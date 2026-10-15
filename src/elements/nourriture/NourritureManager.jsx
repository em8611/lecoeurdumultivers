import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function NourritureManager() {
  return (
    <GenericElementManager
      category="nourritures"
      label="Nourriture"
      icon="🍖"
      color="#fd7e14"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'origine', label: 'Origine culinaire', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default NourritureManager;
