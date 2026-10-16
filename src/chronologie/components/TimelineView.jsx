import React from 'react';

export default function TimelineView({ evenements, selectedEvenement, onSelect }) {
  if (evenements.length === 0) {
    return (
      <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
        Aucun événement ne correspond aux filtres sélectionnés.
      </p>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      <div style={{
        position: 'absolute',
        left: 8,
        top: 8,
        bottom: 8,
        width: 2,
        backgroundColor: 'var(--trait)'
      }} />
      {evenements.map(ev => {
        const isSelected = selectedEvenement?.id === ev.id;
        return (
          <div key={ev.id} style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{
              position: 'absolute',
              left: -24,
              top: 14,
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: isSelected ? 'var(--coeur)' : 'var(--fond-carte)',
              border: `2px solid ${isSelected ? 'var(--coeur)' : 'var(--brume)'}`,
              zIndex: 1
            }} />
            <div
              onClick={() => onSelect(isSelected ? null : ev)}
              style={{
                cursor: 'pointer',
                padding: 12,
                borderRadius: 'var(--rayon-carte)',
                border: isSelected ? '2px solid var(--coeur)' : '1px solid var(--trait)',
                backgroundColor: isSelected ? 'var(--douceur)' : 'var(--fond-carte)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: 15, color: 'var(--encre)' }}>{ev.name}</strong>
                <span style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
                }}>
                  {ev.category}
                </span>
                {ev.date && (
                  <span style={{ fontSize: 12, color: 'var(--encre-douce)', marginLeft: 'auto' }}>{ev.date}</span>
                )}
              </div>
              {ev.description && (
                <div style={{ fontSize: 13, color: 'var(--encre-douce)', marginTop: 6 }}>
                  {ev.description.slice(0, 120)}{ev.description.length > 120 ? '…' : ''}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
