import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';

export default function EquipeForm({ formData, setFormData, onSubmit, onCancel, typeOptions, statusOptions, isEditing }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.team);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    fontFamily: 'inherit',
    resize: 'vertical'
  };

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>
        {isEditing ? 'Modifier l\'équipe/groupe' : 'Créer une nouvelle équipe/groupe'}
      </h3>

      <FormProgressBar
        progress={progress}
        filledCount={filledCount}
        totalCount={totalCount}
        showDetails={true}
        position="top"
      />

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Colonne gauche */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Nom *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
                placeholder="Ex: Les Gardiens de l'Aube"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={inputStyle}
              >
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={inputStyle}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Date de fondation
              </label>
              <input
                type="text"
                value={formData.founded}
                onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                style={inputStyle}
                placeholder="Ex: An 1205, Ère des Héros"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Quartier général
              </label>
              <input
                type="text"
                value={formData.headquarters}
                onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                style={inputStyle}
                placeholder="Ex: Tour de Cristal, Capitale"
              />
            </div>
          </div>

          {/* Colonne droite */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                style={textareaStyle}
                placeholder="Description de l'équipe, ses objectifs, son histoire..."
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Objectifs
              </label>
              <textarea
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                rows={3}
                style={textareaStyle}
                placeholder="Objectifs principaux de l'équipe..."
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                Emblème (URL)
              </label>
              <input
                type="text"
                value={formData.emblem}
                onChange={(e) => setFormData({ ...formData, emblem: e.target.value })}
                style={inputStyle}
                placeholder="/images/emblems/team.png"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                  Couleur primaire
                </label>
                <input
                  type="color"
                  value={formData.colors.primary}
                  onChange={(e) => setFormData({
                    ...formData,
                    colors: { ...formData.colors, primary: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 'var(--rayon-bouton)',
                    border: '1px solid var(--trait)',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
                  Couleur secondaire
                </label>
                <input
                  type="color"
                  value={formData.colors.secondary}
                  onChange={(e) => setFormData({
                    ...formData,
                    colors: { ...formData.colors, secondary: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 'var(--rayon-bouton)',
                    border: '1px solid var(--trait)',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
            Moments marquants
          </label>
          <textarea
            value={formData.keyMoments || ''}
            onChange={(e) => setFormData({ ...formData, keyMoments: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Décrivez les moments marquants de l'équipe, ses victoires, défaites, événements importants..."
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--coeur)',
              color: 'var(--sur-coeur)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isEditing ? 'Mettre à jour' : 'Créer l\'équipe'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--fond-carte)',
              color: 'var(--encre)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
