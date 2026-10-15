import React from 'react';

export default function CarteList({ cartes, selectedCarte, onSelect, onDelete, onEdit, getTerritoireById }) {
  if (cartes.length === 0) {
    return (
      <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
        Aucune carte créée. Cliquez sur « + Nouvelle Carte » pour commencer.
      </p>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
      {cartes.map(carte => {
        const isSelected = selectedCarte?.id === carte.id;
        const territoire = carte.territoireId ? getTerritoireById(carte.territoireId) : null;
        return (
          <div
            key={carte.id}
            onClick={() => onSelect(isSelected ? null : carte)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              gap: 12,
              padding: 10,
              borderRadius: 8,
              border: isSelected ? '2px solid #2196f3' : '1px solid #dee2e6',
              backgroundColor: isSelected ? '#f0f4ff' : 'white'
            }}
          >
            {carte.image ? (
              <img
                src={carte.image}
                alt={carte.name}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd', flexShrink: 0 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div style={{ width: 64, height: 64, borderRadius: 6, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24 }}>
                🗺️
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: 15 }}>{carte.name}</strong>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(carte); }}
                    style={{ padding: '3px 7px', fontSize: 11, border: '1px solid #ccc', borderRadius: 4, background: 'white', cursor: 'pointer' }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(carte.id); }}
                    style={{ padding: '3px 7px', fontSize: 11, border: 'none', borderRadius: 4, background: '#dc3545', color: 'white', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                {territoire ? territoire.name : 'Aucun territoire lié'} • {(carte.points || []).length} point(s)
              </div>
              {carte.description && (
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  {carte.description.slice(0, 90)}{carte.description.length > 90 ? '…' : ''}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
