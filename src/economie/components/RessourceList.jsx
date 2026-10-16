import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function RessourceList({ ressources, selectedRessource, onSelect, onDelete, onEdit, getCategoryIcon }) {
  const renderHeader = (ressource) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getCategoryIcon(ressource.category)}</span>
        <strong style={{ fontSize: 16 }}>{ressource.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {ressource.category || 'Catégorie inconnue'}
        {ressource.rarity && ` • ${ressource.rarity}`}
        {ressource.value && ` • ${ressource.value}`}
      </div>
    </div>
  );

  const renderContent = (ressource) => (
    <div style={{ fontSize: 14, color: '#555' }}>
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
