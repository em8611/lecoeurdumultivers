import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function RouteList({ routes, selectedRoute, onSelect, onDelete, onEdit, getTerritoireById }) {
  const renderHeader = (route) => {
    const from = route.fromTerritoireId ? getTerritoireById(route.fromTerritoireId) : null;
    const to = route.toTerritoireId ? getTerritoireById(route.toTerritoireId) : null;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{route.name}</strong>
          {route.status && (
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
            }}>
              {route.status}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
          {from?.name || '?'} → {to?.name || '?'}
        </div>
      </div>
    );
  };

  const renderContent = (route) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {route.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{route.description}</p>
        </div>
      )}
      {route.dangers && (
        <div style={{ fontSize: 13 }}>
          <strong>Dangers :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{route.dangers}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={routes}
      selectedItem={selectedRoute}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune route commerciale ne correspond aux filtres sélectionnés."
    />
  );
}
