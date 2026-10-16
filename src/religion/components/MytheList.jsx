import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function MytheList({ mythes, selectedMythe, onSelect, onDelete, onEdit }) {
  const renderHeader = (m) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{m.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {m.category}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {m.truthStatus}
      </div>
    </div>
  );

  const renderContent = (m) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {m.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Récit :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{m.description}</p>
        </div>
      )}
      {m.signification && (
        <div style={{ fontSize: 13 }}>
          <strong>Signification :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{m.signification}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={mythes}
      selectedItem={selectedMythe}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun mythe ne correspond à la recherche."
    />
  );
}
