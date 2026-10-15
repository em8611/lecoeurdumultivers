import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

const intensityLabels = { 1: 'Très faible', 2: 'Faible', 3: 'Modérée', 4: 'Forte', 5: 'Extrême' };

export default function DiplomatieList({ relations, selectedRelation, onSelect, onDelete, onEdit, getEntityById, getStatusIcon }) {
  const renderHeader = (rel) => {
    const fromEntity = getEntityById(rel.fromType, rel.fromId);
    const toEntity = getEntityById(rel.toType, rel.toId);
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 15 }}>{fromEntity?.name || '—'}</strong>
          <span style={{ fontSize: 16 }}>{getStatusIcon(rel.status)}</span>
          <strong style={{ fontSize: 15 }}>{toEntity?.name || '—'}</strong>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {rel.status} • {intensityLabels[rel.intensity] || rel.intensity}
          {rel.startDate && ` • depuis ${rel.startDate}`}
        </div>
      </div>
    );
  };

  const renderContent = (rel) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {rel.description && (
        <div>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{rel.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={relations}
      selectedItem={selectedRelation}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune relation diplomatique ne correspond aux filtres sélectionnés."
    />
  );
}
