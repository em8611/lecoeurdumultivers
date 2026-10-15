import React, { useState } from 'react';
import { useElementsState, useElementsActions } from '../../state/elementsStore.jsx';

const DEFAULT_FIELDS = [
  { key: 'nom', label: 'Nom', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' }
];

function emptyForm(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {});
}

// Manager générique de catégorie : liste + formulaire CRUD.
// Sert de base en attendant les managers définitifs (champs métier plus riches).
export function GenericElementManager({ category, label, icon, color = '#495057', fields = DEFAULT_FIELDS }) {
  const state = useElementsState();
  const { addElement, updateElement, deleteElement } = useElementsActions();
  const items = state[category] || [];

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm(fields));

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      updateElement(category, editingId, form);
      setEditingId(null);
    } else {
      addElement(category, form);
    }
    setForm(emptyForm(fields));
  };

  const handleEdit = item => {
    setEditingId(item.id);
    setForm(fields.reduce((acc, field) => ({ ...acc, [field.key]: item[field.key] || '' }), {}));
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm(fields));
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color }}>{icon} {label}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480, marginBottom: 24 }}>
        {fields.map(field => (
          <div key={field.key}>
            <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 4 }}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.key}
                value={form[field.key] || ''}
                onChange={handleChange}
                rows={3}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            ) : (
              <input
                type="text"
                name={field.key}
                value={form[field.key] || ''}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: color, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            {editingId ? 'Enregistrer' : '+ Ajouter'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: 'white', cursor: 'pointer' }}>
              Annuler
            </button>
          )}
        </div>
      </form>

      {items.length === 0 ? (
        <p style={{ color: '#888' }}>Aucun élément pour l'instant.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <h4 style={{ marginTop: 0 }}>{item[fields[0].key] || '(sans nom)'}</h4>
              {fields.slice(1).map(field => (
                <p key={field.key} style={{ fontSize: 13, color: '#555', margin: '4px 0' }}>
                  <strong>{field.label} : </strong>{item[field.key]}
                </p>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => handleEdit(item)} style={{ padding: '4px 10px', border: '1px solid #ccc', borderRadius: 6, background: 'white', cursor: 'pointer', fontSize: 12 }}>
                  Modifier
                </button>
                <button onClick={() => deleteElement(category, item.id)} style={{ padding: '4px 10px', border: 'none', borderRadius: 6, background: '#dc3545', color: 'white', cursor: 'pointer', fontSize: 12 }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
