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
    <div className="form-field">
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id={id}
          className="form-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{ flex: 1 }}
        />
        <button type="button" className="btn-secondary" onClick={addItem}>Ajouter</button>
      </div>
      {values.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {values.map((val, idx) => (
            <span
              key={`${val}-${idx}`}
              style={{
                background: '#eef2ff',
                border: '1px solid #c7d2fe',
                color: '#1e3a8a',
                padding: '4px 10px',
                borderRadius: 12,
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
                style={{ background: 'transparent', border: 'none', color: '#1e3a8a', cursor: 'pointer' }}
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
