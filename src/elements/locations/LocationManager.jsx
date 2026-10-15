import React from 'react';
import { GenericElementManager } from '../common/GenericElementManager.jsx';

function LocationManager() {
  return (
    <GenericElementManager
      category="locations"
      label="Lieux"
      icon="🗺️"
      color="#17a2b8"
      fields={[
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'climat', label: 'Climat', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}

export default LocationManager;
