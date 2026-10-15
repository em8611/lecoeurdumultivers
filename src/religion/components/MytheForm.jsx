import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import ListInput from '../../components/common/ListInput.jsx';
import ImageUploader from '../../components/common/ImageUploader.jsx';

function MultiSelectPicker({ label, options, selectedIds, onChange, placeholder }) {
  const toggle = (id) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(sid => sid !== id));
    else onChange([...selectedIds, id]);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>{label}</label>
      {options.length === 0 ? (
        <p style={{ fontSize: 13, color: '#999', fontStyle: 'italic', margin: 0 }}>{placeholder}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 140, overflowY: 'auto', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }}>
          {options.map(opt => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
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
                {isSelected ? '✓ ' : ''}{opt.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MytheForm({ formData, setFormData, onSubmit, onCancel, categoryOptions, truthOptions, divinites, characters, evenements, isEditing = false }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.mythe);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: 24,
      borderRadius: 8,
      marginBottom: 24,
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20 }}>
        {isEditing ? 'Modifier le mythe' : 'Créer un nouveau mythe'}
      </h3>

      <FormProgressBar
        progress={progress}
        filledCount={filledCount}
        totalCount={totalCount}
        showDetails={true}
        position="top"
      />

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nom *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Le Déluge des Larmes, Prophétie du Dernier Soleil"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Catégorie *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Véracité</label>
            <select
              value={formData.truthStatus}
              onChange={(e) => setFormData({ ...formData, truthStatus: e.target.value })}
              style={inputStyle}
            >
              {truthOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Récit / Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            style={textareaStyle}
            placeholder="Le récit du mythe ou de la légende..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Origine</label>
          <textarea
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="D'où vient ce récit, qui le raconte, dans quelle culture..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Signification / Morale</label>
          <textarea
            value={formData.signification}
            onChange={(e) => setFormData({ ...formData, signification: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Ce que ce mythe enseigne ou symbolise..."
          />
        </div>

        <MultiSelectPicker
          label="Divinités liées"
          options={divinites}
          selectedIds={formData.deityIds}
          onChange={(ids) => setFormData({ ...formData, deityIds: ids })}
          placeholder="Aucune divinité disponible."
        />

        <MultiSelectPicker
          label="Personnages liés"
          options={characters}
          selectedIds={formData.characterIds}
          onChange={(ids) => setFormData({ ...formData, characterIds: ids })}
          placeholder="Aucun personnage disponible. Créez-en dans Éléments."
        />

        <MultiSelectPicker
          label="Événements liés (Chronologie)"
          options={evenements}
          selectedIds={formData.eventIds}
          onChange={(ids) => setFormData({ ...formData, eventIds: ids })}
          placeholder="Aucun événement disponible. Créez-en dans Chronologie."
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
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isEditing ? '✓ Mettre à jour' : '✓ Créer le mythe'}
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
