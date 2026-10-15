import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import CarteForm from './components/CarteForm.jsx';
import CarteList from './components/CarteList.jsx';
import CarteViewer from './components/CarteViewer.jsx';
import TerritoireForm from './components/TerritoireForm.jsx';
import TerritoireTree from './components/TerritoireTree.jsx';
import TerritoireDetails from './components/TerritoireDetails.jsx';

const territoireTypeOptions = ['Continent', 'Royaume/Nation', 'Région', 'Province', 'Ville', 'Site', 'Autre'];

export default function GeographieManager() {
  const { cartes, territoires, locations } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [subTab, setSubTab] = useState('cartes'); // 'cartes' ou 'territoires'
  const [notification, setNotification] = useState(null);

  // --- Cartes ---
  const [selectedCarte, setSelectedCarte] = useState(null);
  const [showCarteForm, setShowCarteForm] = useState(false);
  const [isEditingCarte, setIsEditingCarte] = useState(false);
  const initialCarteForm = {
    name: '',
    description: '',
    image: '',
    territoireId: '',
    points: [],
    tags: []
  };
  const [carteFormData, setCarteFormData] = useState(initialCarteForm);

  const handleEditCarte = (carte) => {
    setCarteFormData({ ...carte, territoireId: carte.territoireId || '' });
    setIsEditingCarte(true);
    setShowCarteForm(true);
    setSelectedCarte(null);
  };

  const handleSubmitCarte = (e) => {
    e.preventDefault();
    if (isEditingCarte) {
      updateElement('carte', carteFormData.id, { ...carteFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${carteFormData.name}" mise à jour` });
    } else {
      const newCarte = { id: Date.now(), ...carteFormData, createdAt: new Date().toISOString() };
      addElement('carte', newCarte);
      setNotification({ type: 'success', message: `"${carteFormData.name}" créée` });
    }
    setCarteFormData(initialCarteForm);
    setShowCarteForm(false);
    setIsEditingCarte(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteCarte = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) return;
    const carteToDelete = cartes.find(c => c.id === id);
    deleteElement('carte', id);
    if (selectedCarte?.id === id) setSelectedCarte(null);
    setNotification({ type: 'info', message: `"${carteToDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateCartePoints = (carteId, points) => {
    updateElement('carte', carteId, { points });
    if (selectedCarte?.id === carteId) {
      setSelectedCarte({ ...selectedCarte, points });
    }
  };

  // --- Territoires ---
  const [selectedTerritoire, setSelectedTerritoire] = useState(null);
  const [showTerritoireForm, setShowTerritoireForm] = useState(false);
  const [isEditingTerritoire, setIsEditingTerritoire] = useState(false);
  const initialTerritoireForm = {
    name: '',
    type: 'Région',
    parentId: '',
    description: '',
    climate: '',
    population: '',
    tags: [],
    images: []
  };
  const [territoireFormData, setTerritoireFormData] = useState(initialTerritoireForm);

  const handleEditTerritoire = (territoire) => {
    setTerritoireFormData({ ...territoire, parentId: territoire.parentId || '' });
    setIsEditingTerritoire(true);
    setShowTerritoireForm(true);
    setSelectedTerritoire(null);
  };

  const handleSubmitTerritoire = (e) => {
    e.preventDefault();
    if (isEditingTerritoire) {
      updateElement('territoire', territoireFormData.id, { ...territoireFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${territoireFormData.name}" mis à jour` });
    } else {
      const newTerritoire = { id: Date.now(), ...territoireFormData, createdAt: new Date().toISOString() };
      addElement('territoire', newTerritoire);
      setNotification({ type: 'success', message: `"${territoireFormData.name}" créé` });
    }
    setTerritoireFormData(initialTerritoireForm);
    setShowTerritoireForm(false);
    setIsEditingTerritoire(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteTerritoire = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce territoire ? Ses sous-territoires deviendront orphelins.')) return;
    const territoireToDelete = territoires.find(t => t.id === id);
    deleteElement('territoire', id);
    territoires.filter(t => t.parentId === id).forEach(child => {
      updateElement('territoire', child.id, { parentId: '' });
    });
    if (selectedTerritoire?.id === id) setSelectedTerritoire(null);
    setNotification({ type: 'info', message: `"${territoireToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getLocationById = (id) => locations.find(l => l.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);

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
        <h2 style={{ margin: 0 }}>🗺️ Cartes & Géographie</h2>
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
          onClick={() => setSubTab('cartes')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'cartes' ? '2px solid #2196f3' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'cartes' ? '#2196f3' : '#666',
            fontWeight: subTab === 'cartes' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🗺️ Cartes ({cartes.length})
        </button>
        <button
          onClick={() => setSubTab('territoires')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'territoires' ? '2px solid #2196f3' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'territoires' ? '#2196f3' : '#666',
            fontWeight: subTab === 'territoires' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🏔️ Territoires ({territoires.length})
        </button>
      </div>

      {subTab === 'cartes' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => {
                if (showCarteForm) {
                  setShowCarteForm(false);
                  setIsEditingCarte(false);
                  setCarteFormData(initialCarteForm);
                } else {
                  setShowCarteForm(true);
                  setIsEditingCarte(false);
                }
              }}
              style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            >
              {showCarteForm ? '✕ Annuler' : '+ Nouvelle Carte'}
            </button>
            <button
              onClick={() => exportElementsToFile(cartes, 'cartes_export.json')}
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
                onChange={e => {
                  importElementsFromFiles(e.target.files, ({ success, data, fileName }) => {
                    if (!success || !data) {
                      setNotification({ type: 'error', message: `Erreur import ${fileName}` });
                      setTimeout(() => setNotification(null), 4000);
                      return;
                    }
                    const items = Array.isArray(data) ? data : [data];
                    let updated = cartes;
                    items.forEach(item => {
                      if (!item || typeof item !== 'object') return;
                      if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                      updated = mergeElementInList(updated, item);
                    });
                    updated.forEach(item => {
                      const exists = cartes.some(c => c.id === item.id);
                      if (exists) updateElement('carte', item.id, item);
                      else addElement('carte', item);
                    });
                    setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                    setTimeout(() => setNotification(null), 4000);
                  });
                }}
              />
            </label>
          </div>

          {showCarteForm && (
            <CarteForm
              formData={carteFormData}
              setFormData={setCarteFormData}
              onSubmit={handleSubmitCarte}
              onCancel={() => { setShowCarteForm(false); setIsEditingCarte(false); setCarteFormData(initialCarteForm); }}
              territoires={territoires}
              isEditing={isEditingCarte}
            />
          )}

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <CarteList
                cartes={cartes}
                selectedCarte={selectedCarte}
                onSelect={setSelectedCarte}
                onDelete={handleDeleteCarte}
                onEdit={handleEditCarte}
                getTerritoireById={getTerritoireById}
              />
            </div>
            {selectedCarte && (
              <div style={{ flex: 2 }}>
                <CarteViewer
                  carte={selectedCarte}
                  onUpdatePoints={(points) => handleUpdateCartePoints(selectedCarte.id, points)}
                  locations={locations}
                  territoires={territoires}
                  getLocationById={getLocationById}
                  getTerritoireById={getTerritoireById}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {subTab === 'territoires' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => {
                if (showTerritoireForm) {
                  setShowTerritoireForm(false);
                  setIsEditingTerritoire(false);
                  setTerritoireFormData(initialTerritoireForm);
                } else {
                  setShowTerritoireForm(true);
                  setIsEditingTerritoire(false);
                }
              }}
              style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            >
              {showTerritoireForm ? '✕ Annuler' : '+ Nouveau Territoire'}
            </button>
            <button
              onClick={() => exportElementsToFile(territoires, 'territoires_export.json')}
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
                onChange={e => {
                  importElementsFromFiles(e.target.files, ({ success, data, fileName }) => {
                    if (!success || !data) {
                      setNotification({ type: 'error', message: `Erreur import ${fileName}` });
                      setTimeout(() => setNotification(null), 4000);
                      return;
                    }
                    const items = Array.isArray(data) ? data : [data];
                    let updated = territoires;
                    items.forEach(item => {
                      if (!item || typeof item !== 'object') return;
                      if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                      updated = mergeElementInList(updated, item);
                    });
                    updated.forEach(item => {
                      const exists = territoires.some(t => t.id === item.id);
                      if (exists) updateElement('territoire', item.id, item);
                      else addElement('territoire', item);
                    });
                    setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                    setTimeout(() => setNotification(null), 4000);
                  });
                }}
              />
            </label>
          </div>

          {showTerritoireForm && (
            <TerritoireForm
              formData={territoireFormData}
              setFormData={setTerritoireFormData}
              onSubmit={handleSubmitTerritoire}
              onCancel={() => { setShowTerritoireForm(false); setIsEditingTerritoire(false); setTerritoireFormData(initialTerritoireForm); }}
              typeOptions={territoireTypeOptions}
              territoires={territoires}
              isEditing={isEditingTerritoire}
            />
          )}

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <h3>Hiérarchie des territoires ({territoires.length})</h3>
              <TerritoireTree
                territoires={territoires}
                selectedTerritoire={selectedTerritoire}
                onSelect={setSelectedTerritoire}
                onDelete={handleDeleteTerritoire}
                onEdit={handleEditTerritoire}
              />
            </div>
            {selectedTerritoire && (
              <TerritoireDetails
                selectedTerritoire={selectedTerritoire}
                territoires={territoires}
                cartes={cartes}
                onSelectTerritoire={setSelectedTerritoire}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
