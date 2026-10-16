import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function DiviniteList({ divinites, selectedDivinite, onSelect, onDelete, onEdit }) {
  const renderHeader = (d) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{d.name}</strong>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', color: 'var(--encre)'
        }}>
          {d.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
        {d.pantheon || 'Panthéon inconnu'}
        {d.alignment && ` • ${d.alignment}`}
        {d.domains && d.domains.length > 0 && ` • ${d.domains.join(', ')}`}
      </div>
    </div>
  );

  const renderContent = (d) => (
    <div style={{ fontSize: 14, color: 'var(--encre)' }}>
      {d.description && (
        <div style={{ marginBottom: 12 }}>
          <strong>Description :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{d.description}</p>
        </div>
      )}
      {d.followers && (
        <div style={{ fontSize: 13 }}>
          <strong>Fidèles :</strong>
          <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{d.followers}</p>
        </div>
      )}
    </div>
  );

  return (
    <AccordionList
      items={divinites}
      selectedItem={selectedDivinite}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      renderHeader={renderHeader}
      renderContent={renderContent}
      emptyMessage="Aucune divinité ne correspond à la recherche."
    />
  );
}
