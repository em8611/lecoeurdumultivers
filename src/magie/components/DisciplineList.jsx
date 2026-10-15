import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function DisciplineList({ items, selectedItem, onSelect, onDelete, onEdit, icon }) {
  const renderHeader = (item) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <strong style={{ fontSize: 16 }}>{item.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {item.category}
        {item.description && ` • ${item.description.slice(0, 80)}${item.description.length > 80 ? '…' : ''}`}
      </div>
    </div>
  );

  const renderContent = (item) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {item.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.description}</p>
        </div>
      )}
      {item.mechanism && (
        <div style={{ marginBottom: 12 }}>
          <strong>Mécanique :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.mechanism}</p>
        </div>
      )}
      {item.practitionerIds && item.practitionerIds.length > 0 && (
        <div style={{ fontSize: 13 }}>
          <strong>Praticiens :</strong> {item.practitionerIds.length}
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={items}
      selectedItem={selectedItem}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun élément ne correspond à la recherche."
    />
  );
}
