import React, { useState } from 'react';
import { useElementsActions } from '../../state/elementsStore.jsx';

// Les ids reçus (ex: 'character') ne correspondent pas tous aux clés du store (ex: 'characters')
const CATEGORY_OPTIONS = [
  { id: 'character', storeKey: 'characters', label: '🎭 Personnage' },
  { id: 'locations', storeKey: 'locations', label: '🗺️ Lieu' },
  { id: 'objects', storeKey: 'objects', label: '💎 Objet' },
  { id: 'bestiaire', storeKey: 'bestiaires', label: '🐉 Créature du bestiaire' },
  { id: 'nourriture', storeKey: 'nourritures', label: '🍖 Plat ou ingrédient' },
  { id: 'materiaux', storeKey: 'materiauxs', label: '⚒️ Matériau' }
];

function ElementFormFactory({ initialCategory }) {
  const { addElement } = useElementsActions();
  const [categoryId, setCategoryId] = useState(initialCategory || 'character');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const current = CATEGORY_OPTIONS.find(c => c.id === categoryId) || CATEGORY_OPTIONS[0];

  const handleSubmit = e => {
    e.preventDefault();
    if (!nom.trim()) return;
    addElement(current.storeKey, { nom, description });
    setNom('');
    setDescription('');
    setMessage(`"${nom}" ajouté dans ${current.label}.`);
  };

  return (
    <div>
      <h2>➕ Créer un élément</h2>

      {message && (
        <p style={{ color: '#28a745', fontSize: 13 }}>{message}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 4 }}>Catégorie</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 4 }}>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={e => setNom(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 4 }}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default ElementFormFactory;
