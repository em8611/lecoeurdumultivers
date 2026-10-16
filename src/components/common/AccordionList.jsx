import React from 'react';

function AccordionList({ items = [], selectedItem, onSelect, onEdit, onDelete, renderHeader, renderContent, emptyMessage }) {
  if (items.length === 0) {
    return <p style={{ color: 'var(--encre-douce)' }}>{emptyMessage || 'Aucun élément.'}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espace-2)' }}>
      {items.map(item => {
        const isOpen = selectedItem?.id === item.id;
        return (
          <div key={item.id} style={{ border: '1px solid var(--trait)', borderRadius: 'var(--rayon-carte)', overflow: 'hidden' }}>
            <div
              onClick={() => onSelect(isOpen ? null : item)}
              style={{
                padding: 12,
                cursor: 'pointer',
                backgroundColor: isOpen ? 'var(--douceur)' : 'var(--fond-carte)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8
              }}
            >
              <div style={{ flex: 1 }}>{renderHeader ? renderHeader(item) : item.name || item.nom}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {onEdit && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelect(item); onEdit(item); }}
                    style={{ padding: '4px 8px', fontSize: 12, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}
                  >
                    Modifier
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    style={{ padding: '4px 8px', fontSize: 12, border: 'none', borderRadius: 'var(--rayon-bouton)', background: '#a13d3d', color: 'white', cursor: 'pointer' }}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
            {isOpen && renderContent && (
              <div style={{ padding: 12, borderTop: '1px solid var(--trait)' }}>
                {renderContent(item)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AccordionList;
