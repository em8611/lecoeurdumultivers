import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function ObjectManager() {
  return (
    <GenericElementManager
      category="objects"
      label="Objets"
      icon="💎"
      color="#6f42c1"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'pouvoir', label: 'Pouvoir', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default ObjectManager;
