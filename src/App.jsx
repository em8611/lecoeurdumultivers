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
import { DiplomatieManager } from './diplomatie';
import { MagieManager } from './magie';
import { UniversManager } from './univers';
import { ReligionManager } from './religion';
import { QuetesManager } from './quetes';
import { LanguesManager } from './langues';
import { ArtefactsManager } from './artefacts';
import { EconomieManager } from './economie';
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
  geographie: 'geographie',
  diplomatie: 'diplomatie',
  magie: 'magie',
  univers: 'univers',
  religion: 'religion',
  quetes: 'quetes',
  langues: 'langues',
  artefacts: 'artefacts',
  economie: 'economie'
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
      case 'diplomatie':
        return <DiplomatieManager />;
      case 'magie':
        return <MagieManager />;
      case 'univers':
        return <UniversManager />;
      case 'religion':
        return <ReligionManager />;
      case 'quetes':
        return <QuetesManager />;
      case 'langues':
        return <LanguesManager />;
      case 'artefacts':
        return <ArtefactsManager />;
      case 'economie':
        return <EconomieManager />;
      case 'home':
      default:
        return <Home onNavigate={setActiveTab} />;
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
