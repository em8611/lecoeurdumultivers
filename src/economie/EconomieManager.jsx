import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import RessourceForm from './components/RessourceForm.jsx';
import RessourceList from './components/RessourceList.jsx';
import RessourceDetails from './components/RessourceDetails.jsx';
import RouteForm from './components/RouteForm.jsx';
import RouteList from './components/RouteList.jsx';
import RouteDetails from './components/RouteDetails.jsx';

const ressourceCategoryOptions = ['Monnaie', 'Matière première', 'Denrée de luxe', 'Ressource magique', 'Autre'];
const ressourceRarityOptions = ['Commune', 'Peu commune', 'Rare', 'Très rare', 'Inestimable'];
const routeStatusOptions = ['Active', 'Dangereuse', 'Coupée', 'Saisonnière', 'Secrète'];

const ressourceCategoryIcons = {
  'Monnaie': '🪙', 'Matière première': '⛏️', 'Denrée de luxe': '🍷',
  'Ressource magique': '🔮', 'Autre': '📦'
};
const routeStatusIcons = {
  'Active': '🟢', 'Dangereuse': '⚠️', 'Coupée': '🚫', 'Saisonnière': '🍂', 'Secrète': '🤫'
};

function getRessourceCategoryIcon(category) { return ressourceCategoryIcons[category] || '📦'; }
function getRouteStatusIcon(status) { return routeStatusIcons[status] || '❓'; }

export default function EconomieManager() {
  const { ressources, routesCommerciales, territoires, equipes } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [subTab, setSubTab] = useState('ressources'); // 'ressources' ou 'routes'
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Ressources & Monnaies ---
  const [selectedRessource, setSelectedRessource] = useState(null);
  const [showRessourceForm, setShowRessourceForm] = useState(false);
  const [isEditingRessource, setIsEditingRessource] = useState(false);
  const initialRessourceForm = {
    name: '',
    category: 'Monnaie',
    rarity: 'Commune',
    value: '',
    description: '',
    territoireIds: [],
    tags: [],
    images: []
  };
  const [ressourceFormData, setRessourceFormData] = useState(initialRessourceForm);

  const handleEditRessource = (ressource) => {
    setRessourceFormData({ ...ressource });
    setIsEditingRessource(true);
    setShowRessourceForm(true);
    setSelectedRessource(null);
  };

  const handleSubmitRessource = (e) => {
    e.preventDefault();
    if (isEditingRessource) {
      updateElement('ressource', ressourceFormData.id, { ...ressourceFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${ressourceFormData.name}" mise à jour` });
    } else {
      const newRessource = { id: Date.now(), ...ressourceFormData, createdAt: new Date().toISOString() };
      addElement('ressource', newRessource);
      setNotification({ type: 'success', message: `"${ressourceFormData.name}" créée` });
    }
    setRessourceFormData(initialRessourceForm);
    setShowRessourceForm(false);
    setIsEditingRessource(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteRessource = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) return;
    const toDelete = ressources.find(r => r.id === id);
    deleteElement('ressource', id);
    if (selectedRessource?.id === id) setSelectedRessource(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Routes Commerciales ---
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [isEditingRoute, setIsEditingRoute] = useState(false);
  const initialRouteForm = {
    name: '',
    status: 'Active',
    fromTerritoireId: '',
    toTerritoireId: '',
    description: '',
    dangers: '',
    ressourceIds: [],
    equipeIds: [],
    tags: [],
    images: []
  };
  const [routeFormData, setRouteFormData] = useState(initialRouteForm);

  const handleEditRoute = (route) => {
    setRouteFormData({ ...route });
    setIsEditingRoute(true);
    setShowRouteForm(true);
    setSelectedRoute(null);
  };

  const handleSubmitRoute = (e) => {
    e.preventDefault();
    if (isEditingRoute) {
      updateElement('route', routeFormData.id, { ...routeFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${routeFormData.name}" mise à jour` });
    } else {
      const newRoute = { id: Date.now(), ...routeFormData, createdAt: new Date().toISOString() };
      addElement('route', newRoute);
      setNotification({ type: 'success', message: `"${routeFormData.name}" créée` });
    }
    setRouteFormData(initialRouteForm);
    setShowRouteForm(false);
    setIsEditingRoute(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteRoute = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette route commerciale ?')) return;
    const toDelete = routesCommerciales.find(r => r.id === id);
    deleteElement('route', id);
    if (selectedRoute?.id === id) setSelectedRoute(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const switchTab = (tab) => {
    setSubTab(tab);
    setSearchTerm('');
  };

  const getTerritoireById = (id) => territoires.find(t => t.id === id);
  const getRessourceById = (id) => ressources.find(r => r.id === id);
  const getEquipeById = (id) => equipes.find(e => e.id === id);

  const filteredRessources = ressources.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filteredRoutes = routesCommerciales.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const handleExport = () => {
    if (subTab === 'ressources') exportElementsToFile(ressources, 'ressources_export.json');
    else exportElementsToFile(routesCommerciales, 'routes_commerciales_export.json');
  };

  const handleImportFiles = (files) => {
    const category = subTab === 'ressources' ? 'ressource' : 'route';
    const currentList = subTab === 'ressources' ? ressources : routesCommerciales;
    importElementsFromFiles(files, ({ success, data, fileName }) => {
      if (!success || !data) {
        setNotification({ type: 'error', message: `Erreur import ${fileName}` });
        setTimeout(() => setNotification(null), 4000);
        return;
      }
      const items = Array.isArray(data) ? data : [data];
      let updated = currentList;
      items.forEach(item => {
        if (!item || typeof item !== 'object') return;
        if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
        updated = mergeElementInList(updated, item);
      });
      updated.forEach(item => {
        const exists = currentList.some(i => i.id === item.id);
        if (exists) updateElement(category, item.id, item);
        else addElement(category, item);
      });
      setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
      setTimeout(() => setNotification(null), 4000);
    });
  };

  return (
    <div style={{ padding: 16 }}>
      {notification && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1000,
          padding: '10px 16px', borderRadius: 6, color: 'white',
          backgroundColor: notification.type === 'success' ? '#28a745' : notification.type === 'info' ? '#17a2b8' : '#dc3545',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>💰 Économie & Commerce</h2>
        <button
          onClick={gotoFiches}
          style={{ padding: '8px 12px', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          title="Ouvrir le viewer des fiches techniques"
        >
          📄 Fiches
        </button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid #dee2e6' }}>
        <button
          onClick={() => switchTab('ressources')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'ressources' ? '2px solid #2196f3' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'ressources' ? '#2196f3' : '#666',
            fontWeight: subTab === 'ressources' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🪙 Ressources & Monnaies ({ressources.length})
        </button>
        <button
          onClick={() => switchTab('routes')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'routes' ? '2px solid #2196f3' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'routes' ? '#2196f3' : '#666',
            fontWeight: subTab === 'routes' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🛤️ Routes Commerciales ({routesCommerciales.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder={subTab === 'ressources' ? '🔍 Rechercher une ressource, une monnaie...' : '🔍 Rechercher une route commerciale...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              if (subTab === 'ressources') {
                if (showRessourceForm) {
                  setShowRessourceForm(false);
                  setIsEditingRessource(false);
                  setRessourceFormData(initialRessourceForm);
                } else {
                  setShowRessourceForm(true);
                  setIsEditingRessource(false);
                }
              } else {
                if (showRouteForm) {
                  setShowRouteForm(false);
                  setIsEditingRoute(false);
                  setRouteFormData(initialRouteForm);
                } else {
                  setShowRouteForm(true);
                  setIsEditingRoute(false);
                }
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          >
            {(subTab === 'ressources' ? showRessourceForm : showRouteForm)
              ? '✕ Annuler'
              : subTab === 'ressources' ? '+ Nouvelle Ressource' : '+ Nouvelle Route'}
          </button>
          <button
            onClick={handleExport}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }}>
            ⬆️ Importer
            <input
              type="file"
              accept=".json"
              multiple
              style={{ display: 'none' }}
              onChange={e => handleImportFiles(e.target.files)}
            />
          </label>
        </div>
      </div>

      {subTab === 'ressources' && showRessourceForm && (
        <RessourceForm
          formData={ressourceFormData}
          setFormData={setRessourceFormData}
          onSubmit={handleSubmitRessource}
          onCancel={() => { setShowRessourceForm(false); setIsEditingRessource(false); setRessourceFormData(initialRessourceForm); }}
          categoryOptions={ressourceCategoryOptions}
          rarityOptions={ressourceRarityOptions}
          territoires={territoires}
          isEditing={isEditingRessource}
        />
      )}

      {subTab === 'routes' && showRouteForm && (
        <RouteForm
          formData={routeFormData}
          setFormData={setRouteFormData}
          onSubmit={handleSubmitRoute}
          onCancel={() => { setShowRouteForm(false); setIsEditingRoute(false); setRouteFormData(initialRouteForm); }}
          statusOptions={routeStatusOptions}
          territoires={territoires}
          ressources={ressources}
          equipes={equipes}
          isEditing={isEditingRoute}
        />
      )}

      {subTab === 'ressources' ? (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>Ressources & Monnaies ({filteredRessources.length}/{ressources.length})</h3>
            <RessourceList
              ressources={filteredRessources}
              selectedRessource={selectedRessource}
              onSelect={setSelectedRessource}
              onDelete={handleDeleteRessource}
              onEdit={handleEditRessource}
              getCategoryIcon={getRessourceCategoryIcon}
            />
          </div>
          {selectedRessource && (
            <RessourceDetails
              selectedRessource={selectedRessource}
              getCategoryIcon={getRessourceCategoryIcon}
              getTerritoireById={getTerritoireById}
            />
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>Routes Commerciales ({filteredRoutes.length}/{routesCommerciales.length})</h3>
            <RouteList
              routes={filteredRoutes}
              selectedRoute={selectedRoute}
              onSelect={setSelectedRoute}
              onDelete={handleDeleteRoute}
              onEdit={handleEditRoute}
              getStatusIcon={getRouteStatusIcon}
              getTerritoireById={getTerritoireById}
            />
          </div>
          {selectedRoute && (
            <RouteDetails
              selectedRoute={selectedRoute}
              getStatusIcon={getRouteStatusIcon}
              getTerritoireById={getTerritoireById}
              getRessourceById={getRessourceById}
              getEquipeById={getEquipeById}
            />
          )}
        </div>
      )}
    </div>
  );
}
