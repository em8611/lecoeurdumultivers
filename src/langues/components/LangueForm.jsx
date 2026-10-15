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

export default function LangueForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  statusOptions,
  writingSystemOptions,
  langues,
  territoires,
  equipes,
  characters,
  isEditing = false
}) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.langue);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const otherLangues = langues.filter(l => l.id !== formData.id);

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: 24,
      borderRadius: 8,
      marginBottom: 24,
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20 }}>
        {isEditing ? 'Modifier la langue' : 'Créer une nouvelle langue'}
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
              placeholder="Ex: Haut-Valyrien, Langue des Anciens"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Famille linguistique</label>
            <input
              type="text"
              value={formData.family}
              onChange={(e) => setFormData({ ...formData, family: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Langues élémentaires, dialectes du Nord..."
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              {statusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Système d'écriture</label>
            <select
              value={formData.writingSystem}
              onChange={(e) => setFormData({ ...formData, writingSystem: e.target.value })}
              style={inputStyle}
            >
              {writingSystemOptions.map(w => (
                <option key={w} value={w}>{w}</option>
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
            placeholder="Présentation générale de cette langue, son usage, sa sonorité..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Phonétique / Prononciation</label>
          <textarea
            value={formData.phonetics}
            onChange={(e) => setFormData({ ...formData, phonetics: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Règles de prononciation, sons particuliers, accentuation..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Grammaire</label>
          <textarea
            value={formData.grammar}
            onChange={(e) => setFormData({ ...formData, grammar: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Structure grammaticale, conjugaisons, particularités syntaxiques..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <ListInput
            id="samplePhrases"
            label="Phrases types (phrase — traduction)"
            values={formData.samplePhrases}
            onChange={(values) => setFormData({ ...formData, samplePhrases: values })}
            placeholder="Ex: Valar morghulis — Tous les hommes doivent mourir"
          />
        </div>

        <MultiSelectPicker
          label="Langues apparentées (famille, évolution)"
          options={otherLangues}
          selectedIds={formData.relatedLanguageIds}
          onChange={(ids) => setFormData({ ...formData, relatedLanguageIds: ids })}
          placeholder="Aucune autre langue disponible."
        />

        <MultiSelectPicker
          label="Territoires où cette langue est parlée"
          options={territoires}
          selectedIds={formData.territoireIds}
          onChange={(ids) => setFormData({ ...formData, territoireIds: ids })}
          placeholder="Aucun territoire disponible. Créez-en dans Cartes & Géographie."
        />

        <MultiSelectPicker
          label="Peuples / Équipes locuteurs"
          options={equipes}
          selectedIds={formData.equipeIds}
          onChange={(ids) => setFormData({ ...formData, equipeIds: ids })}
          placeholder="Aucune équipe disponible."
        />

        <MultiSelectPicker
          label="Personnages locuteurs notables"
          options={characters}
          selectedIds={formData.characterIds}
          onChange={(ids) => setFormData({ ...formData, characterIds: ids })}
          placeholder="Aucun personnage disponible."
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
            {isEditing ? '✓ Mettre à jour' : '✓ Créer la langue'}
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
