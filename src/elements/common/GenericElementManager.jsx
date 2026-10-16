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
export function GenericElementManager({ category, label, icon, color = 'var(--coeur)', fields = DEFAULT_FIELDS }) {
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
      <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color }}>{label}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480, marginBottom: 24, marginTop: 16, backgroundColor: 'var(--douceur)', padding: 24, borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
        {fields.map(field => (
          <div key={field.key}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--encre-douce)', marginBottom: 4 }}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.key}
                value={form[field.key] || ''}
                onChange={handleChange}
                rows={3}
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
              />
            ) : (
              <input
                type="text"
                name={field.key}
                value={form[field.key] || ''}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}>
            {editingId ? 'Enregistrer' : '+ Ajouter'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} style={{ padding: '8px 16px', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}>
              Annuler
            </button>
          )}
        </div>
      </form>

      {items.length === 0 ? (
        <p style={{ color: 'var(--encre-douce)' }}>Aucun élément pour l'instant.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid var(--trait)', borderRadius: 'var(--rayon-carte)', padding: 12, backgroundColor: 'var(--fond-carte)' }}>
              <h4 style={{ marginTop: 0, color: 'var(--encre)' }}>{item[fields[0].key] || '(sans nom)'}</h4>
              {fields.slice(1).map(field => (
                <p key={field.key} style={{ fontSize: 13, color: 'var(--encre-douce)', margin: '4px 0' }}>
                  <strong>{field.label} : </strong>{item[field.key]}
                </p>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => handleEdit(item)} style={{ padding: '4px 10px', border: 'none', borderRadius: 'var(--rayon-bouton)', background: 'var(--or)', color: 'var(--sur-or)', cursor: 'pointer', fontSize: 12 }}>
                  Modifier
                </button>
                <button onClick={() => deleteElement(category, item.id)} style={{ padding: '4px 10px', border: 'none', borderRadius: 'var(--rayon-bouton)', background: '#a13d3d', color: 'white', cursor: 'pointer', fontSize: 12 }}>
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
