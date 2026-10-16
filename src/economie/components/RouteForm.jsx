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

export default function RouteForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  statusOptions,
  territoires,
  ressources,
  equipes,
  isEditing = false
}) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.route);

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
        {isEditing ? 'Modifier la route commerciale' : 'Créer une nouvelle route commerciale'}
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
              placeholder="Ex: Route de la Soie Céleste, Voie des Marchands du Nord"
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Territoire de départ</label>
            <select
              value={formData.fromTerritoireId}
              onChange={(e) => setFormData({ ...formData, fromTerritoireId: e.target.value })}
              style={inputStyle}
            >
              <option value="">— Aucun / Inconnu —</option>
              {territoires.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Territoire d'arrivée</label>
            <select
              value={formData.toTerritoireId}
              onChange={(e) => setFormData({ ...formData, toTerritoireId: e.target.value })}
              style={inputStyle}
            >
              <option value="">— Aucun / Inconnu —</option>
              {territoires.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
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
            placeholder="Contexte, utilité, fréquentation de cette route..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Dangers</label>
          <textarea
            value={formData.dangers}
            onChange={(e) => setFormData({ ...formData, dangers: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Bandits, créatures, conditions climatiques, péages..."
          />
        </div>

        <MultiSelectPicker
          label="Ressources échangées"
          options={ressources}
          selectedIds={formData.ressourceIds}
          onChange={(ids) => setFormData({ ...formData, ressourceIds: ids })}
          placeholder="Aucune ressource disponible. Créez-en ci-dessus."
        />

        <MultiSelectPicker
          label="Guildes / Équipes gestionnaires"
          options={equipes}
          selectedIds={formData.equipeIds}
          onChange={(ids) => setFormData({ ...formData, equipeIds: ids })}
          placeholder="Aucune équipe disponible. Créez-en dans Équipes."
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
            {isEditing ? 'Mettre à jour' : 'Créer la route'}
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
