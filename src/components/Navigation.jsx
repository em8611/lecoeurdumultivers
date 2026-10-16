import React from 'react';

const TABS = [
  { key: 'home', label: 'Accueil' },
  { key: 'elements', label: 'Éléments' },
  { key: 'relations', label: 'Relations' },
  { key: 'equipes', label: 'Équipes' },
  { key: 'pouvoirs', label: 'Pouvoirs & Compétences' },
  { key: 'dictionnaire', label: 'Dictionnaire' },
  { key: 'concepts', label: 'Concepts' },
  { key: 'chronologie', label: 'Chronologie' },
  { key: 'geographie', label: 'Cartes & Géographie' },
  { key: 'diplomatie', label: 'Factions & Diplomatie' },
  { key: 'magie', label: 'Magie & Combat' },
  { key: 'univers', label: 'Univers / Multivers' },
  { key: 'religion', label: 'Religion & Mythologie' },
  { key: 'quetes', label: 'Quêtes & Intrigues' },
  { key: 'langues', label: 'Langues & Écritures' },
  { key: 'artefacts', label: 'Artefacts & Reliques' },
  { key: 'economie', label: 'Économie & Commerce' },
  { key: 'technologie', label: 'Technologie & Sciences' },
  { key: 'culture', label: 'Culture & Société' },
  { key: 'calendriers', label: 'Calendriers & Ères' },
  { key: 'transport', label: 'Transport & Voyage' }
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
