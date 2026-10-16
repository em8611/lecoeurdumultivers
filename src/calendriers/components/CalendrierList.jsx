import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function CalendrierList({ calendriers, selectedCalendrier, onSelect, onDelete, onEdit, getUniversById }) {
  const renderHeader = (calendrier) => {
    const univers = calendrier.universId ? getUniversById(calendrier.universId) : null;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🗓️</span>
          <strong style={{ fontSize: 16 }}>{calendrier.name}</strong>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {univers?.name || 'Transversal'}
        </div>
      </div>
    );
  };

  const renderContent = (calendrier) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {calendrier.description && (
        <div>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{calendrier.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={calendriers}
      selectedItem={selectedCalendrier}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun calendrier ne correspond aux filtres sélectionnés."
    />
  );
}
