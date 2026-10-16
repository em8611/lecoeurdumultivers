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

export default function QueteForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  categoryOptions,
  statusOptions,
  characters,
  equipes,
  locations,
  evenements,
  quetes,
  isEditing = false
}) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.quete);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const otherQuetes = quetes.filter(q => q.id !== formData.id);

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, color: 'var(--encre)' }}>
        {isEditing ? 'Modifier la quête' : 'Créer une nouvelle quête'}
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
              placeholder="Ex: La Quête du Sceau Brisé"
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
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
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
              Avancement : {formData.advancement}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={formData.advancement}
              onChange={(e) => setFormData({ ...formData, advancement: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description / Résumé</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Contexte et déroulement de cette quête ou intrigue..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="objectives"
            label="Objectifs / Étapes"
            values={formData.objectives}
            onChange={(values) => setFormData({ ...formData, objectives: values })}
            placeholder="Ajouter un objectif et appuyer sur Entrée"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Enjeux</label>
          <textarea
            value={formData.stakes}
            onChange={(e) => setFormData({ ...formData, stakes: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Ce qui est en jeu si la quête réussit ou échoue..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Résolution</label>
          <textarea
            value={formData.resolution}
            onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Comment la quête s'est conclue, si applicable..."
          />
        </div>

        <MultiSelectPicker
          label="Protagonistes"
          options={characters}
          selectedIds={formData.protagonistIds}
          onChange={(ids) => setFormData({ ...formData, protagonistIds: ids })}
          placeholder="Aucun personnage disponible. Créez-en dans Éléments."
        />

        <MultiSelectPicker
          label="Antagonistes"
          options={characters}
          selectedIds={formData.antagonistIds}
          onChange={(ids) => setFormData({ ...formData, antagonistIds: ids })}
          placeholder="Aucun personnage disponible. Créez-en dans Éléments."
        />

        <MultiSelectPicker
          label="Équipes impliquées"
          options={equipes}
          selectedIds={formData.equipeIds}
          onChange={(ids) => setFormData({ ...formData, equipeIds: ids })}
          placeholder="Aucune équipe disponible. Créez-en dans Équipes."
        />

        <MultiSelectPicker
          label="Lieux concernés"
          options={locations}
          selectedIds={formData.locationIds}
          onChange={(ids) => setFormData({ ...formData, locationIds: ids })}
          placeholder="Aucun lieu disponible. Créez-en dans Éléments."
        />

        <MultiSelectPicker
          label="Événements liés (Chronologie)"
          options={evenements}
          selectedIds={formData.relatedEventIds}
          onChange={(ids) => setFormData({ ...formData, relatedEventIds: ids })}
          placeholder="Aucun événement disponible. Créez-en dans Chronologie."
        />

        <MultiSelectPicker
          label="Quêtes liées"
          options={otherQuetes}
          selectedIds={formData.relatedQuestIds}
          onChange={(ids) => setFormData({ ...formData, relatedQuestIds: ids })}
          placeholder="Aucune autre quête disponible."
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
            {isEditing ? 'Mettre à jour' : 'Créer la quête'}
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
