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

export function exportFicheAliment(aliment) {
  const lines = [
    `# Fiche technique — ${aliment.nom || 'Sans nom'}`,
    '',
    `Catégorie : ${aliment.categorie || '-'}`,
    `Rareté : ${aliment.rarete || '-'}`,
    `Origine : ${aliment.origine || '-'}`,
    '',
    '## Description',
    aliment.description || '-',
    '',
    '## Effets',
    aliment.effets || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(aliment.nom)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheRecette(recette) {
  const lines = [
    `# Fiche technique — ${recette.nom || 'Sans nom'}`,
    '',
    `Difficulté : ${recette.difficulte || '-'}`,
    `Temps : ${recette.temps || '-'}`,
    `Origine : ${recette.origine || '-'}`,
    '',
    '## Ingrédients',
    (recette.ingredients || []).join(', ') || '-',
    '',
    '## Préparation',
    recette.preparation || '-',
    '',
    '## Effets',
    recette.effets || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(recette.nom)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheObject(object) {
  const lines = [
    `# Fiche technique — ${object.name || 'Sans nom'}`,
    '',
    `Type : ${object.type || '-'}`,
    `Rareté : ${object.rarity || '-'}`,
    `Origine : ${object.origin || '-'}`,
    `Propriétaire actuel : ${object.owner || object.currentOwner || '-'}`,
    '',
    '## Description',
    object.description || '-',
    '',
    '## Pouvoirs',
    (object.powers || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(object.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheEquipe(equipe) {
  const lines = [
    `# Fiche technique — ${equipe.name || 'Sans nom'}`,
    '',
    `Type : ${equipe.type || '-'}`,
    `Statut : ${equipe.status || '-'}`,
    `Fondation : ${equipe.founded || '-'}`,
    `Quartier général : ${equipe.headquarters || '-'}`,
    '',
    '## Description',
    equipe.description || '-',
    '',
    '## Objectifs',
    equipe.objectives || '-',
    '',
    '## Moments marquants',
    equipe.keyMoments || '-',
    '',
    `## Membres (${(equipe.members || []).length})`,
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(equipe.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFichePouvoir(pouvoir) {
  const lines = [
    `# Fiche technique — ${pouvoir.name || 'Sans nom'}`,
    '',
    `Type : ${pouvoir.type || '-'}`,
    `Catégorie : ${pouvoir.category || '-'}`,
    `Niveau : ${pouvoir.level || '-'}`,
    `Rareté : ${pouvoir.rarity || '-'}`,
    '',
    '## Description',
    pouvoir.description || '-',
    '',
    '## Effets',
    pouvoir.effects || '-',
    '',
    '## Coût/Limitations',
    pouvoir.cost || '-',
    '',
    '## Prérequis',
    pouvoir.requirements || '-',
    '',
    '## Caractéristiques',
    `Portée : ${pouvoir.range || '-'}`,
    `Durée : ${pouvoir.duration || '-'}`,
    `Recharge : ${pouvoir.cooldown || '-'}`,
    `Puissance : ${pouvoir.damage || '-'}`,
    `Élément : ${pouvoir.element || '-'}`,
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(pouvoir.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheTerme(terme) {
  const lines = [
    `# Fiche technique — ${terme.term || 'Sans nom'}`,
    '',
    `Catégorie : ${terme.category || '-'}`,
    `Prononciation : ${terme.pronunciation || '-'}`,
    '',
    '## Définition',
    terme.definition || '-',
    '',
    '## Origine / Étymologie',
    terme.origin || '-',
    '',
    '## Exemples d\'usage',
    terme.examples || '-',
    '',
    '## Termes liés',
    (terme.relatedTerms || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(terme.term)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
