import React from 'react';

export default function TimelineView({ evenements, selectedEvenement, onSelect, getCategoryIcon }) {
  if (evenements.length === 0) {
    return (
      <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
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
        backgroundColor: '#dee2e6'
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
              backgroundColor: isSelected ? '#2196f3' : 'white',
              border: `2px solid ${isSelected ? '#2196f3' : '#6c757d'}`,
              zIndex: 1
            }} />
            <div
              onClick={() => onSelect(isSelected ? null : ev)}
              style={{
                cursor: 'pointer',
                padding: 12,
                borderRadius: 8,
                border: isSelected ? '2px solid #2196f3' : '1px solid #dee2e6',
                backgroundColor: isSelected ? '#f0f4ff' : 'white',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{getCategoryIcon(ev.category)}</span>
                <strong style={{ fontSize: 15 }}>{ev.name}</strong>
                {ev.date && (
                  <span style={{ fontSize: 12, color: '#999', marginLeft: 'auto' }}>{ev.date}</span>
                )}
              </div>
              {ev.description && (
                <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>
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
