import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function TransportList({ transports, selectedTransport, onSelect, onDelete, onEdit }) {
  const renderHeader = (transport) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{transport.name}</strong>
        {transport.status && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {transport.status}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {transport.category || 'Catégorie inconnue'}
      </div>
    </div>
  );

  const renderContent = (transport) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
