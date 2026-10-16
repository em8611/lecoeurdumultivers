import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function LangueList({ langues, selectedLangue, onSelect, onDelete, onEdit }) {
  const renderHeader = (langue) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{langue.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {langue.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {langue.family || 'Famille inconnue'}
        {langue.writingSystem && ` • ${langue.writingSystem}`}
      </div>
    </div>
  );

  const renderContent = (langue) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
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
