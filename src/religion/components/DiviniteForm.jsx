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

export default function DiviniteForm({ formData, setFormData, onSubmit, onCancel, statusOptions, alignmentOptions, characters, concepts, isEditing = false }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.divinite);

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
        {isEditing ? 'Modifier la divinité' : 'Créer une nouvelle divinité'}
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
              placeholder="Ex: Sylaneth, Déesse de l'Aube"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Panthéon</label>
            <input
              type="text"
              value={formData.pantheon}
              onChange={(e) => setFormData({ ...formData, pantheon: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Panthéon des Sept Cieux"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nature / Alignement</label>
            <select
              value={formData.alignment}
              onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
              style={inputStyle}
            >
              {alignmentOptions.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="domains"
            label="Domaines d'influence"
            values={formData.domains}
            onChange={(values) => setFormData({ ...formData, domains: values })}
            placeholder="Ex: Guerre, Amour, Mort... puis Entrée"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Apparence, personnalité, rôle dans le panthéon..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Origine / Mythe de naissance</label>
          <textarea
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Comment cette divinité est-elle née ou apparue..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="symbols"
            label="Symboles"
            values={formData.symbols}
            onChange={(values) => setFormData({ ...formData, symbols: values })}
            placeholder="Ex: Soleil, Lame brisée... puis Entrée"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Fidèles / Culte</label>
          <textarea
            value={formData.followers}
            onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Qui vénère cette divinité, rites pratiqués..."
          />
        </div>

        <MultiSelectPicker
          label="Avatars / Incarnations (personnages)"
          options={characters}
          selectedIds={formData.avatarCharacterIds}
          onChange={(ids) => setFormData({ ...formData, avatarCharacterIds: ids })}
          placeholder="Aucun personnage disponible. Créez-en dans Éléments."
        />

        <MultiSelectPicker
          label="Concepts / Lois divines"
          options={concepts}
          selectedIds={formData.conceptIds}
          onChange={(ids) => setFormData({ ...formData, conceptIds: ids })}
          placeholder="Aucun concept disponible. Créez-en dans Concepts."
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
            {isEditing ? 'Mettre à jour' : 'Créer la divinité'}
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
