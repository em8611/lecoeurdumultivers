import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function RouteList({ routes, selectedRoute, onSelect, onDelete, onEdit, getStatusIcon, getTerritoireById }) {
  const renderHeader = (route) => {
    const from = route.fromTerritoireId ? getTerritoireById(route.fromTerritoireId) : null;
    const to = route.toTerritoireId ? getTerritoireById(route.toTerritoireId) : null;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{getStatusIcon(route.status)}</span>
          <strong style={{ fontSize: 16 }}>{route.name}</strong>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {from?.name || '?'} → {to?.name || '?'}
          {route.status && ` • ${route.status}`}
        </div>
      </div>
    );
  };

  const renderContent = (route) => (
    <div style={{ fontSize: 14, color: '#555' }}>
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
