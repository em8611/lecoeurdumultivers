import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import ListInput from '../../components/common/ListInput.jsx';

const intensityLabels = { 1: 'Très faible', 2: 'Faible', 3: 'Modérée', 4: 'Forte', 5: 'Extrême' };

export default function DiplomatieForm({ formData, setFormData, onSubmit, onCancel, statusOptions, getEntityOptions, evenements, isEditing = false }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.diplomatie);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const fromOptions = getEntityOptions(formData.fromType);
  const toOptions = getEntityOptions(formData.toType);

  const toggleEvent = (id) => {
    const current = formData.relatedEventIds || [];
    if (current.includes(id)) {
      setFormData({ ...formData, relatedEventIds: current.filter(eid => eid !== id) });
    } else {
      setFormData({ ...formData, relatedEventIds: [...current, id] });
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
        {isEditing ? 'Modifier la relation diplomatique' : 'Créer une nouvelle relation diplomatique'}
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
          <div style={{ padding: 12, backgroundColor: 'var(--fond-carte)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Entité A *</label>
            <select
              value={formData.fromType}
              onChange={(e) => setFormData({ ...formData, fromType: e.target.value, fromId: '' })}
              style={{ ...inputStyle, marginBottom: 8 }}
            >
              <option value="equipe">Équipe</option>
              <option value="territoire">Territoire</option>
            </select>
            <select
              value={formData.fromId}
              onChange={(e) => setFormData({ ...formData, fromId: e.target.value })}
              required
              style={inputStyle}
            >
              <option value="">— Choisir —</option>
              {fromOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>

          <div style={{ padding: 12, backgroundColor: 'var(--fond-carte)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Entité B *</label>
            <select
              value={formData.toType}
              onChange={(e) => setFormData({ ...formData, toType: e.target.value, toId: '' })}
              style={{ ...inputStyle, marginBottom: 8 }}
            >
              <option value="equipe">Équipe</option>
              <option value="territoire">Territoire</option>
            </select>
            <select
              value={formData.toId}
              onChange={(e) => setFormData({ ...formData, toId: e.target.value })}
              required
              style={inputStyle}
            >
              <option value="">— Choisir —</option>
              {toOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Statut *</label>
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
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>
              Intensité : {intensityLabels[formData.intensity] || formData.intensity}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={formData.intensity}
              onChange={(e) => setFormData({ ...formData, intensity: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Depuis quand</label>
          <input
            type="text"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            style={inputStyle}
            placeholder="Ex: An 1205, après la Bataille de l'Aube"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description / Historique</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={textareaStyle}
            placeholder="Contexte, origine et évolution de cette relation..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Événements liés (Chronologie)</label>
          {evenements.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--encre-douce)', fontStyle: 'italic', margin: 0 }}>
              Aucun événement disponible. Créez-en dans le module Chronologie.
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 140, overflowY: 'auto', padding: 8, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)' }}>
              {evenements.map(ev => {
                const isSelected = (formData.relatedEventIds || []).includes(ev.id);
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => toggleEvent(ev.id)}
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
                    {isSelected ? '✓ ' : ''}{ev.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <ListInput
            id="tags"
            label="Tags"
            values={formData.tags}
            onChange={(values) => setFormData({ ...formData, tags: values })}
            placeholder="Ajouter un tag et appuyer sur Entrée"
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isEditing ? 'Mettre à jour' : 'Créer la relation'}
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
