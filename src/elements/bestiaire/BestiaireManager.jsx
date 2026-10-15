import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function BestiaireManager() {
  return (
    <GenericElementManager
      category="bestiaires"
      label="Bestiaire"
      icon="🐉"
      color="#28a745"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'habitat', label: 'Habitat', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default BestiaireManager;
