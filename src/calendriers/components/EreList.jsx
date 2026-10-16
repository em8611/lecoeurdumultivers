import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function EreList({ eres, selectedEre, onSelect, onDelete, onEdit, getStatusIcon }) {
  const renderHeader = (ere) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getStatusIcon(ere.status)}</span>
        <strong style={{ fontSize: 16 }}>{ere.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {ere.startDate || '?'} — {ere.endDate || '?'}
      </div>
    </div>
  );

  const renderContent = (ere) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {ere.description && (
        <div>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{ere.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={eres}
      selectedItem={selectedEre}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune ère ne correspond aux filtres sélectionnés."
    />
  );
}
