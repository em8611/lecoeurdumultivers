import React, { useState } from 'react';

function ListInput({ id, label, values = [], onChange, placeholder }) {
  const [draft, setDraft] = useState('');

  const addItem = () => {
    const text = draft.trim();
    if (!text) return;
    onChange([...values, text]);
    setDraft('');
  };

  const removeItem = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div>
      {label && <label htmlFor={id} style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: 'var(--encre)' }}>{label}</label>}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1, padding: 8, borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box'
          }}
        />
        <button
          type="button"
          onClick={addItem}
          style={{ padding: '8px 14px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}
        >
          Ajouter
        </button>
      </div>
      {values.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {values.map((val, idx) => (
            <span
              key={`${val}-${idx}`}
              style={{
                background: 'var(--douceur)',
                border: '1px solid var(--trait)',
                color: 'var(--encre)',
                padding: '4px 10px',
                borderRadius: 'var(--rayon-pilule)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13
              }}
            >
              {val}
              <button
                type="button"
                onClick={() => removeItem(idx)}
                style={{ background: 'transparent', border: 'none', color: 'var(--encre)', cursor: 'pointer' }}
                aria-label={`Supprimer ${val}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListInput;
