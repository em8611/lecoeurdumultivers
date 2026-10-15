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
