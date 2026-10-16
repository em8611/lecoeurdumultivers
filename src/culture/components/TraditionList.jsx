import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function TraditionList({ traditions, selectedTradition, onSelect, onDelete, onEdit, getCategoryIcon }) {
  const renderHeader = (tradition) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getCategoryIcon(tradition.category)}</span>
        <strong style={{ fontSize: 16 }}>{tradition.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {tradition.category || 'Catégorie inconnue'}
      </div>
    </div>
  );

  const renderContent = (tradition) => (
    <div style={{ fontSize: 14, color: '#555' }}>
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
