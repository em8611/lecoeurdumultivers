import React, { useState } from 'react';
import { Navigation } from './components/Navigation.jsx';
import { Home } from './home';
import { ElementsManager } from './elements';
import { RelationsManager } from './relations';
import { EquipesManager } from './equipes';
import { PouvoirsManager } from './pouvoirs';
import { DictionnaireManager } from './dictionnaire';
import { ConceptsManager } from './concepts';
import { ChronologieManager } from './chronologie';
import { GeographieManager } from './geographie';
import { ElementsProvider } from './state/elementsStore.jsx';

// Mapping module slug -> tab key (on ajoutera une entrée par module reconstruit)
const MODULE_MAP = {
  home: 'home',
  elements: 'elements',
  relations: 'relations',
  equipes: 'equipes',
  pouvoirs: 'pouvoirs',
  dictionnaire: 'dictionnaire',
  concepts: 'concepts',
  chronologie: 'chronologie',
  geographie: 'geographie'
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'elements':
        return <ElementsManager />;
      case 'relations':
        return <RelationsManager />;
      case 'equipes':
        return <EquipesManager />;
      case 'pouvoirs':
        return <PouvoirsManager />;
      case 'dictionnaire':
        return <DictionnaireManager />;
      case 'concepts':
        return <ConceptsManager />;
      case 'chronologie':
        return <ChronologieManager />;
      case 'geographie':
        return <GeographieManager />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <ElementsProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main style={{ flexGrow: 1, backgroundColor: 'white', overflowY: 'auto' }}>
          {renderActiveComponent()}
        </main>
      </div>
    </ElementsProvider>
  );
}

export default App;
