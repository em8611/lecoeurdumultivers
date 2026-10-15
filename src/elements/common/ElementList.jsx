import React from 'react';

const BADGE_COLORS = {
  danger: '#dc3545',
  type: '#6c757d',
  habitat: '#28a745',
  rarete: '#fd7e14',
  etat: '#17a2b8'
};

function badgeStyle(kind) {
  return {
    padding: '2px 8px',
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 'bold',
    background: BADGE_COLORS[kind] || '#6c757d',
    color: 'white',
    whiteSpace: 'nowrap'
  };
}

export function ElementList({ items, selectedId, onSelect, primaryKey, secondary, badge, emptyLabel, renderActions }) {
  if (!items || items.length === 0) {
    return <p style={{ color: '#999', fontStyle: 'italic' }}>{emptyLabel || 'Aucun élément'}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(item => {
        const isSelected = item.id === selectedId;
        const badgeInfo = badge ? badge(item) : null;
        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            style={{
              padding: 10,
              borderRadius: 8,
              cursor: 'pointer',
              background: isSelected ? '#e3f2fd' : '#fff',
              border: isSelected ? '2px solid #2196f3' : '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 'bold', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item[primaryKey] || '(sans nom)'}
              </div>
              {secondary && <div style={{ fontSize: 12, color: '#666' }}>{secondary(item)}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {badgeInfo && badgeInfo.value && (
                <span style={badgeStyle(badgeInfo.kind)}>{badgeInfo.value}</span>
              )}
              {renderActions && renderActions(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
