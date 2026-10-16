import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import ListInput from '../../components/common/ListInput.jsx';
import ImageUploader from '../../components/common/ImageUploader.jsx';

export default function DisciplineForm({ formData, setFormData, onSubmit, onCancel, categoryOptions, characters, isEditing = false, label }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.discipline);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const togglePractitioner = (id) => {
    const current = formData.practitionerIds || [];
    if (current.includes(id)) {
      setFormData({ ...formData, practitionerIds: current.filter(pid => pid !== id) });
    } else {
      setFormData({ ...formData, practitionerIds: [...current, id] });
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, color: 'var(--encre)' }}>
        {isEditing ? `Modifier ${label}` : `Créer une nouvelle ${label}`}
      </h3>

      <FormProgressBar
        progress={progress}
        filledCount={filledCount}
        totalCount={totalCount}
        showDetails={true}
        position="top"
      />

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nom *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Alchimie Transmutative, Mécanique à Vapeur"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Catégorie *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description générale</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Présentation rapide..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Principes / Fonctionnement</label>
          <textarea
            value={formData.mechanism}
            onChange={(e) => setFormData({ ...formData, mechanism: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Comment ça fonctionne concrètement dans l'univers..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Ressources / Prérequis matériels</label>
          <textarea
            value={formData.energySource}
            onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Matériaux, outils, formation nécessaires à cette discipline..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="masteryLevels"
            label="Niveaux de maîtrise / Progression (dans l'ordre)"
            values={formData.masteryLevels}
            onChange={(values) => setFormData({ ...formData, masteryLevels: values })}
            placeholder="Ex: Apprenti, puis Artisan, puis Maître..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Limites / Risques</label>
          <textarea
            value={formData.limitations}
            onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Ce qui empêche ou limite cette discipline, risques pour le praticien..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: 'var(--encre)' }}>Praticiens (personnages)</label>
          {characters.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--encre-douce)', fontStyle: 'italic', margin: 0 }}>
              Aucun personnage disponible. Créez-en d'abord dans Éléments.
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 140, overflowY: 'auto', padding: 8, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)' }}>
              {characters.map(c => {
                const isSelected = (formData.practitionerIds || []).includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => togglePractitioner(c.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--rayon-pilule)',
                      fontSize: 12,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--coeur)' : '1px solid var(--trait)',
                      backgroundColor: isSelected ? 'var(--douceur)' : 'var(--fond-carte)',
                      color: isSelected ? 'var(--coeur)' : 'var(--encre)'
                    }}
                  >
                    {isSelected ? '✓ ' : ''}{c.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="tags"
            label="Tags"
            values={formData.tags}
            onChange={(values) => setFormData({ ...formData, tags: values })}
            placeholder="Ajouter un tag et appuyer sur Entrée"
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <ImageUploader
            images={formData.images}
            onImagesChange={(images) => setFormData({ ...formData, images })}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isEditing ? 'Mettre à jour' : 'Créer'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
