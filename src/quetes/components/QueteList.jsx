import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function QueteList({ quetes, selectedQuete, onSelect, onDelete, onEdit }) {
  const renderHeader = (q) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{q.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {q.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {q.category} • {q.advancement ?? 0}%
      </div>
      <div style={{ height: 4, borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', marginTop: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${q.advancement ?? 0}%`, backgroundColor: 'var(--coeur)' }} />
      </div>
    </div>
  );

  const renderContent = (q) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {q.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{q.description}</p>
        </div>
      )}
      {q.objectives && q.objectives.length > 0 && (
        <div style={{ fontSize: 13 }}>
          <strong>Objectifs :</strong> {q.objectives.join(', ')}
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={quetes}
      selectedItem={selectedQuete}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune quête ne correspond aux filtres sélectionnés."
    />
  );
}
