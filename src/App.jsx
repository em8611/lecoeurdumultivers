import React, { useState } from 'react';
import { Navigation } from './components/Navigation.jsx';
import { Home } from './home';
import { ElementsManager } from './elements';
import { ElementsProvider } from './state/elementsStore.jsx';

// Mapping module slug -> tab key (on ajoutera une entrée par module reconstruit)
const MODULE_MAP = {
  home: 'home',
  elements: 'elements'
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'elements':
        return <ElementsManager />;
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
