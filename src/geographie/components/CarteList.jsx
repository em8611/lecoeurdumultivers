import React from 'react';

export default function CarteList({ cartes, selectedCarte, onSelect, onDelete, onEdit, getTerritoireById }) {
  if (cartes.length === 0) {
    return (
      <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
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
              borderRadius: 'var(--rayon-carte)',
              border: isSelected ? '2px solid var(--coeur)' : '1px solid var(--trait)',
              backgroundColor: isSelected ? 'var(--douceur)' : 'var(--fond-carte)'
            }}
          >
            {carte.image ? (
              <img
                src={carte.image}
                alt={carte.name}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)', flexShrink: 0 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div style={{ width: 64, height: 64, borderRadius: 'var(--rayon-image)', backgroundColor: 'var(--douceur)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: 15, color: 'var(--encre)' }}>{carte.name}</strong>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(carte); }}
                    style={{ padding: '3px 8px', fontSize: 11, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(carte.id); }}
                    style={{ padding: '3px 8px', fontSize: 11, border: 'none', borderRadius: 'var(--rayon-bouton)', background: '#a13d3d', color: 'white', cursor: 'pointer' }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 2 }}>
                {territoire ? territoire.name : 'Aucun territoire lié'} • {(carte.points || []).length} point(s)
              </div>
              {carte.description && (
                <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
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
