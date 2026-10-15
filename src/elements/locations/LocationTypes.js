// Types et configurations pour les lieux

export const LOCATION_TYPES = [
  'Ville',
  'Village',
  'Hameau',
  'Métropole',
  'Cité-État',
  'Forêt',
  'Jungle',
  'Montagne',
  'Colline',
  'Plaine',
  'Désert',
  'Toundra',
  'Marécage',
  'Océan',
  'Mer',
  'Lac',
  'Rivière',
  'Île',
  'Continent',
  'Dimension',
  'Plan d\'existence',
  'Planète',
  'Lune',
  'Station spatiale',
  'Vaisseau',
  'Donjon',
  'Temple',
  'Château',
  'Forteresse',
  'Ruines',
  'Grotte',
  'Mine',
  'Laboratoire',
  'École',
  'Académie',
  'Bibliothèque',
  'Marché',
  'Taverne',
  'Auberge',
  'Prison',
  'Cimetière',
  'Sanctuaire'
];

export const CLIMATE_TYPES = [
  'Tropical',
  'Équatorial',
  'Subtropical',
  'Tempéré',
  'Continental',
  'Océanique',
  'Méditerranéen',
  'Aride',
  'Semi-aride',
  'Désertique',
  'Polaire',
  'Subpolaire',
  'Arctique',
  'Antarctique',
  'Montagnard',
  'Glacial',
  'Mystique',
  'Magique',
  'Corrompu',
  'Béni',
  'Neutre',
  'Artificiel',
  'Variable',
  'Chaotique'
];

export const TERRAIN_FEATURES = [
  'Montagneux',
  'Vallonné',
  'Plat',
  'Côtier',
  'Insulaire',
  'Forestier',
  'Rocheux',
  'Sablonneux',
  'Marécageux',
  'Volcanique',
  'Glaciaire',
  'Souterrain',
  'Flottant',
  'Cristallin',
  'Métallique',
  'Organique',
  'Énergétique',
  'Temporel',
  'Dimensionnel'
];

export const LOCATION_SIZES = [
  'Minuscule',
  'Très petit',
  'Petit',
  'Moyen',
  'Grand',
  'Très grand',
  'Énorme',
  'Gigantesque',
  'Colossal',
  'Continental',
  'Planétaire',
  'Stellaire',
  'Galactique',
  'Universel',
  'Multiversel'
];

export const DEFAULT_LOCATION = {
  id: null,
  name: '',
  type: 'Lieu',
  size: 'Moyen',
  climate: 'Tempéré',
  terrain: [],
  description: '',
  history: '',
  universeFranchises: [],
  culture: '',
  government: '',
  economy: '',
  religion: '',
  features: [],
  landmarks: [],
  inhabitants: [],
  population: 0,
  languages: ['Commun'],
  currency: 'Pièces d\'or',
  resources: [],
  threats: [],
  allies: [],
  enemies: [],
  connections: [],
  coordinates: {
    x: 0,
    y: 0,
    z: 0
  },
  mapImage: '',
  notes: ''
};

export const LOCATION_VALIDATION = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  population: {
    min: 0,
    max: 1000000000
  }
};

// Alias pour compatibilité
export const LOCATION_CLIMATE_TYPES = CLIMATE_TYPES;
export const LOCATION_TERRAIN_TYPES = TERRAIN_FEATURES;
export const LOCATION_SIZE_CATEGORIES = LOCATION_SIZES;

export const LOCATION_DANGER_LEVELS = [
  'Très sûr',
  'Sûr',
  'Modéré',
  'Dangereux',
  'Très dangereux',
  'Mortel'
];
