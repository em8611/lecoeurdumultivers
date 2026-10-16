import React from 'react';

function TerritoireNode({ territoire, children, selectedTerritoire, onSelect, onDelete, onEdit, depth }) {
  const isSelected = selectedTerritoire?.id === territoire.id;

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div
        onClick={() => onSelect(isSelected ? null : territoire)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 10px',
          marginBottom: 4,
          borderRadius: 'var(--rayon-bouton)',
          cursor: 'pointer',
          backgroundColor: isSelected ? 'var(--douceur)' : 'var(--fond-carte)',
          border: isSelected ? '2px solid var(--coeur)' : '1px solid var(--trait)'
        }}
      >
        <div>
          <strong style={{ fontSize: 14, color: 'var(--encre)' }}>{territoire.name}</strong>
          <span style={{ fontSize: 11, color: 'var(--encre-douce)', marginLeft: 8 }}>{territoire.type}</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(territoire); }}
            style={{ padding: '3px 8px', fontSize: 11, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}
          >
            Modifier
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(territoire.id); }}
            style={{ padding: '3px 8px', fontSize: 11, border: 'none', borderRadius: 'var(--rayon-bouton)', background: '#a13d3d', color: 'white', cursor: 'pointer' }}
          >
            Supprimer
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function TerritoireTree({ territoires, selectedTerritoire, onSelect, onDelete, onEdit }) {
  if (territoires.length === 0) {
    return (
      <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
        Aucun territoire créé. Cliquez sur « + Nouveau Territoire » pour commencer.
      </p>
    );
  }

  const byParent = {};
  territoires.forEach(t => {
    const key = t.parentId || '';
    if (!byParent[key]) byParent[key] = [];
    byParent[key].push(t);
  });
  Object.values(byParent).forEach(list => list.sort((a, b) => a.name.localeCompare(b.name)));

  const renderLevel = (parentKey, depth) => {
    const children = byParent[parentKey] || [];
    return children.map(t => (
      <TerritoireNode
        key={t.id}
        territoire={t}
        selectedTerritoire={selectedTerritoire}
        onSelect={onSelect}
        onDelete={onDelete}
        onEdit={onEdit}
        depth={depth}
      >
        {renderLevel(t.id, depth + 1)}
      </TerritoireNode>
    ));
  };

  return <div>{renderLevel('', 0)}</div>;
}
