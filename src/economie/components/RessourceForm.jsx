import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import ListInput from '../../components/common/ListInput.jsx';
import ImageUploader from '../../components/common/ImageUploader.jsx';

function MultiSelectPicker({ label, options, selectedIds, onChange, placeholder }) {
  const toggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(sid => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: 'var(--encre)' }}>{label}</label>
      {options.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--encre-douce)', fontStyle: 'italic', margin: 0 }}>{placeholder}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 140, overflowY: 'auto', padding: 8, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)' }}>
          {options.map(opt => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
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
                {isSelected ? '✓ ' : ''}{opt.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function RessourceForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  categoryOptions,
  rarityOptions,
  territoires,
  isEditing = false
}) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.ressource);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, color: 'var(--encre)' }}>
        {isEditing ? 'Modifier la ressource' : 'Créer une nouvelle ressource'}
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
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nom *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Écu d'Or, Cristal de Mana, Soie d'Araignée Géante"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Valeur estimée</label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 10 pièces d'or, inestimable..."
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Catégorie</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              {categoryOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Rareté</label>
            <select
              value={formData.rarity}
              onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
              style={inputStyle}
            >
              {rarityOptions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Apparence, usage, propriétés particulières..."
          />
        </div>

        <MultiSelectPicker
          label="Territoires d'origine / de production"
          options={territoires}
          selectedIds={formData.territoireIds}
          onChange={(ids) => setFormData({ ...formData, territoireIds: ids })}
          placeholder="Aucun territoire disponible. Créez-en dans Cartes & Géographie."
        />

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
            {isEditing ? 'Mettre à jour' : 'Créer la ressource'}
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
