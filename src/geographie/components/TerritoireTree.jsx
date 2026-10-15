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
          borderRadius: 6,
          cursor: 'pointer',
          backgroundColor: isSelected ? '#f0f4ff' : 'white',
          border: isSelected ? '2px solid #2196f3' : '1px solid #dee2e6'
        }}
      >
        <div>
          <strong style={{ fontSize: 14 }}>{territoire.name}</strong>
          <span style={{ fontSize: 11, color: '#999', marginLeft: 8 }}>{territoire.type}</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(territoire); }}
            style={{ padding: '3px 7px', fontSize: 11, border: '1px solid #ccc', borderRadius: 4, background: 'white', cursor: 'pointer' }}
          >
            ✏️
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(territoire.id); }}
            style={{ padding: '3px 7px', fontSize: 11, border: 'none', borderRadius: 4, background: '#dc3545', color: 'white', cursor: 'pointer' }}
          >
            ✕
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
      <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
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
