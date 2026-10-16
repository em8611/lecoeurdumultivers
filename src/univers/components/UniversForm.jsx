import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import ListInput from '../../components/common/ListInput.jsx';
import ImageUploader from '../../components/common/ImageUploader.jsx';
import { UNIVERSES, UNIVERSE_FRANCHISES } from '../constants/index.js';

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

export default function UniversForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  statusOptions,
  dangerOptions,
  universMultivers,
  territoires,
  concepts,
  isEditing = false
}) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.univers);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const otherUnivers = universMultivers.filter(u => u.id !== formData.id);

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, color: 'var(--encre)' }}>
        {isEditing ? "Modifier l'univers" : 'Créer un nouvel univers'}
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
              list="univers-suggestions"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Terre Prime, Nexus Spatio-Temporel"
            />
            <datalist id="univers-suggestions">
              {UNIVERSES.map(u => <option key={u} value={u} />)}
            </datalist>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Franchise / Origine</label>
            <input
              type="text"
              list="franchise-suggestions"
              value={formData.franchise}
              onChange={(e) => setFormData({ ...formData, franchise: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Coeur du Multivers, Marvel..."
            />
            <datalist id="franchise-suggestions">
              {UNIVERSE_FRANCHISES.map(f => <option key={f} value={f} />)}
            </datalist>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Catégorie</label>
            <input
              type="text"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Terrestres, Spatiaux, Mystiques"
            />
          </div>
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
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Niveau de danger</label>
            <select
              value={formData.dangerLevel}
              onChange={(e) => setFormData({ ...formData, dangerLevel: e.target.value })}
              style={inputStyle}
            >
              {dangerOptions.map(d => (
                <option key={d} value={d}>{d}</option>
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
            placeholder="Présentation générale de cet univers, son ambiance, ses particularités..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Règles spécifiques</label>
          <textarea
            value={formData.rules}
            onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Lois physiques, magiques ou technologiques propres à cet univers..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Points d'accès / Portails</label>
          <textarea
            value={formData.accessPoints}
            onChange={(e) => setFormData({ ...formData, accessPoints: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Comment entre-t-on ou sort-on de cet univers..."
          />
        </div>

        <MultiSelectPicker
          label="Univers connectés (portails, nexus)"
          options={otherUnivers}
          selectedIds={formData.connectedUniverseIds}
          onChange={(ids) => setFormData({ ...formData, connectedUniverseIds: ids })}
          placeholder="Aucun autre univers disponible."
        />

        <MultiSelectPicker
          label="Territoires situés dans cet univers"
          options={territoires}
          selectedIds={formData.territoireIds}
          onChange={(ids) => setFormData({ ...formData, territoireIds: ids })}
          placeholder="Aucun territoire disponible. Créez-en dans Cartes & Géographie."
        />

        <MultiSelectPicker
          label="Concepts / Lois propres à cet univers"
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
            {isEditing ? 'Mettre à jour' : "Créer l'univers"}
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
