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

export function exportFicheLocation(location) {
  const lines = [
    `# Fiche technique — ${location.name || 'Sans nom'}`,
    '',
    `Type : ${location.type || '-'}`,
    `Climat : ${location.climate || '-'}`,
    `Taille : ${location.size || '-'}`,
    `Population : ${location.population ?? '-'}`,
    '',
    '## Description',
    location.description || '-',
    '',
    '## Histoire',
    location.history || '-',
    '',
    '## Caractéristiques',
    (location.features || []).join(', ') || '-',
    '',
    '## Habitants',
    (location.inhabitants || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(location.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheBestiaire(creature) {
  const lines = [
    `# Fiche technique — ${creature.nom || 'Sans nom'}`,
    '',
    `Type : ${creature.type || '-'}`,
    `Dangerosité : ${creature.dangerLevel || '-'}`,
    `Habitat : ${creature.habitat || '-'}`,
    `Rareté : ${creature.rarete || '-'}`,
    '',
    '## Apparence',
    creature.apparence || '-',
    '',
    '## Comportement',
    creature.comportement || '-',
    '',
    '## Capacités',
    (creature.capacites || []).join(', ') || '-',
    '',
    '## Faiblesses',
    (creature.faiblesses || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(creature.nom)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheMateriau(materiau) {
  const lines = [
    `# Fiche technique — ${materiau.nom || 'Sans nom'}`,
    '',
    `Type : ${materiau.type || '-'}`,
    `Rareté : ${materiau.rarete || '-'}`,
    `État : ${materiau.etat || '-'}`,
    `Dangereux : ${materiau.dangereux ? 'Oui' : 'Non'}`,
    '',
    '## Description',
    materiau.description || '-',
    '',
    '## Propriétés',
    (materiau.proprietes || []).join(', ') || '-',
    '',
    '## Utilisations',
    (materiau.utilisations || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(materiau.nom)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
