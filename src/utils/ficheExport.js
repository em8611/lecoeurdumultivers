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

export function exportFicheConcept(concept) {
  const lines = [
    `# Fiche technique — ${concept.name || 'Sans nom'}`,
    '',
    `Catégorie : ${concept.category || '-'}`,
    '',
    '## Description',
    concept.description || '-',
    '',
    '## Fonctionnement / Mécanisme',
    concept.mechanism || '-',
    '',
    '## Portée / Application',
    concept.scope || '-',
    '',
    '## Origine / Historique',
    concept.origin || '-',
    '',
    '## Exceptions / Limites',
    concept.exceptions || '-',
    '',
    '## Conséquences / Enjeux',
    concept.consequences || '-',
    '',
    '## Concepts liés',
    (concept.relatedConcepts || []).join(', ') || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(concept.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheEvenement(evenement) {
  const lines = [
    `# Fiche technique — ${evenement.name || 'Sans nom'}`,
    '',
    `Catégorie : ${evenement.category || '-'}`,
    `Date : ${evenement.date || '-'}`,
    '',
    '## Description',
    evenement.description || '-',
    '',
    '## Conséquences / Impact',
    evenement.consequences || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(evenement.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheCarte(carte) {
  const lines = [
    `# Fiche technique — ${carte.name || 'Sans nom'}`,
    '',
    '## Description',
    carte.description || '-',
    '',
    `## Points (${(carte.points || []).length})`,
    ...(carte.points || []).map(p => `- ${p.label || 'Sans nom'}${p.description ? ` : ${p.description}` : ''}`),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(carte.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheTerritoire(territoire) {
  const lines = [
    `# Fiche technique — ${territoire.name || 'Sans nom'}`,
    '',
    `Type : ${territoire.type || '-'}`,
    `Climat : ${territoire.climate || '-'}`,
    `Population : ${territoire.population || '-'}`,
    '',
    '## Description',
    territoire.description || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(territoire.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheDiplomatie(relation, fromName, toName) {
  const lines = [
    `# Fiche de relation diplomatique`,
    '',
    `De : ${fromName || relation.fromId}`,
    `Vers : ${toName || relation.toId}`,
    `Statut : ${relation.status || '-'}`,
    `Intensité : ${relation.intensity ?? '-'}/5`,
    `Depuis : ${relation.startDate || '-'}`,
    '',
    '## Description / Historique',
    relation.description || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-diplomatie-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheDiscipline(discipline, family) {
  const lines = [
    `# Fiche technique — ${discipline.name || 'Sans nom'}`,
    '',
    `Famille : ${family || '-'}`,
    `Catégorie : ${discipline.category || '-'}`,
    '',
    '## Description',
    discipline.description || '-',
    '',
    '## Règles / Mécanique de fonctionnement',
    discipline.mechanism || '-',
    '',
    "## Source d'énergie / Prérequis physiques",
    discipline.energySource || '-',
    '',
    '## Niveaux de maîtrise / Progression',
    (discipline.masteryLevels || []).join(' → ') || '-',
    '',
    '## Limites / Dangers / Contre-mesures',
    discipline.limitations || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(discipline.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheUnivers(univers) {
  const lines = [
    `# Fiche technique — ${univers.name || 'Sans nom'}`,
    '',
    `Franchise : ${univers.franchise || '-'}`,
    `Catégorie : ${univers.group || '-'}`,
    `Statut : ${univers.status || '-'}`,
    `Niveau de danger : ${univers.dangerLevel || '-'}`,
    '',
    '## Description',
    univers.description || '-',
    '',
    '## Règles spécifiques',
    univers.rules || '-',
    '',
    "## Points d'accès / Portails",
    univers.accessPoints || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(univers.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheDivinite(divinite) {
  const lines = [
    `# Fiche technique — ${divinite.name || 'Sans nom'}`,
    '',
    `Panthéon : ${divinite.pantheon || '-'}`,
    `Nature/Alignement : ${divinite.alignment || '-'}`,
    `Statut : ${divinite.status || '-'}`,
    `Domaines : ${(divinite.domains || []).join(', ') || '-'}`,
    '',
    '## Description',
    divinite.description || '-',
    '',
    '## Origine / Mythe de naissance',
    divinite.origin || '-',
    '',
    '## Fidèles / Culte',
    divinite.followers || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(divinite.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheMythe(mythe) {
  const lines = [
    `# Fiche technique — ${mythe.name || 'Sans nom'}`,
    '',
    `Catégorie : ${mythe.category || '-'}`,
    `Véracité : ${mythe.truthStatus || '-'}`,
    '',
    '## Récit',
    mythe.description || '-',
    '',
    '## Origine',
    mythe.origin || '-',
    '',
    '## Signification / Morale',
    mythe.signification || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(mythe.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheQuete(quete) {
  const lines = [
    `# Fiche technique — ${quete.name || 'Sans nom'}`,
    '',
    `Catégorie : ${quete.category || '-'}`,
    `Statut : ${quete.status || '-'}`,
    `Avancement : ${quete.advancement ?? 0}%`,
    '',
    '## Description',
    quete.description || '-',
    '',
    '## Objectifs / Étapes',
    ...((quete.objectives || []).length ? quete.objectives.map(o => `- ${o}`) : ['-']),
    '',
    '## Enjeux',
    quete.stakes || '-',
    '',
    '## Résolution',
    quete.resolution || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(quete.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheLangue(langue) {
  const lines = [
    `# Fiche technique — ${langue.name || 'Sans nom'}`,
    '',
    `Famille : ${langue.family || '-'}`,
    `Statut : ${langue.status || '-'}`,
    `Système d'écriture : ${langue.writingSystem || '-'}`,
    '',
    '## Description',
    langue.description || '-',
    '',
    '## Phonétique / Prononciation',
    langue.phonetics || '-',
    '',
    '## Grammaire',
    langue.grammar || '-',
    '',
    '## Phrases types',
    ...((langue.samplePhrases || []).length ? langue.samplePhrases.map(p => `- ${p}`) : ['-']),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(langue.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheArtefact(artefact) {
  const lines = [
    `# Fiche technique — ${artefact.name || 'Sans nom'}`,
    '',
    `Catégorie : ${artefact.category || '-'}`,
    `État : ${artefact.status || '-'}`,
    `Créateur : ${artefact.creator || '-'}`,
    '',
    '## Description',
    artefact.description || '-',
    '',
    '## Pouvoirs / Propriétés',
    artefact.powers || '-',
    '',
    '## Histoire / Origine',
    artefact.history || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(artefact.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheRessource(ressource) {
  const lines = [
    `# Fiche technique — ${ressource.name || 'Sans nom'}`,
    '',
    `Catégorie : ${ressource.category || '-'}`,
    `Rareté : ${ressource.rarity || '-'}`,
    `Valeur estimée : ${ressource.value || '-'}`,
    '',
    '## Description',
    ressource.description || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(ressource.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFicheRoute(route) {
  const lines = [
    `# Fiche technique — ${route.name || 'Sans nom'}`,
    '',
    `Statut : ${route.status || '-'}`,
    '',
    '## Description',
    route.description || '-',
    '',
    '## Dangers',
    route.dangers || '-',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fiche-${slugify(route.name)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
