import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function NeutreSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: '#0d6efd', gridColumn: '1 / -1' }}>
        Section Personnage Neutre
      </h4>

      <FormField
        id="neutre-histoire"
        label="Histoire"
        type="textarea"
        value={formData.neutreHistoire || ''}
        onChange={(e) => onInputChange('neutreHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire du personnage neutre..."
        rows={5}
      />

      <FormField
        id="neutre-position"
        label="Position / Neutralité"
        type="textarea"
        value={formData.neutralPosition || ''}
        onChange={(e) => onInputChange('neutralPosition', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi reste-t-il neutre ?"
        rows={4}
      />

      <FormField
        id="neutre-shift-conditions"
        label="Conditions de bascule"
        type="textarea"
        value={formData.neutralShiftConditions || ''}
        onChange={(e) => onInputChange('neutralShiftConditions', e.target.value)}
        containerClassName="form-full"
        placeholder="Ce qui pourrait le faire changer de camp"
        rows={4}
      />

      <FormField
        id="neutre-intel"
        label="Informations qu'il détient"
        type="textarea"
        value={formData.neutralIntel || ''}
        onChange={(e) => onInputChange('neutralIntel', e.target.value)}
        containerClassName="form-full"
        placeholder="Ce qu'il sait mais n'utilise pas"
        rows={4}
      />
    </div>
  );
}

export default NeutreSection;
