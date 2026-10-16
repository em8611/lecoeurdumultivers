import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function ArtefactList({ artefacts, selectedArtefact, onSelect, onDelete, onEdit }) {
  const renderHeader = (artefact) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{artefact.name}</strong>
        {artefact.status && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {artefact.status}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {artefact.category || 'Catégorie inconnue'}
      </div>
    </div>
  );

  const renderContent = (artefact) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
