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
    borderRadius: 4,
    border: '1px solid #ced4da',
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
      backgroundColor: '#f8f9fa',
      padding: 24,
      borderRadius: 8,
      marginBottom: 24,
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20 }}>
        {isEditing ? `Modifier ${label === 'Style de Combat' ? 'le style' : "l'école"}` : `Créer ${label === 'Style de Combat' ? 'un nouveau style' : 'une nouvelle école'}`}
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
              placeholder="Ex: Pyromancie, Art du Sabre Silencieux"
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
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Règles / Mécanique de fonctionnement</label>
          <textarea
            value={formData.mechanism}
            onChange={(e) => setFormData({ ...formData, mechanism: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Comment ça fonctionne concrètement dans l'univers..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Source d'énergie / Prérequis physiques</label>
          <textarea
            value={formData.energySource}
            onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="D'où vient le pouvoir (mana, foi, entraînement...) et ce qu'il faut pour le pratiquer..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="masteryLevels"
            label="Niveaux de maîtrise / Progression (dans l'ordre)"
            values={formData.masteryLevels}
            onChange={(values) => setFormData({ ...formData, masteryLevels: values })}
            placeholder="Ex: Novice, puis Entrée, puis Entrée..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Limites / Dangers / Contre-mesures</label>
          <textarea
            value={formData.limitations}
            onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Ce qui empêche ou contre cette discipline, risques pour le pratiquant..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Praticiens (personnages)</label>
          {characters.length === 0 ? (
            <p style={{ fontSize: 13, color: '#999', fontStyle: 'italic', margin: 0 }}>
              Aucun personnage disponible. Créez-en d'abord dans Éléments.
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 140, overflowY: 'auto', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }}>
              {characters.map(c => {
                const isSelected = (formData.practitionerIds || []).includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => togglePractitioner(c.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #2196f3' : '1px solid #ced4da',
                      backgroundColor: isSelected ? '#e3f2fd' : 'white',
                      color: isSelected ? '#1976d2' : '#555'
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
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isEditing ? '✓ Mettre à jour' : '✓ Créer'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            ✕ Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
