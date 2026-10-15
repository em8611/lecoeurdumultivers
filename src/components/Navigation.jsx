import React from 'react';

const TABS = [
  { key: 'home', label: 'Accueil' },
  { key: 'elements', label: 'Éléments' },
  { key: 'relations', label: 'Relations' },
  { key: 'equipes', label: 'Équipes' },
  { key: 'pouvoirs', label: 'Pouvoirs & Compétences' },
  { key: 'dictionnaire', label: 'Dictionnaire' },
  { key: 'concepts', label: 'Concepts' },
  { key: 'chronologie', label: 'Chronologie' }
];

export function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="main-nav">
      {TABS.map(tab => (
        <button
          key={tab.key}
          className={tab.key === activeTab ? 'active' : ''}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
