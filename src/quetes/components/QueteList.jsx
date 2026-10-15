import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function QueteList({ quetes, selectedQuete, onSelect, onDelete, onEdit, getCategoryIcon, getStatusIcon }) {
  const renderHeader = (q) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{getCategoryIcon(q.category)}</span>
        <strong style={{ fontSize: 16 }}>{q.name}</strong>
        <span style={{ fontSize: 16 }}>{getStatusIcon(q.status)}</span>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {q.category} • {q.status} • {q.advancement ?? 0}%
      </div>
      <div style={{ height: 4, borderRadius: 2, backgroundColor: '#e9ecef', marginTop: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${q.advancement ?? 0}%`, backgroundColor: '#2196f3' }} />
      </div>
    </div>
  );

  const renderContent = (q) => (
    <div style={{ fontSize: 14, color: '#555' }}>
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
