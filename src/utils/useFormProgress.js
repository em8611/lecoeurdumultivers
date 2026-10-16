import { useMemo } from 'react';

export const FORM_FIELD_SETS = {
  character: [
    'name', 'type', 'race', 'age', 'origin', 'description',
    'physicalAppearance', 'personality', 'behavior', 'backstory',
    'energy', 'abilities', 'skills', 'equipment', 'relationships',
    'teams', 'firstAppearance'
  ],
  team: [
    'name', 'type', 'description', 'members', 'leader', 'founded',
    'headquarters', 'objectives', 'status'
  ],
  power: [
    'name', 'type', 'category', 'level', 'description', 'effects',
    'cost', 'requirements', 'range', 'duration', 'cooldown', 'damage',
    'element', 'origin', 'learningMethod'
  ],
  term: [
    'term', 'category', 'definition', 'origin', 'pronunciation',
    'examples', 'relatedTerms', 'tags'
  ],
  concept: [
    'name', 'category', 'description', 'mechanism', 'scope',
    'origin', 'exceptions', 'consequences', 'relatedConcepts', 'tags'
  ],
  event: [
    'name', 'category', 'date', 'description', 'consequences',
    'characterIds', 'locationIds', 'equipeIds', 'relatedEventIds', 'tags'
  ],
  diplomatie: [
    'fromId', 'toId', 'status', 'intensity', 'description',
    'startDate', 'relatedEventIds', 'tags'
  ],
  discipline: [
    'name', 'category', 'description', 'mechanism', 'energySource',
    'masteryLevels', 'limitations', 'practitionerIds', 'tags'
  ],
  univers: [
    'name', 'franchise', 'group', 'description', 'rules', 'accessPoints',
    'dangerLevel', 'status', 'connectedUniverseIds', 'territoireIds', 'conceptIds', 'tags'
  ],
  divinite: [
    'name', 'pantheon', 'alignment', 'status', 'domains', 'description',
    'origin', 'symbols', 'followers', 'avatarCharacterIds', 'conceptIds', 'tags'
  ],
  mythe: [
    'name', 'category', 'truthStatus', 'description', 'origin', 'signification',
    'deityIds', 'characterIds', 'eventIds', 'tags'
  ],
  quete: [
    'name', 'category', 'status', 'description', 'objectives', 'stakes',
    'resolution', 'protagonistIds', 'antagonistIds', 'equipeIds',
    'locationIds', 'relatedEventIds', 'relatedQuestIds', 'tags'
  ],
  langue: [
    'name', 'family', 'status', 'writingSystem', 'description', 'phonetics',
    'grammar', 'samplePhrases', 'relatedLanguageIds', 'territoireIds',
    'equipeIds', 'characterIds', 'tags'
  ],
  artefact: [
    'name', 'category', 'status', 'description', 'powers', 'history',
    'creator', 'currentOwnerId', 'previousOwnerIds', 'locationId',
    'relatedQuestIds', 'relatedEventIds', 'tags'
  ],
  ressource: [
    'name', 'category', 'rarity', 'value', 'description', 'territoireIds', 'tags'
  ],
  route: [
    'name', 'status', 'fromTerritoireId', 'toTerritoireId', 'description',
    'dangers', 'ressourceIds', 'equipeIds', 'tags'
  ]
};

function isFilled(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  return Boolean(value);
}

export function useFormProgress(formData, fields = []) {
  return useMemo(() => {
    const totalCount = fields.length;
    const filledCount = fields.reduce((count, field) => (
      isFilled(formData?.[field]) ? count + 1 : count
    ), 0);
    const progress = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
    return { progress, filledCount, totalCount };
  }, [formData, fields]);
}
