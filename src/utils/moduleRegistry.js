// Registre partagé des modules et de leurs collections, utilisé par la page
// d'Accueil (tableau de bord, activité récente) et par la Galerie (images).

export const MODULES = [
  {
    key: 'elements', label: 'Éléments',
    count: s => s.characters.length + s.locations.length + s.objects.length + s.bestiaires.length + s.nourritures.length + s.materiauxs.length
  },
  { key: 'relations', label: 'Relations', count: s => s.relations.length },
  { key: 'equipes', label: 'Équipes', count: s => s.equipes.length },
  { key: 'pouvoirs', label: 'Pouvoirs & Compétences', count: s => s.pouvoirs.length },
  { key: 'dictionnaire', label: 'Dictionnaire', count: s => s.termes.length },
  { key: 'concepts', label: 'Concepts', count: s => s.concepts.length },
  { key: 'chronologie', label: 'Chronologie', count: s => s.evenements.length },
  { key: 'geographie', label: 'Cartes & Géographie', count: s => s.cartes.length + s.territoires.length },
  { key: 'diplomatie', label: 'Factions & Diplomatie', count: s => s.diplomatieRelations.length },
  { key: 'magie', label: 'Magie & Système de Combat', count: s => s.ecolesMagie.length + s.stylesCombat.length },
  { key: 'univers', label: 'Univers / Multivers', count: s => s.universMultivers.length },
  { key: 'religion', label: 'Religion & Mythologie', count: s => s.divinites.length + s.mythes.length },
  { key: 'quetes', label: 'Quêtes & Intrigues', count: s => s.quetes.length },
  { key: 'langues', label: 'Langues & Écritures', count: s => s.langues.length },
  { key: 'artefacts', label: 'Artefacts & Reliques', count: s => s.artefacts.length },
  { key: 'economie', label: 'Économie & Commerce', count: s => s.ressources.length + s.routesCommerciales.length },
  { key: 'technologie', label: 'Technologie & Sciences', count: s => s.sciences.length + s.technologies.length },
  { key: 'culture', label: 'Culture & Société', count: s => s.traditions.length },
  { key: 'calendriers', label: 'Calendriers & Ères', count: s => s.calendriers.length + s.eres.length },
  { key: 'transport', label: 'Transport & Voyage', count: s => s.transports.length }
];

// Collections dont les entrées possèdent un nom (+ dates et/ou images),
// pour l'activité récente de l'Accueil et la Galerie d'images.
export const ENTITY_SOURCES = [
  { moduleKey: 'elements', label: 'Personnage', stateKey: 'characters' },
  { moduleKey: 'elements', label: 'Lieu', stateKey: 'locations' },
  { moduleKey: 'elements', label: 'Objet', stateKey: 'objects' },
  { moduleKey: 'elements', label: 'Bestiaire', stateKey: 'bestiaires' },
  { moduleKey: 'relations', label: 'Relation', stateKey: 'relations' },
  { moduleKey: 'equipes', label: 'Équipe', stateKey: 'equipes' },
  { moduleKey: 'pouvoirs', label: 'Pouvoir', stateKey: 'pouvoirs' },
  { moduleKey: 'dictionnaire', label: 'Terme', stateKey: 'termes' },
  { moduleKey: 'concepts', label: 'Concept', stateKey: 'concepts' },
  { moduleKey: 'chronologie', label: 'Événement', stateKey: 'evenements' },
  { moduleKey: 'geographie', label: 'Carte', stateKey: 'cartes' },
  { moduleKey: 'geographie', label: 'Territoire', stateKey: 'territoires' },
  { moduleKey: 'diplomatie', label: 'Relation diplomatique', stateKey: 'diplomatieRelations' },
  { moduleKey: 'magie', label: 'École de Magie', stateKey: 'ecolesMagie' },
  { moduleKey: 'magie', label: 'Style de Combat', stateKey: 'stylesCombat' },
  { moduleKey: 'univers', label: 'Univers', stateKey: 'universMultivers' },
  { moduleKey: 'religion', label: 'Divinité', stateKey: 'divinites' },
  { moduleKey: 'religion', label: 'Mythe', stateKey: 'mythes' },
  { moduleKey: 'quetes', label: 'Quête', stateKey: 'quetes' },
  { moduleKey: 'langues', label: 'Langue', stateKey: 'langues' },
  { moduleKey: 'artefacts', label: 'Artefact', stateKey: 'artefacts' },
  { moduleKey: 'economie', label: 'Ressource', stateKey: 'ressources' },
  { moduleKey: 'economie', label: 'Route commerciale', stateKey: 'routesCommerciales' },
  { moduleKey: 'technologie', label: 'Discipline Scientifique', stateKey: 'sciences' },
  { moduleKey: 'technologie', label: 'Discipline Technologique', stateKey: 'technologies' },
  { moduleKey: 'culture', label: 'Tradition', stateKey: 'traditions' },
  { moduleKey: 'calendriers', label: 'Calendrier', stateKey: 'calendriers' },
  { moduleKey: 'calendriers', label: 'Ère', stateKey: 'eres' },
  { moduleKey: 'transport', label: 'Moyen de Transport', stateKey: 'transports' }
];
