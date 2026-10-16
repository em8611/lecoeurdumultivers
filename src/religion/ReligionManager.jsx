import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import DiviniteForm from './components/DiviniteForm.jsx';
import DiviniteList from './components/DiviniteList.jsx';
import DiviniteDetails from './components/DiviniteDetails.jsx';
import MytheForm from './components/MytheForm.jsx';
import MytheList from './components/MytheList.jsx';
import MytheDetails from './components/MytheDetails.jsx';

const diviniteStatusOptions = ['Vénéré', 'Oublié', 'Déchu', 'Scellé', 'Disparu'];
const diviniteAlignmentOptions = ['Bienveillant', 'Malveillant', 'Neutre', 'Ambigu'];
const mytheCategoryOptions = ['Mythe fondateur', 'Légende', 'Prophétie', 'Conte', 'Malédiction', 'Rituel', 'Autre'];
const mytheTruthOptions = ['Vérifié', 'Contesté', 'Réfuté', 'Inconnu'];

export default function ReligionManager() {
  const { divinites, mythes, characters, concepts, evenements } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [subTab, setSubTab] = useState('divinites'); // 'divinites' ou 'mythes'
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Divinités ---
  const [selectedDivinite, setSelectedDivinite] = useState(null);
  const [showDiviniteForm, setShowDiviniteForm] = useState(false);
  const [isEditingDivinite, setIsEditingDivinite] = useState(false);
  const initialDiviniteForm = {
    name: '',
    pantheon: '',
    alignment: 'Neutre',
    status: 'Vénéré',
    domains: [],
    description: '',
    origin: '',
    symbols: [],
    followers: '',
    avatarCharacterIds: [],
    conceptIds: [],
    tags: [],
    images: []
  };
  const [diviniteFormData, setDiviniteFormData] = useState(initialDiviniteForm);

  const handleEditDivinite = (divinite) => {
    setDiviniteFormData({ ...divinite });
    setIsEditingDivinite(true);
    setShowDiviniteForm(true);
    setSelectedDivinite(null);
  };

  const handleSubmitDivinite = (e) => {
    e.preventDefault();
    if (isEditingDivinite) {
      updateElement('divinite', diviniteFormData.id, { ...diviniteFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${diviniteFormData.name}" mis(e) à jour` });
    } else {
      const newDivinite = { id: Date.now(), ...diviniteFormData, createdAt: new Date().toISOString() };
      addElement('divinite', newDivinite);
      setNotification({ type: 'success', message: `"${diviniteFormData.name}" créé(e)` });
    }
    setDiviniteFormData(initialDiviniteForm);
    setShowDiviniteForm(false);
    setIsEditingDivinite(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteDivinite = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette divinité ?')) return;
    const toDelete = divinites.find(d => d.id === id);
    deleteElement('divinite', id);
    if (selectedDivinite?.id === id) setSelectedDivinite(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimé(e)` });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Mythes & Légendes ---
  const [selectedMythe, setSelectedMythe] = useState(null);
  const [showMytheForm, setShowMytheForm] = useState(false);
  const [isEditingMythe, setIsEditingMythe] = useState(false);
  const initialMytheForm = {
    name: '',
    category: 'Légende',
    truthStatus: 'Inconnu',
    description: '',
    origin: '',
    signification: '',
    deityIds: [],
    characterIds: [],
    eventIds: [],
    tags: [],
    images: []
  };
  const [mytheFormData, setMytheFormData] = useState(initialMytheForm);

  const handleEditMythe = (mythe) => {
    setMytheFormData({ ...mythe });
    setIsEditingMythe(true);
    setShowMytheForm(true);
    setSelectedMythe(null);
  };

  const handleSubmitMythe = (e) => {
    e.preventDefault();
    if (isEditingMythe) {
      updateElement('mythe', mytheFormData.id, { ...mytheFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${mytheFormData.name}" mis à jour` });
    } else {
      const newMythe = { id: Date.now(), ...mytheFormData, createdAt: new Date().toISOString() };
      addElement('mythe', newMythe);
      setNotification({ type: 'success', message: `"${mytheFormData.name}" créé` });
    }
    setMytheFormData(initialMytheForm);
    setShowMytheForm(false);
    setIsEditingMythe(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteMythe = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce mythe ?')) return;
    const toDelete = mythes.find(m => m.id === id);
    deleteElement('mythe', id);
    if (selectedMythe?.id === id) setSelectedMythe(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const switchTab = (tab) => {
    setSubTab(tab);
    setSearchTerm('');
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const getConceptById = (id) => concepts.find(c => c.id === id);
  const getEvenementById = (id) => evenements.find(ev => ev.id === id);
  const getDiviniteById = (id) => divinites.find(d => d.id === id);

  const filteredDivinites = divinites.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.pantheon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filteredMythes = mythes.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const handleExport = () => {
    if (subTab === 'divinites') exportElementsToFile(divinites, 'divinites_export.json');
    else exportElementsToFile(mythes, 'mythes_export.json');
  };

  const handleImportFiles = (files) => {
    const category = subTab === 'divinites' ? 'divinite' : 'mythe';
    const currentList = subTab === 'divinites' ? divinites : mythes;
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
          padding: '10px 16px', borderRadius: 'var(--rayon-bouton)', color: 'white',
          backgroundColor: notification.type === 'success' ? '#2e7d4f' : notification.type === 'info' ? 'var(--coeur)' : '#a13d3d',
          boxShadow: 'var(--ombre-survol)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Religion & Mythologie</h2>
        <button
          onClick={gotoFiches}
          style={{ padding: '8px 12px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          title="Ouvrir le viewer des fiches techniques"
        >
          Fiches
        </button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid var(--trait)' }}>
        <button
          onClick={() => switchTab('divinites')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'divinites' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'divinites' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'divinites' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Divinités & Panthéons ({divinites.length})
        </button>
        <button
          onClick={() => switchTab('mythes')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'mythes' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'mythes' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'mythes' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Mythes & Légendes ({mythes.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder={subTab === 'divinites' ? 'Rechercher une divinité, un panthéon...' : 'Rechercher un mythe, une légende...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              if (subTab === 'divinites') {
                if (showDiviniteForm) {
                  setShowDiviniteForm(false);
                  setIsEditingDivinite(false);
                  setDiviniteFormData(initialDiviniteForm);
                } else {
                  setShowDiviniteForm(true);
                  setIsEditingDivinite(false);
                }
              } else {
                if (showMytheForm) {
                  setShowMytheForm(false);
                  setIsEditingMythe(false);
                  setMytheFormData(initialMytheForm);
                } else {
                  setShowMytheForm(true);
                  setIsEditingMythe(false);
                }
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {(subTab === 'divinites' ? showDiviniteForm : showMytheForm)
              ? 'Annuler'
              : subTab === 'divinites' ? '+ Nouvelle Divinité' : '+ Nouveau Mythe'}
          </button>
          <button
            onClick={handleExport}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }}>
            Importer
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

      {subTab === 'divinites' && showDiviniteForm && (
        <DiviniteForm
          formData={diviniteFormData}
          setFormData={setDiviniteFormData}
          onSubmit={handleSubmitDivinite}
          onCancel={() => { setShowDiviniteForm(false); setIsEditingDivinite(false); setDiviniteFormData(initialDiviniteForm); }}
          statusOptions={diviniteStatusOptions}
          alignmentOptions={diviniteAlignmentOptions}
          characters={characters}
          concepts={concepts}
          isEditing={isEditingDivinite}
        />
      )}

      {subTab === 'mythes' && showMytheForm && (
        <MytheForm
          formData={mytheFormData}
          setFormData={setMytheFormData}
          onSubmit={handleSubmitMythe}
          onCancel={() => { setShowMytheForm(false); setIsEditingMythe(false); setMytheFormData(initialMytheForm); }}
          categoryOptions={mytheCategoryOptions}
          truthOptions={mytheTruthOptions}
          divinites={divinites}
          characters={characters}
          evenements={evenements}
          isEditing={isEditingMythe}
        />
      )}

      {subTab === 'divinites' ? (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--encre)' }}>Divinités & Panthéons ({filteredDivinites.length}/{divinites.length})</h3>
            <DiviniteList
              divinites={filteredDivinites}
              selectedDivinite={selectedDivinite}
              onSelect={setSelectedDivinite}
              onDelete={handleDeleteDivinite}
              onEdit={handleEditDivinite}
            />
          </div>
          {selectedDivinite && (
            <DiviniteDetails
              selectedDivinite={selectedDivinite}
              getCharacterById={getCharacterById}
              getConceptById={getConceptById}
            />
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--encre)' }}>Mythes & Légendes ({filteredMythes.length}/{mythes.length})</h3>
            <MytheList
              mythes={filteredMythes}
              selectedMythe={selectedMythe}
              onSelect={setSelectedMythe}
              onDelete={handleDeleteMythe}
              onEdit={handleEditMythe}
            />
          </div>
          {selectedMythe && (
            <MytheDetails
              selectedMythe={selectedMythe}
              getDiviniteById={getDiviniteById}
              getCharacterById={getCharacterById}
              getEvenementById={getEvenementById}
            />
          )}
        </div>
      )}
    </div>
  );
}
