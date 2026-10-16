import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function EvenementList({
  evenements,
  selectedEvenement,
  onSelect,
  onDelete,
  onEdit
}) {
  const renderHeader = (ev) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{ev.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {ev.category}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {ev.date}
      </div>
    </div>
  );

  const renderContent = (ev) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
