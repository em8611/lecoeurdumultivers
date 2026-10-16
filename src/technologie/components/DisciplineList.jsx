import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function DisciplineList({ items, selectedItem, onSelect, onDelete, onEdit }) {
  const renderHeader = (item) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{item.name}</strong>
        {item.category && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {item.category}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {item.description ? `${item.description.slice(0, 80)}${item.description.length > 80 ? '…' : ''}` : 'Aucune description'}
      </div>
    </div>
  );

  const renderContent = (item) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {item.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.description}</p>
        </div>
      )}
      {item.mechanism && (
        <div style={{ marginBottom: 12 }}>
          <strong>Fonctionnement :</strong>
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
