import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function PouvoirList({
  pouvoirs,
  selectedPouvoir,
  onSelect,
  onDelete,
  onEdit,
  getCategoryIcon,
  getLevelColor
}) {
  const renderHeader = (pouvoir, isSelected) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{getCategoryIcon(pouvoir.category)}</span>
        <strong style={{ fontSize: 16 }}>{pouvoir.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4, display: 'flex', gap: 10 }}>
        <span>{pouvoir.type}</span>
        <span>•</span>
        <span>{pouvoir.category}</span>
        <span>•</span>
        <span style={{
          color: getLevelColor(pouvoir.level),
          fontWeight: 'bold'
        }}>
          {pouvoir.level}
        </span>
        <span>•</span>
        <span>{pouvoir.users.length} utilisateur(s)</span>
      </div>
    </div>
  );

  const renderContent = (pouvoir) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {pouvoir.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {pouvoir.description}
          </p>
        </div>
      )}
      {pouvoir.effects && (
        <div style={{ marginBottom: 12 }}>
          <strong>Effets :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {pouvoir.effects}
          </p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
        {pouvoir.range && <div><strong>Portée :</strong> {pouvoir.range}</div>}
        {pouvoir.duration && <div><strong>Durée :</strong> {pouvoir.duration}</div>}
        {pouvoir.cooldown && <div><strong>Recharge :</strong> {pouvoir.cooldown}</div>}
        {pouvoir.damage && <div><strong>Puissance :</strong> {pouvoir.damage}</div>}
      </div>
    </div>
  );

  return (
    <AccordionList
      items={pouvoirs}
      selectedItem={selectedPouvoir}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucun pouvoir ne correspond aux filtres sélectionnés."
    />
  );
}
