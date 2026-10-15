import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function LangueList({ langues, selectedLangue, onSelect, onDelete, onEdit, getStatusIcon }) {
  const renderHeader = (langue) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{getStatusIcon(langue.status)}</span>
        <strong style={{ fontSize: 16 }}>{langue.name}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {langue.family || 'Famille inconnue'}
        {langue.writingSystem && ` • ${langue.writingSystem}`}
      </div>
    </div>
  );

  const renderContent = (langue) => (
    <div style={{ fontSize: 14, color: '#555' }}>
      {langue.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{langue.description}</p>
        </div>
      )}
      {langue.phonetics && (
        <div style={{ fontSize: 13 }}>
          <strong>Phonétique :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{langue.phonetics}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={langues}
      selectedItem={selectedLangue}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune langue ne correspond aux filtres sélectionnés."
    />
  );
}
