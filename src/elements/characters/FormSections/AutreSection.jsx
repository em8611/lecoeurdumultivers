import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function AutreSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-notes"
        label="Notes"
        type="textarea"
        value={formData.notes || ''}
        onChange={(e) => onInputChange('notes', e.target.value)}
        containerClassName="form-full"
        placeholder="Informations diverses, détails libres..."
        rows={6}
      />

      <div className="form-full">
        <ListInput
          id="character-likes"
          label="Aime"
          values={asArray(formData.likes)}
          onChange={(next) => onInputChange('likes', next)}
          placeholder="Ex: Chocolat, Lecture, Animaux..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-dislikes"
          label="Déteste"
          values={asArray(formData.dislikes)}
          onChange={(next) => onInputChange('dislikes', next)}
          placeholder="Ex: Froid, Mensonge, Bruit..."
        />
      </div>

      <FormField
        id="character-food"
        label="Alimentation"
        type="textarea"
        value={formData.food || ''}
        onChange={(e) => onInputChange('food', e.target.value)}
        containerClassName="form-full"
        placeholder="Régime alimentaire, préférences, restrictions..."
        rows={4}
      />

      <FormField
        id="character-environment"
        label="Environnement de vie"
        type="textarea"
        value={formData.environment || ''}
        onChange={(e) => onInputChange('environment', e.target.value)}
        containerClassName="form-full"
        placeholder="Type d'habitat, climat, ambiance, lieu préféré..."
        rows={4}
      />
    </div>
  );
}

export default AutreSection;
