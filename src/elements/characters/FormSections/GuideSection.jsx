import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function GuideSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Guide
      </h4>

      <FormField
        id="guide-histoire"
        label="Histoire"
        type="textarea"
        value={formData.guideHistoire || ''}
        onChange={(e) => onInputChange('guideHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire du guide..."
        rows={5}
      />

      <FormField
        id="guide-guided-person"
        label="Qui guide-t-il ?"
        type="text"
        value={formData.guidedPerson || ''}
        onChange={(e) => onInputChange('guidedPerson', e.target.value)}
        containerClassName="form-half"
        placeholder="Nom du personnage guidé"
      />

      <FormField
        id="guide-guidance-type"
        label="Type de guidance"
        type="select"
        value={formData.guidanceType || 'mentor'}
        onChange={(e) => onInputChange('guidanceType', e.target.value)}
        containerClassName="form-half"
        options={[
          'Mentor - Enseigne activement',
          'Guide spirituel - Conseils mystiques',
          'Mystérieux - Indices énigmatiques',
          'Boussole morale - Conscience',
          'Pratique - Survie, compétences'
        ]}
      />

      <FormField
        id="guide-wisdom-phrase"
        label="Phrase de sagesse signature"
        type="text"
        value={formData.wisdomPhrase || ''}
        onChange={(e) => onInputChange('wisdomPhrase', e.target.value)}
        containerClassName="form-full"
        placeholder="Citation typique de ce guide..."
      />

      <FormField
        id="guide-special-wisdom"
        label="Sagesse / Connaissance spéciale"
        type="textarea"
        value={formData.specialWisdom || ''}
        onChange={(e) => onInputChange('specialWisdom', e.target.value)}
        containerClassName="form-full"
        placeholder="Quel savoir unique peut-il transmettre ?"
        rows={5}
      />

      <FormField
        id="guide-teaching-method"
        label="Méthode d'enseignement"
        type="textarea"
        value={formData.teachingMethod || ''}
        onChange={(e) => onInputChange('teachingMethod', e.target.value)}
        containerClassName="form-full"
        placeholder="Direct, par l'épreuve, paraboles, énigmes..."
        rows={4}
      />

      <FormField
        id="guide-mentoring-reason"
        label="Raison du mentorat"
        type="textarea"
        value={formData.mentoringReason || ''}
        onChange={(e) => onInputChange('mentoringReason', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi a-t-il pris ce rôle de guide ?"
        rows={4}
      />

      <FormField
        id="guide-help-limit"
        label="Limite de son aide"
        type="textarea"
        value={formData.helpLimit || ''}
        onChange={(e) => onInputChange('helpLimit', e.target.value)}
        containerClassName="form-full"
        placeholder="Jusqu'où peut-il intervenir ? Quelles sont ses limites ?"
        rows={4}
      />
    </div>
  );
}

export default GuideSection;
