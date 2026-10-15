function slugify(name) {
  return (name || 'element')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function exportFicheCharacter(character) {
  const lines = [
    `# Fiche technique — ${character.name || 'Sans nom'}`,
    '',
    `Type : ${character.type || '-'}`,
    `Race : ${character.race || '-'}`,
    `Âge : ${character.age ?? '-'}`,
    `Origine : ${character.origin || '-'}`,
    '',
    '## Description',
    character.description || '-',
    '',
    '## Histoire',
    character.backstory || '-',
    '',
    '## Capacités',
    (character.abilities || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(character.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
