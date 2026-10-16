import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import CalendrierForm from './components/CalendrierForm.jsx';
import CalendrierList from './components/CalendrierList.jsx';
import CalendrierDetails from './components/CalendrierDetails.jsx';
import EreForm from './components/EreForm.jsx';
import EreList from './components/EreList.jsx';
import EreDetails from './components/EreDetails.jsx';

const ereStatusOptions = ['En cours', 'Terminée', 'Légendaire / Mythique', 'Contestée'];

export default function CalendriersManager() {
  const { calendriers, eres, universMultivers, evenements } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [subTab, setSubTab] = useState('calendriers'); // 'calendriers' ou 'eres'
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Calendriers ---
  const [selectedCalendrier, setSelectedCalendrier] = useState(null);
  const [showCalendrierForm, setShowCalendrierForm] = useState(false);
  const [isEditingCalendrier, setIsEditingCalendrier] = useState(false);
  const initialCalendrierForm = {
    name: '',
    universId: '',
    description: '',
    units: [],
    epoch: '',
    notes: '',
    tags: [],
    images: []
  };
  const [calendrierFormData, setCalendrierFormData] = useState(initialCalendrierForm);

  const handleEditCalendrier = (calendrier) => {
    setCalendrierFormData({ ...calendrier });
    setIsEditingCalendrier(true);
    setShowCalendrierForm(true);
    setSelectedCalendrier(null);
  };

  const handleSubmitCalendrier = (e) => {
    e.preventDefault();
    if (isEditingCalendrier) {
      updateElement('calendrier', calendrierFormData.id, { ...calendrierFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${calendrierFormData.name}" mis à jour` });
    } else {
      const newCalendrier = { id: Date.now(), ...calendrierFormData, createdAt: new Date().toISOString() };
      addElement('calendrier', newCalendrier);
      setNotification({ type: 'success', message: `"${calendrierFormData.name}" créé` });
    }
    setCalendrierFormData(initialCalendrierForm);
    setShowCalendrierForm(false);
    setIsEditingCalendrier(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteCalendrier = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce calendrier ?')) return;
    const toDelete = calendriers.find(c => c.id === id);
    deleteElement('calendrier', id);
    if (selectedCalendrier?.id === id) setSelectedCalendrier(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Ères ---
  const [selectedEre, setSelectedEre] = useState(null);
  const [showEreForm, setShowEreForm] = useState(false);
  const [isEditingEre, setIsEditingEre] = useState(false);
  const initialEreForm = {
    name: '',
    status: 'En cours',
    calendrierId: '',
    startDate: '',
    endDate: '',
    description: '',
    majorEventIds: [],
    tags: [],
    images: []
  };
  const [ereFormData, setEreFormData] = useState(initialEreForm);

  const handleEditEre = (ere) => {
    setEreFormData({ ...ere });
    setIsEditingEre(true);
    setShowEreForm(true);
    setSelectedEre(null);
  };

  const handleSubmitEre = (e) => {
    e.preventDefault();
    if (isEditingEre) {
      updateElement('ere', ereFormData.id, { ...ereFormData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${ereFormData.name}" mise à jour` });
    } else {
      const newEre = { id: Date.now(), ...ereFormData, createdAt: new Date().toISOString() };
      addElement('ere', newEre);
      setNotification({ type: 'success', message: `"${ereFormData.name}" créée` });
    }
    setEreFormData(initialEreForm);
    setShowEreForm(false);
    setIsEditingEre(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteEre = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette ère ?')) return;
    const toDelete = eres.find(e => e.id === id);
    deleteElement('ere', id);
    if (selectedEre?.id === id) setSelectedEre(null);
    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const switchTab = (tab) => {
    setSubTab(tab);
    setSearchTerm('');
  };

  const getUniversById = (id) => universMultivers.find(u => u.id === id);
  const getCalendrierById = (id) => calendriers.find(c => c.id === id);
  const getEvenementById = (id) => evenements.find(ev => ev.id === id);

  const filteredCalendriers = calendriers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filteredEres = eres.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const handleExport = () => {
    if (subTab === 'calendriers') exportElementsToFile(calendriers, 'calendriers_export.json');
    else exportElementsToFile(eres, 'eres_export.json');
  };

  const handleImportFiles = (files) => {
    const category = subTab === 'calendriers' ? 'calendrier' : 'ere';
    const currentList = subTab === 'calendriers' ? calendriers : eres;
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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Calendriers & Ères</h2>
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
          onClick={() => switchTab('calendriers')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'calendriers' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'calendriers' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'calendriers' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Calendriers ({calendriers.length})
        </button>
        <button
          onClick={() => switchTab('eres')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'eres' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'eres' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'eres' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Ères ({eres.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder={subTab === 'calendriers' ? 'Rechercher un calendrier...' : 'Rechercher une ère...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              if (subTab === 'calendriers') {
                if (showCalendrierForm) {
                  setShowCalendrierForm(false);
                  setIsEditingCalendrier(false);
                  setCalendrierFormData(initialCalendrierForm);
                } else {
                  setShowCalendrierForm(true);
                  setIsEditingCalendrier(false);
                }
              } else {
                if (showEreForm) {
                  setShowEreForm(false);
                  setIsEditingEre(false);
                  setEreFormData(initialEreForm);
                } else {
                  setShowEreForm(true);
                  setIsEditingEre(false);
                }
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {(subTab === 'calendriers' ? showCalendrierForm : showEreForm)
              ? 'Annuler'
              : subTab === 'calendriers' ? '+ Nouveau Calendrier' : '+ Nouvelle Ère'}
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

      {subTab === 'calendriers' && showCalendrierForm && (
        <CalendrierForm
          formData={calendrierFormData}
          setFormData={setCalendrierFormData}
          onSubmit={handleSubmitCalendrier}
          onCancel={() => { setShowCalendrierForm(false); setIsEditingCalendrier(false); setCalendrierFormData(initialCalendrierForm); }}
          universMultivers={universMultivers}
          isEditing={isEditingCalendrier}
        />
      )}

      {subTab === 'eres' && showEreForm && (
        <EreForm
          formData={ereFormData}
          setFormData={setEreFormData}
          onSubmit={handleSubmitEre}
          onCancel={() => { setShowEreForm(false); setIsEditingEre(false); setEreFormData(initialEreForm); }}
          statusOptions={ereStatusOptions}
          calendriers={calendriers}
          evenements={evenements}
          isEditing={isEditingEre}
        />
      )}

      {subTab === 'calendriers' ? (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--encre)' }}>Calendriers ({filteredCalendriers.length}/{calendriers.length})</h3>
            <CalendrierList
              calendriers={filteredCalendriers}
              selectedCalendrier={selectedCalendrier}
              onSelect={setSelectedCalendrier}
              onDelete={handleDeleteCalendrier}
              onEdit={handleEditCalendrier}
              getUniversById={getUniversById}
            />
          </div>
          {selectedCalendrier && (
            <CalendrierDetails
              selectedCalendrier={selectedCalendrier}
              getUniversById={getUniversById}
            />
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--encre)' }}>Ères ({filteredEres.length}/{eres.length})</h3>
            <EreList
              eres={filteredEres}
              selectedEre={selectedEre}
              onSelect={setSelectedEre}
              onDelete={handleDeleteEre}
              onEdit={handleEditEre}
            />
          </div>
          {selectedEre && (
            <EreDetails
              selectedEre={selectedEre}
              getCalendrierById={getCalendrierById}
              getEvenementById={getEvenementById}
            />
          )}
        </div>
      )}
    </div>
  );
}
