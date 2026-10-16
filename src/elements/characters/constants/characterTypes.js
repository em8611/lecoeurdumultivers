export const characterTypeGroups = [
  {
    label: 'Protecteurs',
    options: [
      'Protecteur direct',
      'Protecteur indirect',
    ],
  },
  {
    label: 'Relations principales',
    options: [
      'Protagoniste',
      'Allié',
      'Antagoniste',
      'Compagnon',
    ],
  },
  {
    label: 'Rôles spécialisés',
    options: [
      'Guide',
      'Gardien',
      'Alias',
    ],
  },
  {
    label: 'Statuts',
    options: [
      'Enfant',
      'Neutre',
    ],
  },
];

export const characterTypes = characterTypeGroups.flatMap(group => group.options);
