import React, { useState } from 'react';
import { useElementsState, useElementsActions } from '../../state/elementsStore.jsx';

// Éditeur de liaisons simples entre un élément et d'autres éléments du store global.
// Version volontairement simple en attendant un système de relations plus complet.
function ElementRelationsEditor({ element }) {
  const state = useElementsState();
  const { updateElement } = useElementsActions();
  const [targetCategory, setTargetCategory] = useState('characters');
  const [targetId, setTargetId] = useState('');

  const categories = [
    { key: 'characters', label: 'Personnages' },
    { key: 'locations', label: 'Lieux' },
    { key: 'objects', label: 'Objets' },
    { key: 'bestiaires', label: 'Bestiaire' },
    { key: 'nourritures', label: 'Nourriture' },
    { key: 'materiauxs', label: 'Matériaux' }
  ];

  const links = Array.isArray(element.links) ? element.links : [];
  const targetItems = state[targetCategory] || [];

  const addLink = () => {
    if (!targetId) return;
    const target = targetItems.find(i => String(i.id) === String(targetId));
    if (!target) return;
    const newLinks = [...links, { category: targetCategory, id: target.id, name: target.name || target.nom }];
    updateElement(element.category === 'character' ? 'characters' : element.category, element.id, { links: newLinks });
  };

  const removeLink = (idx) => {
    const newLinks = links.filter((_, i) => i !== idx);
    updateElement(element.category === 'character' ? 'characters' : element.category, element.id, { links: newLinks });
  };

  return (
    <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #eee' }}>
      <strong>Liaisons</strong>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 8 }}>
        <select value={targetCategory} onChange={(e) => setTargetCategory(e.target.value)} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}>
          {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <select value={targetId} onChange={(e) => setTargetId(e.target.value)} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}>
          <option value="">Choisir un élément...</option>
          {targetItems.map(item => (
            <option key={item.id} value={item.id}>{item.name || item.nom}</option>
          ))}
        </select>
        <button type="button" onClick={addLink} style={{ padding: '6px 12px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Lier
        </button>
      </div>
      {links.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {links.map((link, idx) => (
            <span key={`${link.category}-${link.id}-${idx}`} style={{ background: '#f1f3f5', padding: '4px 10px', borderRadius: 12, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {link.name}
              <button onClick={() => removeLink(idx)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ElementRelationsEditor;
