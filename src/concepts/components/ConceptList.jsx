import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function ConceptList({
  concepts,
  selectedConcept,
  onSelect,
  onDelete,
  onEdit,
  getCategoryIcon
}) {
  const renderHeader = (concept) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{getCategoryIcon(concept.category)}</span>
        <strong style={{ fontSize: 16 }}>{concept.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {concept.category}
        {concept.description && ` • ${concept.description.slice(0, 80)}${concept.description.length > 80 ? '…' : ''}`}
      </div>
    </div>
  );

  const renderContent = (concept) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {concept.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {concept.description}
          </p>
        </div>
      )}
      {concept.mechanism && (
        <div style={{ marginBottom: 12 }}>
          <strong>Fonctionnement :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {concept.mechanism}
          </p>
        </div>
      )}
      {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
        <div style={{ fontSize: 13 }}>
          <strong>Concepts liés :</strong> {concept.relatedConcepts.join(', ')}
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={concepts}
      selectedItem={selectedConcept}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun concept ne correspond aux filtres sélectionnés."
    />
  );
}
