import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function HistoireSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-backstory"
        label="Histoire"
        type="textarea"
        value={formData.backstory || ''}
        onChange={(e) => onInputChange('backstory', e.target.value)}
        containerClassName="form-full"
        placeholder="Origines, évolution du personnage..."
        rows={8}
      />

      <FormField
        id="children-backstory"
        label="Comment il est enfant ?"
        type="textarea"
        value={formData.childrenBackstory || ''}
        onChange={(e) => onInputChange('childrenBackstory', e.target.value)}
        containerClassName="form-full"
        placeholder="Avant Em c'était quoi..."
        rows={4}
      />

      <FormField
        id="adolescent-backstory"
        label="Comment il est ado ?"
        type="textarea"
        value={formData.adolescentBackstory || ''}
        onChange={(e) => onInputChange('adolescentBackstory', e.target.value)}
        containerClassName="form-full"
        placeholder="Avant Em c'était quoi..."
        rows={4}
      />

      <FormField
        id="before-em-backstory"
        label="Comment il était avant Em ?"
        type="textarea"
        value={formData.beforeEmBackstory || ''}
        onChange={(e) => onInputChange('beforeEmBackstory', e.target.value)}
        containerClassName="form-full"
        placeholder="Avant Em c'était quoi..."
        rows={6}
      />

      <div className="form-full">
        <ListInput
          id="character-milestones"
          label="Moments marquants"
          values={asArray(formData.milestones)}
          onChange={(next) => onInputChange('milestones', next)}
          placeholder="Ex: Rencontre du mentor, Perte d'un allié, Transformation..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-events"
          label="Événements"
          values={asArray(formData.events)}
          onChange={(next) => onInputChange('events', next)}
          placeholder="Ex: Bataille finale, Trahison, Découverte..."
        />
      </div>
    </div>
  );
}

export default HistoireSection;
