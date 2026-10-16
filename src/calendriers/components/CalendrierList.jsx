import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function CalendrierList({ calendriers, selectedCalendrier, onSelect, onDelete, onEdit, getUniversById }) {
  const renderHeader = (calendrier) => {
    const univers = calendrier.universId ? getUniversById(calendrier.universId) : null;
    return (
      <div style={{ flex: 1 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{calendrier.name}</strong>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
          {univers?.name || 'Transversal'}
        </div>
      </div>
    );
  };

  const renderContent = (calendrier) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
