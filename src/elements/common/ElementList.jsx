import React from 'react';

function badgeStyle() {
  return {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: 'var(--rayon-pilule)',
    backgroundColor: 'var(--douceur)',
    color: 'var(--encre)',
    whiteSpace: 'nowrap'
  };
}

export function ElementList({ items, selectedId, onSelect, primaryKey, secondary, badge, emptyLabel, renderActions }) {
  if (!items || items.length === 0) {
    return <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic' }}>{emptyLabel || 'Aucun élément'}</p>;
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
              borderRadius: 'var(--rayon-carte)',
              cursor: 'pointer',
              background: isSelected ? 'var(--douceur)' : 'var(--fond-carte)',
              border: isSelected ? '1px solid var(--coeur)' : '1px solid var(--trait)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 'bold', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--encre)' }}>
                {item[primaryKey] || '(sans nom)'}
              </div>
              {secondary && <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>{secondary(item)}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {badgeInfo && badgeInfo.value && (
                <span style={badgeStyle()}>{badgeInfo.value}</span>
              )}
              {renderActions && renderActions(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
