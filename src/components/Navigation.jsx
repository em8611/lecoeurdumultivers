import React, { useEffect, useRef, useState } from 'react';

const HOME_TAB = { key: 'home', label: 'Accueil', icon: '🏠' };
const GALERIE_TAB = { key: 'galerie', label: 'Galerie', icon: '🖼️' };

const GROUPS = [
  {
    key: 'personnages',
    label: 'Personnages & Sociétés',
    icon: '👥',
    tabs: [
      { key: 'elements', label: 'Éléments' },
      { key: 'relations', label: 'Relations' },
      { key: 'equipes', label: 'Équipes' },
      { key: 'pouvoirs', label: 'Pouvoirs & Compétences' },
      { key: 'culture', label: 'Culture & Société' }
    ]
  },
  {
    key: 'monde',
    label: 'Monde & Politique',
    icon: '🌍',
    tabs: [
      { key: 'geographie', label: 'Cartes & Géographie' },
      { key: 'univers', label: 'Univers / Multivers' },
      { key: 'diplomatie', label: 'Factions & Diplomatie' },
      { key: 'economie', label: 'Économie & Commerce' },
      { key: 'transport', label: 'Transport & Voyage' }
    ]
  },
  {
    key: 'savoirs',
    label: 'Savoirs & Systèmes',
    icon: '📚',
    tabs: [
      { key: 'dictionnaire', label: 'Dictionnaire' },
      { key: 'concepts', label: 'Concepts' },
      { key: 'langues', label: 'Langues & Écritures' },
      { key: 'technologie', label: 'Technologie & Sciences' },
      { key: 'magie', label: 'Magie & Combat' }
    ]
  },
  {
    key: 'recits',
    label: 'Récits & Temps',
    icon: '📖',
    tabs: [
      { key: 'chronologie', label: 'Chronologie' },
      { key: 'quetes', label: 'Quêtes & Intrigues' },
      { key: 'religion', label: 'Religion & Mythologie' },
      { key: 'artefacts', label: 'Artefacts & Reliques' },
      { key: 'calendriers', label: 'Calendriers & Ères' }
    ]
  }
];

export function Navigation({ activeTab, setActiveTab }) {
  const [openGroup, setOpenGroup] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTab = (key) => {
    setActiveTab(key);
    setOpenGroup(null);
  };

  const isGroupActive = (group) => group.tabs.some(tab => tab.key === activeTab);

  return (
    <nav className="main-nav" ref={navRef}>
      <button
        className={activeTab === HOME_TAB.key ? 'active' : ''}
        onClick={() => selectTab(HOME_TAB.key)}
      >
        {HOME_TAB.icon} {HOME_TAB.label}
      </button>

      {GROUPS.map(group => (
        <div key={group.key} className="nav-group">
          <button
            className={isGroupActive(group) || openGroup === group.key ? 'active' : ''}
            onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
          >
            {group.icon} {group.label} {openGroup === group.key ? '▲' : '▼'}
          </button>
          {openGroup === group.key && (
            <div className="nav-dropdown">
              {group.tabs.map(tab => (
                <button
                  key={tab.key}
                  className={tab.key === activeTab ? 'active' : ''}
                  onClick={() => selectTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        className={activeTab === GALERIE_TAB.key ? 'active' : ''}
        onClick={() => selectTab(GALERIE_TAB.key)}
      >
        {GALERIE_TAB.icon} {GALERIE_TAB.label}
      </button>
    </nav>
  );
}
