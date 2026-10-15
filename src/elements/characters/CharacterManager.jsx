import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function CharacterManager() {
  return (
    <GenericElementManager
      category="characters"
      label="Personnages"
      icon="🎭"
      color="#2196f3"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'role', label: 'Rôle', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default CharacterManager;
