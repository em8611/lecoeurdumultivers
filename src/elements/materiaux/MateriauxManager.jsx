import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function MateriauxManager() {
  return (
    <GenericElementManager
      category="materiauxs"
      label="Matériaux"
      icon="⚒️"
      color="#6c757d"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'rarete', label: 'Rareté', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default MateriauxManager;
