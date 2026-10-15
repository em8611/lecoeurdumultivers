import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function ProtecteurDirectSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  const PROTECTEUR_ROLES = [
    'Stratégiste',
    'Soutien',
    'Combattant',
    'Inventeur',
    'Fantôme',
    'Surprenant'
  ];

  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: '#007bff', gridColumn: '1 / -1' }}>
        Section Protecteur Direct
      </h4>

      <FormField
        id="protecteur-role"
        label="Rôle"
        type="select"
        value={formData.protecteurRole || ''}
        onChange={(e) => onInputChange('protecteurRole', e.target.value)}
        containerClassName="form-half"
        options={PROTECTEUR_ROLES}
      />

      <div className="form-full">
        <ListInput
          id="protecteur-protected-persons"
          label="Qui protège-t-il/elle ?"
          values={asArray(formData.protectedPersons)}
          onChange={(next) => onInputChange('protectedPersons', next)}
          placeholder="Ex: Sa famille, Le royaume, Les innocents..."
        />
      </div>

      <FormField
        id="protecteur-serment"
        label="Serment du Protecteur direct"
        type="textarea"
        value={formData.protecteurSerment || ''}
        onChange={(e) => onInputChange('protecteurSerment', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Je protégerai Em coûte que coûte..."
        rows={4}
      />

      <FormField
        id="protecteur-protection-method"
        label="Méthode de protection"
        type="textarea"
        value={formData.protectionMethod || ''}
        onChange={(e) => onInputChange('protectionMethod', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Combat rapproché, Stratégie, Magie..."
      />

      <FormField
        id="protecteur-devotion-level"
        label="Niveau de dévouement"
        type="number"
        value={formData.devotionLevel || 5}
        onChange={(e) => onInputChange('devotionLevel', parseInt(e.target.value) || 5)}
        containerClassName="form-half"
        min={1}
        max={10}
        placeholder="1-10"
      />

      <FormField
        id="protecteur-protection-reason"
        label="Raison de la protection"
        type="textarea"
        value={formData.protectionReason || ''}
        onChange={(e) => onInputChange('protectionReason', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi ce personnage a-t-il pris ce rôle de protecteur ?"
        rows={5}
      />

      <FormField
        id="protecteur-moral-limits"
        label="Limites morales"
        type="textarea"
        value={formData.moralLimits || ''}
        onChange={(e) => onInputChange('moralLimits', e.target.value)}
        containerClassName="form-full"
        placeholder="Jusqu'où est-il prêt à aller pour protéger ?"
        rows={4}
      />
    </div>
  );
}

export default ProtecteurDirectSection;
