import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function TraditionList({ traditions, selectedTradition, onSelect, onDelete, onEdit }) {
  const renderHeader = (tradition) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{tradition.name}</strong>
        {tradition.category && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {tradition.category}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {tradition.description ? `${tradition.description.slice(0, 80)}${tradition.description.length > 80 ? '…' : ''}` : 'Aucune description'}
      </div>
    </div>
  );

  const renderContent = (tradition) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {tradition.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{tradition.description}</p>
        </div>
      )}
      {tradition.practice && (
        <div style={{ fontSize: 13 }}>
          <strong>Déroulement :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{tradition.practice}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={traditions}
      selectedItem={selectedTradition}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune tradition ne correspond aux filtres sélectionnés."
    />
  );
}
