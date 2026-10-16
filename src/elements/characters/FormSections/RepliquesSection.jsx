import React, { useState } from 'react';

const REPLIQUE_CONTEXTS = [
  'Combat',
  'Émotion',
  'Présentation',
  'Victoire',
  'Défaite',
  'Menace',
  'Humour',
  'Philosophique',
  'Catchphrase',
  'Derniers mots',
  'Autre'
];

function RepliquesSection({ formData, onInputChange }) {
  const repliques = Array.isArray(formData.repliques) ? formData.repliques : [];
  const [context, setContext] = useState('Combat');
  const [quote, setQuote] = useState('');

  const addReplique = () => {
    const text = quote.trim();
    if (!text) return;

    const newRepliques = [...repliques, { context, quote: text }];
    onInputChange('repliques', newRepliques);
    setQuote('');
  };

  const removeReplique = (index) => {
    const newRepliques = repliques.filter((_, i) => i !== index);
    onInputChange('repliques', newRepliques);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addReplique();
    }
  };

  return (
    <div className="form-section-card form-grid">
      <div className="form-full">
        <label className="form-label">Ajouter une réplique</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <select
              className="form-input"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            >
              {REPLIQUE_CONTEXTS.map(ctx => (
                <option key={ctx} value={ctx}>{ctx}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="form-input"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Texte de la réplique..."
            />
          </div>
          <button type="button" className="btn-secondary" onClick={addReplique}>Ajouter</button>
        </div>
      </div>

      {repliques.length > 0 && (
        <div className="form-full">
          <label className="form-label">Répliques du personnage</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {repliques.map((rep, idx) => (
              <div
                key={`${rep.context}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 12px',
                  background: 'var(--douceur)',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-bouton)'
                }}
              >
                <span
                  style={{
                    padding: '4px 8px',
                    background: 'var(--coeur)',
                    color: 'var(--sur-coeur)',
                    borderRadius: 'var(--rayon-bouton)',
                    fontSize: '0.85em',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    textAlign: 'center'
                  }}
                >
                  {rep.context}
                </span>
                <span style={{ flex: 1, color: 'var(--encre)', fontStyle: 'italic' }}>
                  "{rep.quote}"
                </span>
                <button
                  type="button"
                  onClick={() => removeReplique(idx)}
                  style={{
                    background: '#a13d3d',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--rayon-bouton)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.85em'
                  }}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepliquesSection;
