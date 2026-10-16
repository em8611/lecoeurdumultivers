import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function AllieSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  const ALLIE_NIVEAUX = [
    'Récurrent',
    'Permanent',
    'Temporaire'
  ];

  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Allié
      </h4>

      <FormField
        id="allie-niveau"
        label="Niveau"
        type="select"
        value={formData.allieNiveau || ''}
        onChange={(e) => onInputChange('allieNiveau', e.target.value)}
        containerClassName="form-half"
        options={ALLIE_NIVEAUX}
      />

      <div className="form-full">
        <ListInput
          id="allie-groupes"
          label="Groupe"
          values={asArray(formData.allieGroupes)}
          onChange={(next) => onInputChange('allieGroupes', next)}
          placeholder="Ex: Organisation, Équipe..."
        />
      </div>

      <FormField
        id="allie-histoire"
        label="Histoire"
        type="textarea"
        value={formData.allieHistoire || ''}
        onChange={(e) => onInputChange('allieHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire de l'allié..."
        rows={5}
      />

      <FormField
        id="allie-comportement"
        label="Comportement"
        type="textarea"
        value={formData.allieComportement || ''}
        onChange={(e) => onInputChange('allieComportement', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment se comporte cet allié..."
        rows={5}
      />

      <FormField
        id="allie-motivation"
        label="Motivation d'alliance"
        type="textarea"
        value={formData.allyMotivation || ''}
        onChange={(e) => onInputChange('allyMotivation', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi ce personnage est-il allié ?"
        rows={4}
      />

      <FormField
        id="allie-support-type"
        label="Type de soutien"
        type="select"
        value={formData.allySupportType || 'logistique'}
        onChange={(e) => onInputChange('allySupportType', e.target.value)}
        containerClassName="form-half"
        options={[
          'Logistique',
          'Émotionnel',
          'Combat',
          'Information',
          'Politique / Influence'
        ]}
      />

      <FormField
        id="allie-trust-level"
        label="Confiance mutuelle"
        type="number"
        value={formData.allyTrustLevel || 5}
        onChange={(e) => onInputChange('allyTrustLevel', parseInt(e.target.value) || 5)}
        containerClassName="form-half"
        min={1}
        max={10}
        placeholder="1-10"
      />

      <FormField
        id="allie-limits"
        label="Limites de la coopération"
        type="textarea"
        value={formData.allyLimits || ''}
        onChange={(e) => onInputChange('allyLimits', e.target.value)}
        containerClassName="form-full"
        placeholder="Ce que l'allié refuse de faire"
        rows={4}
      />
    </div>
  );
}

export default AllieSection;
