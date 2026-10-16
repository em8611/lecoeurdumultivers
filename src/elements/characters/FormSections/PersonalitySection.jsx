import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function PersonalitySection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-behavior"
        label="Comportement"
        type="textarea"
        value={formData.behavior || ''}
        onChange={(e) => onInputChange('behavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Attitude générale, réactions typiques, posture sociale..."
        rows={9}
      />

      <div className="form-full">
        <ListInput
          id="character-personality-traits"
          label="Traits de personnalité"
          values={asArray(formData.personalityTraits)}
          onChange={(next) => onInputChange('personalityTraits', next)}
          placeholder="Ex: Courageux, Empathique, Impulsif..."
        />
      </div>

      <FormField
        id="character-language-style"
        label="Langage / Style de parole"
        type="textarea"
        value={formData.languageStyle || ''}
        onChange={(e) => onInputChange('languageStyle', e.target.value)}
        containerClassName="form-full"
        placeholder="Ex: Parle vite, accent, ton, tics de langage..."
        rows={4}
      />

      <div className="form-full">
        <ListInput
          id="character-goals"
          label="Objectifs / Motivations"
          values={asArray(formData.goals)}
          onChange={(next) => onInputChange('goals', next)}
          placeholder="Ex: Sauver le monde, Venger sa famille..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-strengths"
          label="Forces"
          values={asArray(formData.strengths)}
          onChange={(next) => onInputChange('strengths', next)}
          placeholder="Ex: Intelligent, Persévérant, Force physique..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-fears"
          label="Peurs / Faiblesses"
          values={asArray(formData.fears)}
          onChange={(next) => onInputChange('fears', next)}
          placeholder="Ex: Araignées, Solitude, Échec..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-values"
          label="Valeurs"
          values={asArray(formData.values)}
          onChange={(next) => onInputChange('values', next)}
          placeholder="Ex: Justice, Loyauté, Famille..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-gestures"
          label="Gestes"
          values={asArray(formData.gestures)}
          onChange={(next) => onInputChange('gestures', next)}
          placeholder="Ex: Hausser les épaules, Se gratter la tête..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-mannerisms"
          label="Maniérismes"
          values={asArray(formData.mannerisms)}
          onChange={(next) => onInputChange('mannerisms', next)}
          placeholder="Ex: Évite le regard, Tapote du pied..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-passions"
          label="Passions"
          values={asArray(formData.passions)}
          onChange={(next) => onInputChange('passions', next)}
          placeholder="Ex: Musique, Lecture, Combat..."
        />
      </div>
    </div>
  );
}

export default PersonalitySection;
