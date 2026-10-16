import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function EreList({ eres, selectedEre, onSelect, onDelete, onEdit }) {
  const renderHeader = (ere) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{ere.name}</strong>
        {ere.status && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {ere.status}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {ere.startDate || '?'} — {ere.endDate || '?'}
      </div>
    </div>
  );

  const renderContent = (ere) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
