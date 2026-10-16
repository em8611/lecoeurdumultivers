import React from 'react';

function exportFicheRelation(relation) {
  const lines = [
    `# Fiche de relation`,
    '',
    `De : ${relation.fromName || relation.fromId}`,
    `Vers : ${relation.toName || relation.toId}`,
    `Type : ${relation.type || '-'}`,
    `Direction : ${relation.direction || '-'}`,
    `Statut : ${relation.status || '-'}`,
    `Intensité : ${relation.intensity ?? '-'}/5`,
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-relation-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function FicheRelationButton({ relation }) {
  return (
    <button
      type="button"
      onClick={() => exportFicheRelation(relation)}
      style={{ padding: '6px 10px', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer', fontSize: 12 }}
      title="Exporter la fiche de relation"
    >
      Fiche
    </button>
  );
}

export default FicheRelationButton;
