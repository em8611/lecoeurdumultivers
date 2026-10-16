import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function DictionnaireList({
  termes,
  selectedTerme,
  onSelect,
  onDelete,
  onEdit
}) {
  const renderHeader = (terme) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{terme.term}</strong>
        {terme.pronunciation && (
          <span style={{ fontSize: 12, color: 'var(--encre-douce)', fontStyle: 'italic' }}>{terme.pronunciation}</span>
        )}
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {terme.category}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {terme.definition && `${terme.definition.slice(0, 80)}${terme.definition.length > 80 ? '…' : ''}`}
      </div>
    </div>
  );

  const renderContent = (terme) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {terme.definition && (
        <div style={{ marginBottom: 12 }}>
          <strong>Définition :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {terme.definition}
          </p>
        </div>
      )}
      {terme.origin && (
        <div style={{ marginBottom: 12 }}>
          <strong>Origine :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {terme.origin}
          </p>
        </div>
      )}
      {terme.relatedTerms && terme.relatedTerms.length > 0 && (
        <div style={{ fontSize: 13 }}>
          <strong>Termes liés :</strong> {terme.relatedTerms.join(', ')}
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={termes}
      selectedItem={selectedTerme}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun terme ne correspond aux filtres sélectionnés."
    />
  );
}
