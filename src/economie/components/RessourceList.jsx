import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function RessourceList({ ressources, selectedRessource, onSelect, onDelete, onEdit }) {
  const renderHeader = (ressource) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{ressource.name}</strong>
        {ressource.category && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
          }}>
            {ressource.category}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {ressource.rarity || 'Rareté inconnue'}
        {ressource.value && ` • ${ressource.value}`}
      </div>
    </div>
  );

  const renderContent = (ressource) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {ressource.description && (
        <div>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{ressource.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={ressources}
      selectedItem={selectedRessource}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune ressource ne correspond aux filtres sélectionnés."
    />
  );
}
