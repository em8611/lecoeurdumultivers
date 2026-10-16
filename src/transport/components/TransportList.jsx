import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function TransportList({ transports, selectedTransport, onSelect, onDelete, onEdit, getCategoryIcon, getStatusIcon }) {
  const renderHeader = (transport) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getCategoryIcon(transport.category)}</span>
        <strong style={{ fontSize: 16 }}>{transport.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {transport.category || 'Catégorie inconnue'}
        {transport.status && ` • ${getStatusIcon(transport.status)} ${transport.status}`}
      </div>
    </div>
  );

  const renderContent = (transport) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {transport.description && (
        <div>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{transport.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={transports}
      selectedItem={selectedTransport}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun moyen de transport ne correspond aux filtres sélectionnés."
    />
  );
}
