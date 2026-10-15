import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function ProtecteurIndirectSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  const PROTECTEUR_INDIRECT_ROLES = [
    'Stratégiste',
    'Soutien',
    'Silencieux',
    'Inventeur',
    'Combattant'
  ];

  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: '#6f42c1', gridColumn: '1 / -1' }}>
        Section Protecteur Indirect
      </h4>

      <FormField
        id="protecteur-indirect-role"
        label="Rôle"
        type="select"
        value={formData.protecteurIndirectRole || ''}
        onChange={(e) => onInputChange('protecteurIndirectRole', e.target.value)}
        containerClassName="form-half"
        options={PROTECTEUR_INDIRECT_ROLES}
      />

      <div className="form-full">
        <ListInput
          id="protecteur-indirect-protected-persons"
          label="Qui protège-t-il/elle ?"
          values={asArray(formData.protectedPersonsIndirect)}
          onChange={(next) => onInputChange('protectedPersonsIndirect', next)}
          placeholder="Ex: Sa famille, Le royaume, Les innocents..."
        />
      </div>

      <FormField
        id="protecteur-indirect-serment"
        label="Serment du Protecteur indirect"
        type="textarea"
        value={formData.protecteurIndirectSerment || ''}
        onChange={(e) => onInputChange('protecteurIndirectSerment', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Je protégerai Em dans l'ombre..."
        rows={4}
      />

      <FormField
        id="protecteur-indirect-protection-method"
        label="Méthode de protection"
        type="textarea"
        value={formData.protectionMethodIndirect || ''}
        onChange={(e) => onInputChange('protectionMethodIndirect', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Manipulation, Information, Stratégie..."
      />

      <FormField
        id="protecteur-indirect-devotion-level"
        label="Niveau de dévouement"
        type="number"
        value={formData.devotionLevelIndirect || 5}
        onChange={(e) => onInputChange('devotionLevelIndirect', parseInt(e.target.value) || 5)}
        containerClassName="form-half"
        min={1}
        max={10}
        placeholder="1-10"
      />

      <FormField
        id="protecteur-indirect-protection-reason"
        label="Raison de la protection"
        type="textarea"
        value={formData.protectionReasonIndirect || ''}
        onChange={(e) => onInputChange('protectionReasonIndirect', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi ce personnage a-t-il pris ce rôle de protecteur ?"
        rows={5}
      />

      <FormField
        id="protecteur-indirect-moral-limits"
        label="Limites morales"
        type="textarea"
        value={formData.moralLimitsIndirect || ''}
        onChange={(e) => onInputChange('moralLimitsIndirect', e.target.value)}
        containerClassName="form-full"
        placeholder="Jusqu'où est-il prêt à aller pour protéger ?"
        rows={4}
      />
    </div>
  );
}

export default ProtecteurIndirectSection;
