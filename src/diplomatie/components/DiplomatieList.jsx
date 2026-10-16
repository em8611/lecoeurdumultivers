import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

const intensityLabels = { 1: 'Très faible', 2: 'Faible', 3: 'Modérée', 4: 'Forte', 5: 'Extrême' };

export default function DiplomatieList({ relations, selectedRelation, onSelect, onDelete, onEdit, getEntityById }) {
  const renderHeader = (rel) => {
    const fromEntity = getEntityById(rel.fromType, rel.fromId);
    const toEntity = getEntityById(rel.toType, rel.toId);
    return (
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 15, color: 'var(--encre)' }}>{fromEntity?.name || '—'}</strong>
          <span style={{ color: 'var(--encre-douce)' }}>↔</span>
          <strong style={{ fontSize: 15, color: 'var(--encre)' }}>{toEntity?.name || '—'}</strong>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {rel.status}
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
          {intensityLabels[rel.intensity] || rel.intensity}
          {rel.startDate && ` • depuis ${rel.startDate}`}
        </div>
      </div>
    );
  };

  const renderContent = (rel) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
