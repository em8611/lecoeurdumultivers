import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function ArtefactList({ artefacts, selectedArtefact, onSelect, onDelete, onEdit, getCategoryIcon, getStatusIcon }) {
  const renderHeader = (artefact) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getCategoryIcon(artefact.category)}</span>
        <strong style={{ fontSize: 16 }}>{artefact.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {artefact.category || 'Catégorie inconnue'}
        {artefact.status && ` • ${getStatusIcon(artefact.status)} ${artefact.status}`}
      </div>
    </div>
  );

  const renderContent = (artefact) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {artefact.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{artefact.description}</p>
        </div>
      )}
      {artefact.powers && (
        <div style={{ fontSize: 13 }}>
          <strong>Pouvoirs :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{artefact.powers}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={artefacts}
      selectedItem={selectedArtefact}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun artefact ne correspond aux filtres sélectionnés."
    />
  );
}
