import React from 'react';
import FormField from '../../../components/common/FormField.jsx';
import ListInput from '../../../components/common/ListInput.jsx';
import { LOCATION_GROUPS } from '../../locations/constants';
import { UNIVERSE_FRANCHISE_GROUPS } from '../../../univers/constants';

function ApparitionSection({ formData, onInputChange }) {
  const asArray = (v) => Array.isArray(v) ? v : [];

  return (
    <div className="form-section-card form-grid">
      <div className="form-half">
        <label className="form-label">Univers / Franchises</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <select
            value={formData._franchiseDraft || ''}
            onChange={(e) => onInputChange('_franchiseDraft', e.target.value)}
            style={{ width: '50%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            <option value="">Ajouter...</option>
            {UNIVERSE_FRANCHISE_GROUPS.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              const val = formData._franchiseDraft;
              if (!val) return;
              const current = Array.isArray(formData.universeFranchises) ? formData.universeFranchises : [];
              if (!current.includes(val)) {
                onInputChange('universeFranchises', [...current, val]);
              }
              onInputChange('_franchiseDraft', '');
            }}
            style={{ padding: '8px 12px', borderRadius: 'var(--rayon-bouton)', border: 'none', background: 'var(--coeur)', color: 'var(--sur-coeur)', cursor: 'pointer' }}
          >Ajouter</button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(Array.isArray(formData.universeFranchises) ? formData.universeFranchises : []).map((f, idx) => (
            <span key={f + idx} style={{ background: 'var(--douceur)', border: '1px solid var(--trait)', color: 'var(--encre)', padding: '4px 8px', borderRadius: 'var(--rayon-pilule)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {f}
              <button
                type="button"
                onClick={() => {
                  const current = (Array.isArray(formData.universeFranchises) ? formData.universeFranchises : []).filter((x) => x !== f);
                  onInputChange('universeFranchises', current);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--encre-douce)', cursor: 'pointer' }}
                aria-label={`Supprimer ${f}`}
              >✕</button>
            </span>
          ))}
        </div>
      </div>
      <div className="form-half">
        <label className="form-label">Lieu principal</label>
        <select
          value={formData.mainLocation || ''}
          onChange={(e) => onInputChange('mainLocation', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          <option value="">Sélectionner...</option>
          {LOCATION_GROUPS.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="form-full">
        <label className="form-label">Lieux associés</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={formData._assocLocationDraft || ''}
            onChange={(e) => onInputChange('_assocLocationDraft', e.target.value)}
            style={{ padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            <option value="">Lieu...</option>
            {LOCATION_GROUPS.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <input
            type="text"
            value={formData._assocLocationContext || ''}
            onChange={(e) => onInputChange('_assocLocationContext', e.target.value)}
            placeholder="Contexte (ex: Chapitre 3, Mission X)"
            style={{ flex: 1, minWidth: 240, padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
          <button
            type="button"
            onClick={() => {
              const loc = formData._assocLocationDraft;
              if (!loc) return;
              const entry = { location: loc, context: formData._assocLocationContext || '' };
              const current = Array.isArray(formData.associatedLocations) ? formData.associatedLocations : [];
              // éviter les doublons sur le nom de lieu
              if (!current.some(e => e.location === loc && e.context === (formData._assocLocationContext || ''))) {
                onInputChange('associatedLocations', [...current, entry]);
                onInputChange('_assocLocationDraft', '');
                onInputChange('_assocLocationContext', '');
              }
            }}
            style={{ padding: '8px 12px', borderRadius: 'var(--rayon-bouton)', border: 'none', background: 'var(--coeur)', color: 'var(--sur-coeur)', cursor: 'pointer' }}
          >Ajouter</button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(Array.isArray(formData.associatedLocations) ? formData.associatedLocations : []).map((entry, idx) => (
            <span key={(entry.location || 'loc') + idx} style={{ background: 'var(--douceur)', border: '1px solid var(--trait)', color: 'var(--encre)', padding: '4px 8px', borderRadius: 'var(--rayon-pilule)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <strong>{entry.location}</strong>{entry.context ? ` — ${entry.context}` : ''}
              <button
                type="button"
                onClick={() => {
                  const current = (Array.isArray(formData.associatedLocations) ? formData.associatedLocations : []).filter((e, i) => i !== idx);
                  onInputChange('associatedLocations', current);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--encre-douce)', cursor: 'pointer' }}
                aria-label={`Supprimer ${entry.location}`}
              >✕</button>
            </span>
          ))}
        </div>
      </div>
      <FormField
        id="character-first-appearance"
        label="Première apparition"
        type="text"
        value={formData.firstAppearance || ''}
        onChange={(e) => onInputChange('firstAppearance', e.target.value)}
        containerClassName="form-half"
        placeholder="Chapitre, épisode, numéro, année..."
      />

      <div className="form-full">
        <ListInput
          id="character-appearances"
          label="Apparitions notables"
          values={asArray(formData.appearances)}
          onChange={(next) => onInputChange('appearances', next)}
          placeholder="Ex: S01E05, Tome 3, Film 2..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-story-arcs"
          label="Arcs narratifs"
          values={asArray(formData.storyArcs)}
          onChange={(next) => onInputChange('storyArcs', next)}
          placeholder="Ex: Appel de l'aventure, Épreuve majeure, Révélation..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-cycles"
          label="Cycles"
          values={asArray(formData.cycles)}
          onChange={(next) => onInputChange('cycles', next)}
          placeholder="Ex: Cycle de la découverte, Cycle du conflit..."
        />
      </div>

      <div className="form-full">
        <ListInput
          id="character-sub-arcs"
          label="Sous-Arcs"
          values={asArray(formData.subArcs)}
          onChange={(next) => onInputChange('subArcs', next)}
          placeholder="Ex: Quête secondaire, Relation avec X..."
        />
      </div>
    </div>
  );
}

export default ApparitionSection;
