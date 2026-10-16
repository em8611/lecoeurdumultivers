// Types et configurations pour les objets

export const OBJECT_TYPES = [
  'Arme',
  'Armure',
  'Bouclier',
  'Accessoire',
  'Bijou',
  'Amulette',
  'Anneau',
  'Collier',
  'Bracelet',
  'Couronne',
  'Artefact',
  'Relique',
  'Cristal',
  'Pierre précieuse',
  'Orbe',
  'Bâton',
  'Sceptre',
  'Livre',
  'Grimoire',
  'Parchemin',
  'Carte',
  'Clé',
  'Outil',
  'Instrument',
  'Potion',
  'Élixir',
  'Philtre',
  'Poison',
  'Nourriture',
  'Boisson',
  'Matériau',
  'Composant',
  'Technologie',
  'Appareil',
  'Véhicule',
  'Vaisseau',
  'Conteneur',
  'Coffre',
  'Sac',
  'Monnaie',
  'Trésor',
  'Document',
  'Décoration',
  'Mobilier'
];

export const RARITY_LEVELS = [
  {
    name: 'Commun',
    color: '#6c757d',
    description: 'Objet ordinaire, facilement trouvable'
  },
  {
    name: 'Peu commun',
    color: '#28a745',
    description: 'Objet de qualité supérieure, assez rare'
  },
  {
    name: 'Rare',
    color: '#007bff',
    description: 'Objet précieux et difficile à obtenir'
  },
  {
    name: 'Épique',
    color: '#6f42c1',
    description: 'Objet extraordinaire aux propriétés remarquables'
  },
  {
    name: 'Légendaire',
    color: '#fd7e14',
    description: 'Objet de légende aux pouvoirs immenses'
  },
  {
    name: 'Mythique',
    color: '#dc3545',
    description: 'Objet légendaire créé par les dieux'
  },
  {
    name: 'Unique',
    color: '#ffc107',
    description: 'Objet unique en son genre, irremplaçable'
  }
];

export const MAGIC_SCHOOLS = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantement',
  'Évocation',
  'Illusion',
  'Nécromancie',
  'Transmutation',
  'Élémentaire',
  'Temporelle',
  'Spatiale',
  'Mentale',
  'Spirituelle',
  'Divine',
  'Profane',
  'Naturelle',
  'Artificielle',
  'Dimensionnelle'
];

export const CONDITION_STATES = [
  'Parfait',
  'Excellent',
  'Bon',
  'Correct',
  'Usé',
  'Abîmé',
  'Très abîmé',
  'Brisé',
  'Détruit',
  'Réparable',
  'Irréparable',
  'Maudit',
  'Béni',
  'Enchanté',
  'Corrompu'
];

export const DEFAULT_OBJECT = {
  id: null,
  name: '',
  type: 'Objet',
  category: 'Artefact',
  rarity: 'Commun',
  condition: 'Parfait',
  description: '',
  history: '',
  appearance: '',
  powers: [],
  abilities: [],
  requirements: [],
  restrictions: [],
  magicSchool: '',
  creator: '',
  origin: '',
  dateCreated: '',
  currentLocation: 'Inconnu',
  previousOwners: [],
  currentOwner: '',
  value: 0,
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0
  },
  materials: [],
  durability: 100,
  charges: 0,
  maxCharges: 0,
  rechargeable: false,
  consumable: false,
  stackable: false,
  tradeable: true,
  cursed: false,
  sentient: false,
  alignment: 'Neutre',
  personality: '',
  languages: [],
  senses: [],
  statistics: {
    timesUsed: 0,
    damageDealt: 0,
    livesAffected: 0
  },
  notes: ''
};

export const OBJECT_VALIDATION = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  value: {
    min: 0,
    max: 1000000000
  },
  weight: {
    min: 0,
    max: 10000
  },
  durability: {
    min: 0,
    max: 100
  }
};

// Alias pour compatibilité
export const OBJECT_RARITY_LEVELS = RARITY_LEVELS;
export const OBJECT_CONDITIONS = CONDITION_STATES;
