import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function UniversList({ universList, selectedUnivers, onSelect, onDelete, onEdit }) {
  const renderHeader = (univers) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{univers.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {univers.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {univers.franchise || 'Franchise inconnue'}
        {univers.group && ` • ${univers.group}`}
        {univers.dangerLevel && ` • ${univers.dangerLevel}`}
      </div>
    </div>
  );

  const renderContent = (univers) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {univers.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{univers.description}</p>
        </div>
      )}
      {univers.rules && (
        <div style={{ fontSize: 13 }}>
          <strong>Règles spécifiques :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{univers.rules}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={universList}
      selectedItem={selectedUnivers}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun univers ne correspond aux filtres sélectionnés."
    />
  );
}
