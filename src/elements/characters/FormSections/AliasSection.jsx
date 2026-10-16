import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function AliasSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Alias
      </h4>

      <FormField
        id="alias-histoire"
        label="Histoire"
        type="textarea"
        value={formData.aliasHistoire || ''}
        onChange={(e) => onInputChange('aliasHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire de l'alias..."
        rows={5}
      />

      <FormField
        id="alias-identite"
        label="Identité réelle / Fausse identité"
        type="textarea"
        value={formData.aliasIdentite || ''}
        onChange={(e) => onInputChange('aliasIdentite', e.target.value)}
        containerClassName="form-full"
        placeholder="Qui est vraiment ce personnage sous l'alias ?"
        rows={4}
      />

      <FormField
        id="alias-raison"
        label="Raison de l'alias"
        type="textarea"
        value={formData.aliasRaison || ''}
        onChange={(e) => onInputChange('aliasRaison', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi utilise-t-il un alias ?"
        rows={4}
      />

      <FormField
        id="alias-reveal"
        label="Moment / conditions de révélation"
        type="textarea"
        value={formData.aliasReveal || ''}
        onChange={(e) => onInputChange('aliasReveal', e.target.value)}
        containerClassName="form-full"
        placeholder="Quand et comment l'identité réelle sera révélée"
        rows={4}
      />
    </div>
  );
}

export default AliasSection;
