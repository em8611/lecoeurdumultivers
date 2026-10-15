import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function EvenementList({
  evenements,
  selectedEvenement,
  onSelect,
  onDelete,
  onEdit,
  getCategoryIcon
}) {
  const renderHeader = (ev) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{getCategoryIcon(ev.category)}</span>
        <strong style={{ fontSize: 16 }}>{ev.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {ev.category}
        {ev.date && ` • ${ev.date}`}
      </div>
    </div>
  );

  const renderContent = (ev) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {ev.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {ev.description}
          </p>
        </div>
      )}
      {ev.consequences && (
        <div style={{ fontSize: 13 }}>
          <strong>Conséquences :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {ev.consequences}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={evenements}
      selectedItem={selectedEvenement}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun événement ne correspond aux filtres sélectionnés."
    />
  );
}
