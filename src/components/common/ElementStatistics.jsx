import React from 'react';

const CATEGORY_LABELS = {
  characters: { label: 'Personnages', icon: '🎭' },
  locations: { label: 'Lieux', icon: '🗺️' },
  objects: { label: 'Objets', icon: '💎' },
  bestiaires: { label: 'Bestiaire', icon: '🐉' },
  nourritures: { label: 'Nourriture', icon: '🍖' },
  materiauxs: { label: 'Matériaux', icon: '⚒️' }
};

function ElementStatistics({ elements }) {
  const total = Object.keys(CATEGORY_LABELS).reduce((sum, key) => sum + (elements[key]?.length || 0), 0);

  return (
    <div style={{ padding: 16 }}>
      <h2>📈 Statistiques</h2>
      <p style={{ color: '#666' }}>Total d'éléments : <strong>{total}</strong></p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {Object.entries(CATEGORY_LABELS).map(([key, meta]) => (
          <div key={key} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>{meta.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{elements[key]?.length || 0}</div>
            <div style={{ color: '#666', fontSize: 13 }}>{meta.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementStatistics;
