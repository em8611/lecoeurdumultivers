import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';
import { CHARACTER_ENERGIES } from '../constants';

function AbilitiesSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-energy"
        label="Énergie"
        type="select"
        value={formData.energy || ''}
        onChange={(e) => onInputChange('energy', e.target.value)}
        containerClassName="form-half"
        options={CHARACTER_ENERGIES}
      />

      <FormField
        id="character-combat-behavior"
        label="Comportement en combat"
        type="textarea"
        value={formData.combatBehavior || ''}
        onChange={(e) => onInputChange('combatBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Style de combat, stratégie, préférences tactiques..."
        rows={5}
      />

      <FormField
        id="attack-combat-behavior"
        label="Ses attaques en combat"
        type="textarea"
        value={formData.attackCombatBehavior || ''}
        onChange={(e) => onInputChange('attackCombatBehavior', e.target.value)}
        containerClassName="form-full"
        placeholder="Attaques spéciales, ultimes, combos, techniques..."
        rows={5}
      />

      <div className="form-full">
        <ListInput
          id="character-powers"
          label="Pouvoirs"
          values={asArray(formData.powers)}
          onChange={(next) => onInputChange('powers', next)}
          placeholder="Ex: Télékinésie, Vol, Super force..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-skills"
          label="Compétences"
          values={asArray(formData.skills)}
          onChange={(next) => onInputChange('skills', next)}
          placeholder="Ex: Combat à l'épée, Négociation, Médecine..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-others-abilities"
          label="Autres capacités non combatives"
          values={asArray(formData.othersAbilities)}
          onChange={(next) => onInputChange('othersAbilities', next)}
          placeholder="Ex: Cuisine, Artisanat, Alchimie..."
        />
      </div>
    </div>
  );
}

export default AbilitiesSection;
