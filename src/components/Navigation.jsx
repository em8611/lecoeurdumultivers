import React from 'react';

const TABS = [
  { key: 'home', label: 'Accueil' },
  { key: 'elements', label: 'Éléments' }
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
