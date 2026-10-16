import React from 'react';
import { CHARACTER_TYPES } from '../CharacterTypes.js';
import { CHARACTER_RACES, CHARACTER_ALIGNMENTS } from '../constants';
import FormField from '../../../components/common/FormField.jsx';
import ImageUploader from '../../../components/common/ImageUploader.jsx';
import { UNIVERSE_FRANCHISES } from '../../../univers/constants/franchises.js';

function BasicSection({ formData, errors, onInputChange }) {
  // Utiliser les franchises prédéfinies
  const franchises = UNIVERSE_FRANCHISES;
  return (
    <div className="form-section-card form-grid">
      {/* Images du personnage */}
      <div className="form-full form-field">
        <ImageUploader
          images={formData.images || []}
          onImagesChange={(newImages) => onInputChange('images', newImages)}
        />
      </div>
      <FormField
        id="character-name"
        label="Nom *"
        type="text"
        value={formData.name}
        onChange={(e) => onInputChange('name', e.target.value)}
        placeholder="Nom du personnage"
        error={errors.name}
      />

      <FormField
        id="character-code"
        label="Code"
        type="text"
        value={formData.code}
        onChange={(e) => onInputChange('code', e.target.value)}
        placeholder="Code ou identifiant unique"
      />

      <FormField
        id="character-type"
        label="Type"
        type="select"
        value={formData.type}
        onChange={(e) => onInputChange('type', e.target.value)}
        options={CHARACTER_TYPES}
      />

      <FormField
        id="character-race"
        label="Race"
        type="select"
        value={formData.race}
        onChange={(e) => onInputChange('race', e.target.value)}
        options={CHARACTER_RACES}
      />

      <FormField
        id="character-alignment"
        label="Alignement"
        type="select"
        value={formData.alignment}
        onChange={(e) => onInputChange('alignment', e.target.value)}
        options={CHARACTER_ALIGNMENTS}
      />

      <FormField
        id="character-age"
        label="Âge"
        type="number"
        value={formData.age}
        onChange={(e) => onInputChange('age', parseInt(e.target.value) || 0)}
        error={errors.age}
        min={0}
        max={10000}
      />

      <FormField
        id="character-origin"
        label="Origine (Franchise)"
        type="select"
        value={formData.origin}
        onChange={(e) => onInputChange('origin', e.target.value)}
        options={franchises.length > 0 ? franchises : ['Aucune franchise disponible']}
        placeholder="Sélectionner une franchise..."
      />

      <FormField
        id="character-status"
        label="Status"
        type="select"
        value={formData.status || 'Vivant'}
        onChange={(e) => onInputChange('status', e.target.value)}
        options={['Vivant', 'Mort', 'Disparu', 'Inconnu']}
      />

      <FormField
        id="character-description"
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(e) => onInputChange('description', e.target.value)}
        containerClassName="form-full"
        placeholder="Description générale du personnage"
      />

      {/* Section spécifique supprimée: gérée via l'onglet "Spécifique" dans le formulaire avancé */}
    </div>
  );
}

export default BasicSection;
