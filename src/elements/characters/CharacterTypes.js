// Types et configurations pour les personnages

import { CHARACTER_ENERGIES, CHARACTER_ENERGY_COLORS } from './constants/energies.js';
import { CHARACTER_RACES } from './constants/races.js';
import { CHARACTER_ALIGNMENTS } from './constants/alignments.js';
import { CHARACTER_GENDERS } from './constants/genders.js';
import { CHARACTER_STATS } from './constants/stats.js';

export const CHARACTER_TYPES = [
  'Protagoniste',
  'Protecteur direct',
  'Protectrice indirecte',
  'Protecteur indirect',
  'Antagoniste',
  'Allié',
  'Compagnon',
  'Enfant',
  'Gardien',
  'Gardienne',
  'Guide',
  'Neutre',
  'Alias'
];

// Couleurs associées aux types de personnages
export const CHARACTER_TYPE_COLORS = {
  'Protagoniste': '#FFD700',        // Or - héros principal
  'Protecteur direct': '#4169E1',   // Bleu royal - protection active
  'Protectrice indirecte': '#87CEEB', // Bleu ciel - protection subtile
  'Protecteur indirect': '#6495ED',  // Bleu acier - soutien en arrière-plan
  'Antagoniste': '#DC143C',          // Rouge cramoisi - opposition
  'Allié': '#32CD32',                // Vert citron - soutien positif
  'Compagnon': '#FF69B4',            // Rose vif - lien affectif
  'Enfant': '#FFA07A',               // Saumon clair - innocence
  'Gardien': '#8B4513',              // Brun - stabilité, protection
  'Gardienne': '#A0522D',            // Brun sienna - protection féminine
  'Guide': '#9370DB',                // Violet moyen - sagesse
  'Neutre': '#808080'                // Gris - neutralité
};

// Couleurs associées aux énergies
export { CHARACTER_ENERGIES, CHARACTER_ENERGY_COLORS };

export { CHARACTER_RACES };

export { CHARACTER_ALIGNMENTS, CHARACTER_GENDERS, CHARACTER_STATS };

export const DEFAULT_CHARACTER = {
  id: null,
  name: '',
  code: '',
  type: 'Protecteur direct',
  race: 'Humain',
  alignment: 'Neutre Strict',
  age: 25,
  gender: 'Masculin',
  height: 170,
  weight: 70,
  eyeColor: '',
  hairColor: '',
  physicalAppearance: '',
  images: [],
  clothingStyle: '',
  otherAppearance: '',
  distinctiveFeatures: '',
  origin: '',
  description: '',
  backstory: '',
  childrenBackstory: '',
  adolescentBackstory: '',
  beforeEmBackstory: '',
  storyArcs: [],
  cycles: [],
  subArcs: [],
  events: [],
  milestones: [],
  firstAppearance: '',
  appearances: [],
  associatedLocations: [],
  universeFranchises: [],
  personality: '',
  personalityTraits: [],
  behavior: '',
  languageStyle: '',
  goals: [],
  strengths: [],
  fears: [],
  values: [],
  gestures: [],
  mannerisms: [],
  passions: [],
  energy: '',
  combatBehavior: '',
  abilities: [],
  skills: [],
  equipment: [],
  mainWeapon: '',
  armor: '',
  communicationDevice: '',
  pendant: '',
  relationships: [],
  familyBehavior: '',
  alliesBehavior: '',
  enemiesBehavior: '',
  strangersBehavior: '',
  authorityBehavior: '',
  teams: [],
  animations: [],
  repliques: [],
  starRating: 3,
  gachaEvent: '',
  combatType: '',
  likes: [],
  dislikes: [],
  food: '',
  environment: '',
  stats: {
    Force: 10,
    Dextérité: 10,
    Constitution: 10,
    Intelligence: 10,
    Sagesse: 10,
    Charisme: 10,
    Vitalité: 100,
    Attaque: 50,
    Défense: 30,
    Vitesse: 50,
    'Chance Critique': 5,
    'Pourcentage Critique': 150,
    Précision: 70,
    Esquive: 20,
    'Résistance Magique': 25,
    'Puissance Magique': 40
  },
  hitPoints: 100,
  armorClass: 10,
  level: 1,
  experience: 0,
  languages: ['Commun'],
  notes: '',
  // Section Protecteur Direct
  protecteurRole: '',
  protectedPersons: [],
  protecteurSerment: '',
  protectionMethod: '',
  protectionReason: '',
  devotionLevel: 5,
  moralLimits: '',
  // Section Protecteur Indirect
  protecteurIndirectRole: '',
  protectedPersonsIndirect: [],
  protecteurIndirectSerment: '',
  protectionMethodIndirect: '',
  protectionReasonIndirect: '',
  devotionLevelIndirect: 5,
  moralLimitsIndirect: '',
  // Section Antagoniste
  antagonisteGenre: '',
  antagonisteGroupes: [],
  antagonisteHistoire: '',
  antagonisteComportement: '',
  mainGoal: '',
  deepMotivation: '',
  antagonistOf: '',
  methods: '',
  redemptionPossible: 'maybe',
  exploitableWeaknesses: '',
  // Section Allié
  allieNiveau: '',
  allieGroupes: [],
  allieHistoire: '',
  allieComportement: '',
  allyMotivation: '',
  allySupportType: 'logistique',
  allyTrustLevel: 5,
  allyLimits: '',
  // Section Compagnon
  compagnonQuiAccompagne: '',
  compagnonApparence: '',
  compagnonHistoire: '',
  compagnonComportement: '',
  companionBond: '',
  companionRole: '',
  companionStrength: '',
  companionTension: '',
  // Section Enfant
  exactAge: 0,
  guardian: '',
  enfantPere: '',
  enfantMere: '',
  maturityLevel: 5,
  storyRole: 'protected',
  enfantHistoire: '',
  trauma: '',
  // Section Gardien
  gardienHistoire: '',
  guardedThing: '',
  guardDuration: '',
  intruderAttitude: 'hostile',
  oath: '',
  failureConsequences: '',
  guardianPowers: '',
  // Section Guide
  guideHistoire: '',
  guidedPerson: '',
  guidanceType: 'mentor',
  wisdomPhrase: '',
  specialWisdom: '',
  teachingMethod: '',
  mentoringReason: '',
  helpLimit: '',
  // Section Neutre
  neutreHistoire: '',
  neutralPosition: '',
  neutralShiftConditions: '',
  neutralIntel: ''
  ,
  // Évolution par matériaux (catégories de collecte)
  evolutionMaterials: {
    ennemis: [],            // Matériaux obtenus des ennemis
    donjonsReguliers: [],   // Matériaux de donjons standards
    donjonsHebdomadaires: [], // Matériaux de donjons hebdomadaires
    bossRegulieres: [],     // Matériaux des boss réguliers
    bossHebdomadaires: [],  // Matériaux des boss hebdomadaires
    speciaux: []            // Matériaux spéciaux divers
  },
  // Objectifs d'évolution (cibles de quantité par nom / palier)
  evolutionTargets: {
    // structure attendue: {
    //   NomMateriau: { total: 0, paliers: { 1: 0, 2: 0 } }
    // }
  },
  // Arborescence des compétences
  skillTree: [],
  // Section Alias
  aliasHistoire: '',
  aliasIdentite: '',
  aliasRaison: '',
  aliasReveal: '',
  // Section Protagoniste
  protagonisteHistoire: '',
  protagonisteObjectifPrincipal: '',
  protagonisteMotivation: '',
  protagonisteEvolution: ''
};

export const CHARACTER_VALIDATION = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  age: {
    min: 0,
    max: 10000
  },
  height: {
    min: 30,
    max: 500
  },
  weight: {
    min: 1,
    max: 1000
  }
};
