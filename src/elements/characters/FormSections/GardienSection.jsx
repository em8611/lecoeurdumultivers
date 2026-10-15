import React from 'react';
import FormField from '../../../components/common/FormField.jsx';

function GardienSection({ formData, onInputChange }) {
  return (
    <div className="form-section-card form-grid">
      <h4 style={{ margin: '0 0 1rem 0', color: '#28a745', gridColumn: '1 / -1' }}>
        Section Gardien
      </h4>

      <FormField
        id="gardien-histoire"
        label="Histoire"
        type="textarea"
        value={formData.gardienHistoire || ''}
        onChange={(e) => onInputChange('gardienHistoire', e.target.value)}
        containerClassName="form-full"
        placeholder="Histoire du gardien..."
        rows={5}
      />

      <FormField
        id="gardien-guarded-thing"
        label="Quoi/Qui garde-t-il ?"
        type="textarea"
        value={formData.guardedThing || ''}
        onChange={(e) => onInputChange('guardedThing', e.target.value)}
        containerClassName="form-full"
        placeholder="Lieu sacré, artefact, secret, portail, personne..."
        rows={4}
      />

      <FormField
        id="gardien-duration"
        label="Durée de la garde"
        type="text"
        value={formData.guardDuration || ''}
        onChange={(e) => onInputChange('guardDuration', e.target.value)}
        containerClassName="form-half"
        placeholder="Ex: Depuis 1000 ans, Toute sa vie, Jusqu'à ce que..."
      />

      <FormField
        id="gardien-intruder-attitude"
        label="Attitude envers les intrus"
        type="select"
        value={formData.intruderAttitude || 'hostile'}
        onChange={(e) => onInputChange('intruderAttitude', e.target.value)}
        containerClassName="form-half"
        options={[
          'Hostile - Attaque à vue',
          'Avertissement - Chance de partir',
          'Test - Éprouve les visiteurs',
          'Neutre - Observe d\'abord'
        ]}
      />

      <FormField
        id="gardien-oath"
        label="Serment ou obligation"
        type="textarea"
        value={formData.oath || ''}
        onChange={(e) => onInputChange('oath', e.target.value)}
        containerClassName="form-full"
        placeholder="Quelle promesse ou contrainte le lie à ce rôle ?"
        rows={5}
      />

      <FormField
        id="gardien-failure-consequences"
        label="Conséquences en cas d'échec"
        type="textarea"
        value={formData.failureConsequences || ''}
        onChange={(e) => onInputChange('failureConsequences', e.target.value)}
        containerClassName="form-full"
        placeholder="Que se passe-t-il si sa mission échoue ?"
        rows={4}
      />

      <FormField
        id="gardien-powers"
        label="Pouvoirs de gardien"
        type="textarea"
        value={formData.guardianPowers || ''}
        onChange={(e) => onInputChange('guardianPowers', e.target.value)}
        containerClassName="form-full"
        placeholder="Capacités spéciales liées à son rôle de gardien..."
        rows={4}
      />
    </div>
  );
}

export default GardienSection;
