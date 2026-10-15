import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function ProtagonisteSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: '#0d6efd', gridColumn: '1 / -1' }}>
        Section Protagoniste
      </h4>

      <FormField
        id="protagoniste-histoire"
        label="Histoire du protagoniste"
        type="textarea"
        value={formData.protagonisteHistoire || ''}
        onChange={(e) => onInputChange('protagonisteHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire principale, origines, parcours du héros..."
        rows={6}
      />

      <FormField
        id="protagoniste-objectif-principal"
        label="Objectif principal"
        type="textarea"
        value={formData.protagonisteObjectifPrincipal || ''}
        onChange={(e) => onInputChange('protagonisteObjectifPrincipal', e.target.value)}
        containerClassName="form-full"
        placeholder="Quel est le but ultime du protagoniste ?"
        rows={4}
      />

      <FormField
        id="protagoniste-motivation"
        label="Motivation profonde"
        type="textarea"
        value={formData.protagonisteMotivation || ''}
        onChange={(e) => onInputChange('protagonisteMotivation', e.target.value)}
        containerClassName="form-full"
        placeholder="Ce qui pousse le protagoniste à agir"
        rows={4}
      />

      <FormField
        id="protagoniste-evolution"
        label="Évolution narrative"
        type="textarea"
        value={formData.protagonisteEvolution || ''}
        onChange={(e) => onInputChange('protagonisteEvolution', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage évolue au fil de l'histoire"
        rows={4}
      />
    </div>
  );
}

export default ProtagonisteSection;
