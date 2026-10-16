// Registre partagé des modules et de leurs collections, utilisé par la page
// d'Accueil (tableau de bord, activité récente) et par la Galerie (images).

export const MODULES = [
  {
    key: 'elements', label: 'Éléments', icon: '📊',
    count: s => s.characters.length + s.locations.length + s.objects.length + s.bestiaires.length + s.nourritures.length + s.materiauxs.length
  },
  { key: 'relations', label: 'Relations', icon: '🔗', count: s => s.relations.length },
  { key: 'equipes', label: 'Équipes', icon: '👥', count: s => s.equipes.length },
  { key: 'pouvoirs', label: 'Pouvoirs & Compétences', icon: '✨', count: s => s.pouvoirs.length },
  { key: 'dictionnaire', label: 'Dictionnaire', icon: '📖', count: s => s.termes.length },
  { key: 'concepts', label: 'Concepts', icon: '⚖️', count: s => s.concepts.length },
  { key: 'chronologie', label: 'Chronologie', icon: '🕰️', count: s => s.evenements.length },
  { key: 'geographie', label: 'Cartes & Géographie', icon: '🗺️', count: s => s.cartes.length + s.territoires.length },
  { key: 'diplomatie', label: 'Factions & Diplomatie', icon: '🤝', count: s => s.diplomatieRelations.length },
  { key: 'magie', label: 'Magie & Système de Combat', icon: '🔮', count: s => s.ecolesMagie.length + s.stylesCombat.length },
  { key: 'univers', label: 'Univers / Multivers', icon: '🌌', count: s => s.universMultivers.length },
  { key: 'religion', label: 'Religion & Mythologie', icon: '⛩️', count: s => s.divinites.length + s.mythes.length },
  { key: 'quetes', label: 'Quêtes & Intrigues', icon: '🗡️', count: s => s.quetes.length },
  { key: 'langues', label: 'Langues & Écritures', icon: '🗣️', count: s => s.langues.length },
  { key: 'artefacts', label: 'Artefacts & Reliques', icon: '🗝️', count: s => s.artefacts.length },
  { key: 'economie', label: 'Économie & Commerce', icon: '💰', count: s => s.ressources.length + s.routesCommerciales.length },
  { key: 'technologie', label: 'Technologie & Sciences', icon: '🔬', count: s => s.sciences.length + s.technologies.length },
  { key: 'culture', label: 'Culture & Société', icon: '🏺', count: s => s.traditions.length },
  { key: 'calendriers', label: 'Calendriers & Ères', icon: '⏳', count: s => s.calendriers.length + s.eres.length },
  { key: 'transport', label: 'Transport & Voyage', icon: '🧭', count: s => s.transports.length }
];

// Collections dont les entrées possèdent un nom (+ dates et/ou images),
// pour l'activité récente de l'Accueil et la Galerie d'images.
export const ENTITY_SOURCES = [
  { moduleKey: 'elements', label: 'Personnage', icon: '📊', stateKey: 'characters' },
  { moduleKey: 'elements', label: 'Lieu', icon: '📊', stateKey: 'locations' },
  { moduleKey: 'elements', label: 'Objet', icon: '📊', stateKey: 'objects' },
  { moduleKey: 'elements', label: 'Bestiaire', icon: '📊', stateKey: 'bestiaires' },
  { moduleKey: 'relations', label: 'Relation', icon: '🔗', stateKey: 'relations' },
  { moduleKey: 'equipes', label: 'Équipe', icon: '👥', stateKey: 'equipes' },
  { moduleKey: 'pouvoirs', label: 'Pouvoir', icon: '✨', stateKey: 'pouvoirs' },
  { moduleKey: 'dictionnaire', label: 'Terme', icon: '📖', stateKey: 'termes' },
  { moduleKey: 'concepts', label: 'Concept', icon: '⚖️', stateKey: 'concepts' },
  { moduleKey: 'chronologie', label: 'Événement', icon: '🕰️', stateKey: 'evenements' },
  { moduleKey: 'geographie', label: 'Carte', icon: '🗺️', stateKey: 'cartes' },
  { moduleKey: 'geographie', label: 'Territoire', icon: '🗺️', stateKey: 'territoires' },
  { moduleKey: 'diplomatie', label: 'Relation diplomatique', icon: '🤝', stateKey: 'diplomatieRelations' },
  { moduleKey: 'magie', label: 'École de Magie', icon: '🔮', stateKey: 'ecolesMagie' },
  { moduleKey: 'magie', label: 'Style de Combat', icon: '🔮', stateKey: 'stylesCombat' },
  { moduleKey: 'univers', label: 'Univers', icon: '🌌', stateKey: 'universMultivers' },
  { moduleKey: 'religion', label: 'Divinité', icon: '⛩️', stateKey: 'divinites' },
  { moduleKey: 'religion', label: 'Mythe', icon: '⛩️', stateKey: 'mythes' },
  { moduleKey: 'quetes', label: 'Quête', icon: '🗡️', stateKey: 'quetes' },
  { moduleKey: 'langues', label: 'Langue', icon: '🗣️', stateKey: 'langues' },
  { moduleKey: 'artefacts', label: 'Artefact', icon: '🗝️', stateKey: 'artefacts' },
  { moduleKey: 'economie', label: 'Ressource', icon: '💰', stateKey: 'ressources' },
  { moduleKey: 'economie', label: 'Route commerciale', icon: '💰', stateKey: 'routesCommerciales' },
  { moduleKey: 'technologie', label: 'Discipline Scientifique', icon: '🔬', stateKey: 'sciences' },
  { moduleKey: 'technologie', label: 'Discipline Technologique', icon: '🔬', stateKey: 'technologies' },
  { moduleKey: 'culture', label: 'Tradition', icon: '🏺', stateKey: 'traditions' },
  { moduleKey: 'calendriers', label: 'Calendrier', icon: '⏳', stateKey: 'calendriers' },
  { moduleKey: 'calendriers', label: 'Ère', icon: '⏳', stateKey: 'eres' },
  { moduleKey: 'transport', label: 'Moyen de Transport', icon: '🧭', stateKey: 'transports' }
];
