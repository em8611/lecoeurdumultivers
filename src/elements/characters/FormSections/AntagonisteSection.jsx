import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';

function AntagonisteSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  const ANTAGONISTE_GENRES = [
    'Rival',
    'Trahison',
    'Tyran',
    'Manipulateur',
    'Vengeur',
    'Corrompu',
    'Fanatique',
    'Destructeur'
  ];

  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--coeur)', gridColumn: '1 / -1' }}>
        Section Antagoniste
      </h4>

      <FormField
        id="antagoniste-genre"
        label="Genre"
        type="select"
        value={formData.antagonisteGenre || ''}
        onChange={(e) => onInputChange('antagonisteGenre', e.target.value)}
        containerClassName="form-half"
        options={ANTAGONISTE_GENRES}
      />

      <div className="form-full">
        <ListInput
          id="antagoniste-groupes"
          label="Groupes auxquels il appartient"
          values={asArray(formData.antagonisteGroupes)}
          onChange={(next) => onInputChange('antagonisteGroupes', next)}
          placeholder="Ex: Organisation secrète, Armée ennemie..."
        />
      </div>

      <FormField
        id="antagoniste-histoire"
        label="Histoire"
        type="textarea"
        value={formData.antagonisteHistoire || ''}
        onChange={(e) => onInputChange('antagonisteHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire de l'antagoniste..."
        rows={5}
      />

      <FormField
        id="antagoniste-comportement"
        label="Comportement"
        type="textarea"
        value={formData.antagonisteComportement || ''}
        onChange={(e) => onInputChange('antagonisteComportement', e.target.value)}
        containerClassName="form-full"
        placeholder="Comment se comporte cet antagoniste..."
        rows={5}
      />

      <FormField
        id="antagoniste-main-goal"
        label="Objectif principal"
        type="textarea"
        value={formData.mainGoal || ''}
        onChange={(e) => onInputChange('mainGoal', e.target.value)}
        containerClassName="form-full"
        placeholder="Quel est le but ultime de cet antagoniste ?"
        rows={5}
      />

      <FormField
        id="antagoniste-deep-motivation"
        label="Motivation profonde"
        type="textarea"
        value={formData.deepMotivation || ''}
        onChange={(e) => onInputChange('deepMotivation', e.target.value)}
        containerClassName="form-full"
        placeholder="Pourquoi agit-il ainsi ? Traumatisme, conviction, ambition..."
        rows={5}
      />

      <FormField
        id="antagoniste-of"
        label="Antagoniste de qui ?"
        type="text"
        value={formData.antagonistOf || ''}
        onChange={(e) => onInputChange('antagonistOf', e.target.value)}
        containerClassName="form-half"
        placeholder="Nom du protagoniste ou groupe opposé"
      />

      <FormField
        id="antagoniste-redemption"
        label="Point de rédemption possible"
        type="select"
        value={formData.redemptionPossible || 'maybe'}
        onChange={(e) => onInputChange('redemptionPossible', e.target.value)}
        containerClassName="form-half"
        options={[
          'Oui - Peut être racheté',
          'Peut-être - Selon les circonstances',
          'Non - Trop loin dans le mal'
        ]}
      />

      <FormField
        id="antagoniste-methods"
        label="Méthodes employées"
        type="textarea"
        value={formData.methods || ''}
        onChange={(e) => onInputChange('methods', e.target.value)}
        containerClassName="form-full"
        placeholder="Violence, manipulation, chantage, ruse..."
        rows={4}
      />

      <FormField
        id="antagoniste-weaknesses"
        label="Faiblesses exploitables"
        type="textarea"
        value={formData.exploitableWeaknesses || ''}
        onChange={(e) => onInputChange('exploitableWeaknesses', e.target.value)}
        containerClassName="form-full"
        placeholder="Failles psychologiques, émotionnelles ou physiques..."
        rows={4}
      />
    </div>
  );
}

export default AntagonisteSection;
