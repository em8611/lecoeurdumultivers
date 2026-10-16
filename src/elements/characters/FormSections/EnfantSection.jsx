import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function EnfantSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Enfant
      </h4>

      <FormField
        id="enfant-age"
        label="Âge exact"
        type="number"
        value={formData.exactAge || ''}
        onChange={(e) => onInputChange('exactAge', parseInt(e.target.value) || 0)}
        containerClassName="form-half"
        min={0}
        max={17}
        placeholder="0-30 ans"
      />

      <FormField
        id="enfant-guardian"
        label="Tuteur / Gardien"
        type="text"
        value={formData.guardian || ''}
        onChange={(e) => onInputChange('guardian', e.target.value)}
        containerClassName="form-half"
        placeholder="Qui s'occupe de cet enfant ?"
      />

      <FormField
        id="enfant-pere"
        label="Père"
        type="text"
        value={formData.enfantPere || ''}
        onChange={(e) => onInputChange('enfantPere', e.target.value)}
        containerClassName="form-half"
        placeholder="Nom du père..."
      />

      <FormField
        id="enfant-mere"
        label="Mère"
        type="text"
        value={formData.enfantMere || ''}
        onChange={(e) => onInputChange('enfantMere', e.target.value)}
        containerClassName="form-half"
        placeholder="Nom de la mère..."
      />

      <FormField
        id="enfant-maturity"
        label="Innocence / Maturité"
        type="number"
        value={formData.maturityLevel || 5}
        onChange={(e) => onInputChange('maturityLevel', parseInt(e.target.value) || 5)}
        containerClassName="form-half"
        min={1}
        max={10}
        placeholder="1-10 (1=Très innocent, 10=Très mature)"
      />

      <FormField
        id="enfant-story-role"
        label="Rôle dans l'histoire"
        type="select"
        value={formData.storyRole || 'protected'}
        onChange={(e) => onInputChange('storyRole', e.target.value)}
        containerClassName="form-half"
        options={[
          'À protéger',
          'Catalyseur d\'événements',
          'Témoin innocent',
          'Enfant aux pouvoirs spéciaux',
          'Sagesse enfantine'
        ]}
      />

      <FormField
        id="enfant-histoire"
        label="Histoire"
        type="textarea"
        value={formData.enfantHistoire || ''}
        onChange={(e) => onInputChange('enfantHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire de l'enfant..."
        rows={5}
      />

      <FormField
        id="enfant-trauma"
        label="Traumatisme ou épreuve"
        type="textarea"
        value={formData.trauma || ''}
        onChange={(e) => onInputChange('trauma', e.target.value)}
        containerClassName="form-full"
        placeholder="Événement difficile vécu par l'enfant (optionnel)..."
        rows={4}
      />
    </div>
  );
}

export default EnfantSection;
