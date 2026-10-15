import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function RelationshipsSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-family-behavior"
        label="Comportement envers la famille"
        type="textarea"
        value={formData.familyBehavior || ''}
        onChange={(e) => onInputChange('familyBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage se comporte avec les membres de sa famille..."
        rows={4}
      />

      <FormField
        id="character-others-protectors-behavior"
        label="Comportement envers les autres protecteurs"
        type="textarea"
        value={formData.othersProtectorsBehavior || ''}
        onChange={(e) => onInputChange('othersProtectorsBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage se comporte avec les autres protecteurs..."
        rows={4}
      />

      <FormField
        id="character-guides-behavior"
        label="Comportement envers les guides"
        type="textarea"
        value={formData.guidesBehavior || ''}
        onChange={(e) => onInputChange('guidesBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage se comporte avec les guides..."
        rows={4}
      />

      <FormField
        id="character-allies-behavior"
        label="Comportement envers les alliés"
        type="textarea"
        value={formData.alliesBehavior || ''}
        onChange={(e) => onInputChange('alliesBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage interagit avec ses amis et compagnons..."
        rows={4}
      />

      <FormField
        id="character-enemies-behavior"
        label="Comportement envers les ennemis"
        type="textarea"
        value={formData.enemiesBehavior || ''}
        onChange={(e) => onInputChange('enemiesBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage réagit face à ses rivaux et antagonistes..."
        rows={4}
      />

      <FormField
        id="character-strangers-behavior"
        label="Comportement envers les inconnus"
        type="textarea"
        value={formData.strangersBehavior || ''}
        onChange={(e) => onInputChange('strangersBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage se comporte avec des personnes qu'il ne connaît pas..."
        rows={4}
      />

      <FormField
        id="character-authority-behavior"
        label="Comportement envers l'autorité"
        type="textarea"
        value={formData.authorityBehavior || ''}
        onChange={(e) => onInputChange('authorityBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage réagit face aux figures d'autorité..."
        rows={4}
      />

      <FormField
        id="character-em-behavior"
        label="Comportement envers Em"
        type="textarea"
        value={formData.emBehavior || ''}
        onChange={(e) => onInputChange('emBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment le personnage se comporte avec Em en général..."
        rows={4}
      />
    </div>
  );
}

export default RelationshipsSection;
