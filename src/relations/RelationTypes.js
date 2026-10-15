// Types et configurations pour les relations

export const RELATION_TYPES = [
  'Amitié', 'Allié·e', 'Amour', 'Mentor', 'Protégé·e', 'Professeur', 'Formateur', 'Élève', 'Apprenti', 'Étudiant', 'Directeur', 'Rivalité', 'Antagoniste', 'Abuseur', 'Victime', 'Meurtrier', 'Connaissance', 'Neutre', 'Idole', 'Fanatique',
  'Compagnon', 'Enfant', 'Soeur', 'Collègue', 'Partenaire', 'Tante', 'Cousin', 'Oncle', 'Mère', 'Père',
  'Grand-parent', 'Frère', 'Créateur', 'Propriétaire', 'Spécial'
];

export const RELATION_STATUSES = [
  'Active',
  'Ancienne',
  'Secrète',
  'Compliquée',
  'En pause',
  'Conflictuelle',
  'En évolution',
  'Fragile',
  'Rompue'
];

// Catégories de relations
export const RELATION_CATEGORIES = {
  ENNEMI: ['Antagoniste', 'Rivalité'],
  AMICAL: ['Amitié', 'Connaissance'],
  VIOLENCE: ['Abuseur', 'Victime', 'Meurtrier'],
  ADMIRATION: ['Idole'],
  OBSESSION: ['Fanatique']
};

// Déterminer si un type est ennemi
export const isEnemyType = (type) => {
  return RELATION_CATEGORIES.ENNEMI.includes(type);
};

// Déterminer si un type est violent/traumatique
export const isViolentType = (type) => {
  return RELATION_CATEGORIES.VIOLENCE.includes(type);
};

// Déterminer si un type est lié à l'admiration
export const isAdmirationType = (type) => {
  return RELATION_CATEGORIES.ADMIRATION.includes(type);
};

// Déterminer si un type est obsessionnel
export const isObsessionType = (type) => {
  return RELATION_CATEGORIES.OBSESSION.includes(type);
};

// Déterminer si un type est amical
export const isFriendlyType = (type) => {
  return RELATION_CATEGORIES.AMICAL.includes(type);
};

// Déterminer si un type est familial
export const isFamilialType = (type) => {
  return ['Enfant', 'Soeur', 'Tante', 'Cousin', 'Oncle', 'Mère', 'Père', 'Grand-parent', 'Frère'].includes(type);
};

// Déterminer si un type est professionnel
export const isProfessionalType = (type) => {
  return ['Collègue', 'Mentor', 'Protégé·e', 'Professeur', 'Formateur', 'Élève', 'Apprenti', 'Étudiant', 'Directeur', 'Partenaire'].includes(type);
};

// Obtenir la couleur associée à un type de relation
export const getTypeColor = (type) => {
  const map = {
    'Amitié': '#2196f3',
    'Allié·e': '#17a2b8',
    'Amour': '#e91e63',
    'Mentor': '#9c27b0',
  'Protégé·e': '#8e24aa',
  'Professeur': '#2e7d32',
  'Formateur': '#1b5e20',
  'Élève': '#43a047',
  'Apprenti': '#66bb6a',
  'Étudiant': '#81c784',
  'Directeur': '#2c3e50',
    'Rivalité': '#ff9800',
    'Antagoniste': '#dc3545',
    'Abuseur': '#b71c1c',
    'Victime': '#8e24aa',
    'Meurtrier': '#1a1a1a',
    'Connaissance': '#607d8b',
    'Neutre': '#6c757d',
  'Idole': '#d4af37',
  'Fanatique': '#7b1e3a',
    'Compagnon': '#00bcd4',
    'Enfant': '#ffb74d',
    'Soeur': '#ba68c8',
    'Collègue': '#4db6ac',
    'Partenaire': '#f06292',
    'Tante': '#ce93d8',
    'Cousin': '#9fa8da',
    'Oncle': '#7986cb',
    'Mère': '#ef5350',
    'Père': '#5c6bc0',
    'Grand-parent': '#8d6e63',
    'Frère': '#7e57c2',
    'Créateur': '#673ab7',
    'Propriétaire': '#795548',
    'Spécial': '#ffd54f'
  };
  return map[type] || '#6c757d';
};

// Labels pour l'intensité
export const getIntensityLabel = (val) => ({
  1: 'Très faible',
  2: 'Faible',
  3: 'Moyenne',
  4: 'Forte',
  5: 'Très forte'
})[val] || '—';

// Couleur pour l'intensité
export const getIntensityColor = (val) => {
  switch (val) {
    case 1: return '#90caf9';
    case 2: return '#64b5f6';
    case 3: return '#42a5f5';
    case 4: return '#1e88e5';
    case 5: return '#1565c0';
    default: return '#6c757d';
  }
};

// Structure par défaut d'une relation
export const DEFAULT_RELATION = {
  fromId: '',
  toId: '',
  type: 'Amitié',
  direction: 'Bilatérale',
  intensity: 3,
  status: 'Active',
  since: '',
  tags: [],
  // Champs conditionnels
  biologicalLink: '',
  custody: '',
  familyBranch: '',
  familyStatus: '',
  cohabitation: '',
  isLegalGuardian: '',
  adoptionDate: '',
  surnameUsed: '',
  emotionalCloseness: 3,
  familyNotes: '',
  hierarchy: '',
  collaboration: '',
  // Champs professionnels enrichis
  organization: '',
  role: '',
  contractType: '',
  confidentialityLevel: '',
  evaluationFrequency: '',
  department: '',
  project: '',
  mentorshipFocus: '',
  mentorDuration: '',
  developmentGoals: '',
    professionalEndDate: '',
    teachingSubject: '',
    teachingStyle: '',
    learningStyle: '',
    learningProgress: '',
    academicPerformance: '',
  performanceNotes: '',
  creationDate: '',
  ownership: '',
  companionType: '',
  // Compagnon enrichi
  companionSpecies: '',
  companionOrigin: '',
  companionAbilities: '',
  companionNeeds: '',
  bondLevel: 3,
  autonomyLevel: 3,
  trainingLevel: 3,
  careResponsibility: '',
  travelTogether: '',
  firstEncounterDate: '',
  favoriteActivities: '',
  expectedLifespan: '',
  healthNotes: '',
  specialNature: '',
  // Champs pour relation spéciale
  specialType: '',
  specialOrigin: '',
  specialConnectionLevel: 3,
  specialPowers: '',
  specialSymbol: '',
  specialConditions: '',
  specialConsequences: ''
};
// Étendre dynamiquement avec des champs amicales (préservé ici pour centralisation)
Object.assign(DEFAULT_RELATION, {
  friendlyTrustLevel: 3,
  friendlyContactFrequency: '',
  friendlySharedInterests: '',
  friendlyFavoriteActivities: '',
  friendlyPrimaryChannel: '',
  friendlyGroup: '',
  friendlyInsideJokes: '',
  friendlySupportType: '',
  friendlyFirstMeetingDate: '',
  friendlyFirstMeetingPlace: '',
  friendlyConflictNotes: ''
});

// Champs pour alliance (Allié·e)
Object.assign(DEFAULT_RELATION, {
  allianceScope: '',
  allianceMotivation: '',
  resourceSharing: '',
  riskTolerance: '',
  allianceTrustLevel: 3,
  coordinationFrequency: '',
  secrecyLevel: '',
  supportTypes: '',
  allianceTerms: '',
  pactName: '',
  pactSymbol: '',
  allianceStartDate: '',
  allianceEndDate: '',
  allianceNotes: ''
});

// Champs pour amour (Amour)
Object.assign(DEFAULT_RELATION, {
  romanticStatus: '',
  commitmentLevel: 3,
  jealousyLevel: 2,
  cohabitationStatus: '',
  loveLanguages: '',
  secretRelationship: '',
  familyApproval: '',
  anniversaryDate: '',
  firstMeetingStory: '',
  sharedRituals: '',
  dealBreakers: '',
  intimacyNotes: ''
});

// Champs pour rivalité (Rivalité)
Object.assign(DEFAULT_RELATION, {
  competitionType: '',
  stakes: '',
  rivalryOrigin: '',
  fairnessLevel: '',
  escalationLevel: 3,
  respectLevel: 3,
  notableClashes: '',
  currentScore: '',
  rulesOfEngagement: '',
  truceStatus: '',
  sabotageNotes: '',
  publicPerception: '',
  alliesInvolved: '',
  nextConfrontationDate: ''
});

// Champs pour antagoniste (Antagoniste)
Object.assign(DEFAULT_RELATION, {
  antagonismType: '',
  enmityOrigin: '',
  intentLevel: '',
  threatLevel: 3,
  methods: '',
  resources: '',
  territory: '',
  lastEncounterDate: '',
  nextMove: '',
  weakPoints: '',
  moralLimits: '',
  psychologicalWarfare: '',
  leverage: '',
  publicThreatLevel: ''
});

// Champs pour relation neutre (Neutre)
Object.assign(DEFAULT_RELATION, {
  neutralNature: '',
  neutralContactFrequency: '',
  neutralContext: '',
  neutralInterestLevel: 1,
  neutralEvolutionPotential: '',
  neutralReason: '',
  neutralBarriers: '',
  neutralNotes: ''
});

// Champs pour relations violentes/traumatiques (Abuseur, Victime, Meurtrier)
Object.assign(DEFAULT_RELATION, {
  violenceType: '',
  violenceCircumstances: '',
  violenceDate: '',
  violenceDuration: '',
  violenceFrequency: '',
  violenceSeverity: 3,
  traumaLevel: 3,
  witnessesInvolved: '',
  legalConsequences: '',
  supportReceived: '',
  recoveryStatus: '',
  triggerWarnings: '',
  murderCircumstances: '',
  murderMethod: '',
  murderMotive: '',
  murderPremeditation: '',
  bodyDiscovery: '',
  investigation: '',
  suspicionLevel: '',
  abuseType: '',
  abuseDuration: '',
  powerDynamics: '',
  manipulationTactics: '',
  escapeAttempts: '',
  protectionMeasures: '',
  violenceNotes: ''
});

// Champs pour relations d'admiration (Idole) et obsession (Fanatique)
Object.assign(DEFAULT_RELATION, {
  idolPublicPersona: '',
  idolRealPersona: '',
  idolDistanceLevel: 3, // 1 très proche perçu, 5 inaccessible
  idolInfluenceAreas: '',
  idolAccessFrequency: '',
  idolFanPerception: '',
  idolContradictions: '',
  idolBoundaries: '',
  fanaticDevotionLevel: 3, // 1 intérêt, 5 dévotion extrême
  fanaticBeliefSystem: '',
  fanaticMotivations: '',
  fanaticBehaviorPatterns: '',
  fanaticRisks: '',
  fanaticControlMethods: '',
  fanaticTriggerPoints: '',
  fanaticEscalationSigns: ''
});

// Historique commun (entries: { date, event, notes })
Object.assign(DEFAULT_RELATION, {
  history: []
});
