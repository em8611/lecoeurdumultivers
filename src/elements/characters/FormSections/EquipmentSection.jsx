import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function EquipmentSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-main-weapon"
        label="Arme principale"
        type="text"
        value={formData.mainWeapon || ''}
        onChange={(e) => onInputChange('mainWeapon', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Épée longue, Arc composite..."
      />

      <FormField
        id="character-armor"
        label="Armure"
        type="text"
        value={formData.armor || ''}
        onChange={(e) => onInputChange('armor', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Cotte de mailles, Robe enchantée..."
      />

      <FormField
        id="character-communication-device"
        label="Appareil de communication"
        type="text"
        value={formData.communicationDevice || ''}
        onChange={(e) => onInputChange('communicationDevice', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Téléphone, Radio, Cristal de communication..."
      />

      <FormField
        id="character-pendant"
        label="Pendentif"
        type="text"
        value={formData.pendant || ''}
        onChange={(e) => onInputChange('pendant', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Médaillon, Amulette, Pierre précieuse..."
      />

      <div className="form-full">
        <ListInput
          id="character-equipment"
          label="Équipement / Objets"
          values={asArray(formData.equipment)}
          onChange={(next) => onInputChange('equipment', next)}
          placeholder="Ex: Épée enchantée, Potion de soin, Grimoire..."
        />
      </div>
    </div>
  );
}

export default EquipmentSection;
