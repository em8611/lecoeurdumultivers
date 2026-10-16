import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function CompagnonSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Compagnon
      </h4>

      <FormField
        id="compagnon-qui-accompagne"
        label="Qui il accompagne"
        type="text"
        value={formData.compagnonQuiAccompagne || ''}
        onChange={(e) => onInputChange('compagnonQuiAccompagne', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Em, Le protagoniste..."
      />

      <FormField
        id="compagnon-apparence"
        label="Apparence"
        type="textarea"
        value={formData.compagnonApparence || ''}
        onChange={(e) => onInputChange('compagnonApparence', e.target.value)}
        containerClassName="form-full"
        placeholder="Description de l'apparence du compagnon..."
        rows={5}
      />

      <FormField
        id="compagnon-histoire-comp"
        label="Histoire"
        type="textarea"
        value={formData.compagnonHistoire || ''}
        onChange={(e) => onInputChange('compagnonHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire du compagnon..."
        rows={5}
      />

      <FormField
        id="compagnon-comportement"
        label="Comportement"
        type="textarea"
        value={formData.compagnonComportement || ''}
        onChange={(e) => onInputChange('compagnonComportement', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment se comporte ce compagnon..."
        rows={5}
      />

      <FormField
        id="compagnon-bond"
        label="Lien émotionnel principal"
        type="textarea"
        value={formData.companionBond || ''}
        onChange={(e) => onInputChange('companionBond', e.target.value)}
        containerClassName="form-full"
        placeholder="Nature du lien avec le protagoniste"
        rows={4}
      />

      <FormField
        id="compagnon-role"
        label="Rôle dans le groupe"
        type="text"
        value={formData.companionRole || ''}
        onChange={(e) => onInputChange('companionRole', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: soutien moral, éclaireur, médiateur..."
      />

      <FormField
        id="compagnon-strength"
        label="Point fort relationnel"
        type="text"
        value={formData.companionStrength || ''}
        onChange={(e) => onInputChange('companionStrength', e.target.value)}
        containerClassName="form-half"
        placeholder="Empathie, humour, écoute, courage..."
      />

      <FormField
        id="compagnon-tension"
        label="Tension / conflit latent"
        type="textarea"
        value={formData.companionTension || ''}
        onChange={(e) => onInputChange('companionTension', e.target.value)}
        containerClassName="form-full"
        placeholder="Sujet délicat ou conflit possible"
        rows={4}
      />
    </div>
  );
}

export default CompagnonSection;
