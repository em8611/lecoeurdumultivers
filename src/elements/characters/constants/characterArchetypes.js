import { archetypeGroups as relationArchetypeGroups } from '../../../relations/archetypes.js';

const characterOnlyArchetypes = [
	'Amie',
	'Inventeur ingénieux',
	'Observateur calculateur',
	'Conseil',
	'Grand Frère et Soeur',
	'Admirateur',
	'Provocateur',
	'Figure parentale',
	'Rivale',
	'Mentor',
	'Garde-du-corps',
	'Enlever raté',
	'Scientifique',
	'Méfiante',
	'Maladroit',
	'Infirmière',
];

export const characterArchetypeGroups = [
	...relationArchetypeGroups,
	{
		label: 'Archétypes Personnage',
		options: characterOnlyArchetypes,
	},
];

export const characterArchetypes = characterArchetypeGroups.flatMap((group) => group.options);

// Pour compatibilité : archetypeGroups fournit l'ensemble combiné
export const archetypeGroups = characterArchetypeGroups;
