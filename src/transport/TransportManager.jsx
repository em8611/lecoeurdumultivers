import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import TransportForm from './components/TransportForm.jsx';
import TransportList from './components/TransportList.jsx';
import TransportDetails from './components/TransportDetails.jsx';

const categoryOptions = ['Monture', 'Véhicule terrestre', 'Navire', 'Aéronef', 'Portail / Téléportation', 'Autre'];
const statusOptions = ['Opérationnel', 'Hors service', 'Détruit', 'Légendaire', 'Perdu'];

export default function TransportManager() {
  const { transports, characters, territoires, universMultivers } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Toutes');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Véhicule terrestre',
    status: 'Opérationnel',
    speed: '',
    capacity: '',
    description: '',
    origin: '',
    pilotIds: [],
    territoireIds: [],
    universIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultTransport = (name) => ({
    id: Date.now() + Math.random(),
    name,
    category: 'Véhicule terrestre',
    status: 'Opérationnel',
    speed: '',
    capacity: '',
    description: '',
    origin: '',
    pilotIds: [],
    territoireIds: [],
    universIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (transport) => addElement('transport', transport),
    createDefaultTransport,
    setNotification
  );

  const handleEditTransport = (transport) => {
    setFormData({ ...transport });
    setIsEditing(true);
    setShowForm(true);
    setSelectedTransport(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('transport', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newTransport = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('transport', newTransport);
      setNotification({ type: 'success', message: `"${formData.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteTransport = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce moyen de transport ?')) return;

    const toDelete = transports.find(t => t.id === id);
    deleteElement('transport', id);

    if (selectedTransport?.id === id) setSelectedTransport(null);

    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);
  const getUniversById = (id) => universMultivers.find(u => u.id === id);

  const filteredTransports = transports
    .filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Toutes' || t.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Transport & Voyage</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={gotoFiches}
            style={{ padding: '8px 12px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Ouvrir le viewer des fiches techniques"
          >
            Fiches
          </button>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setIsEditing(false);
                setFormData(initialForm);
              } else {
                setShowForm(true);
                setIsEditing(false);
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showForm ? 'Annuler' : '+ Nouveau Transport'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs moyens de transport par leurs noms"
          >
            Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(transports, 'transports_export.json')}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
            title="Exporter tous les moyens de transport en JSON"
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }} title="Importer des moyens de transport depuis JSON">
            Importer
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
                  let updated = transports;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = transports.some(t => t.id === item.id);
                    if (exists) updateElement('transport', item.id, item);
                    else addElement('transport', item);
                  });
                  setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                  setTimeout(() => setNotification(null), 4000);
                });
              }}
            />
          </label>
        </div>
      </div>

      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Transport & Voyage"
        placeholder="Aigle de Tonnerre&#10;Galion des Brumes&#10;Porte d'Alrya&#10;..."
        description="Entrez un nom de moyen de transport par ligne. Chaque entrée sera créée avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Recherche</label>
          <input
            type="text"
            placeholder="Rechercher un moyen de transport, une description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Catégorie</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="Toutes">Toutes les catégories</option>
            {categoryOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <TransportForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          categoryOptions={categoryOptions}
          statusOptions={statusOptions}
          characters={characters}
          territoires={territoires}
          universMultivers={universMultivers}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--encre)' }}>
            Tous les moyens de transport ({filteredTransports.length}/{transports.length})
          </h3>
          <TransportList
            transports={filteredTransports}
            selectedTransport={selectedTransport}
            onSelect={setSelectedTransport}
            onDelete={handleDeleteTransport}
            onEdit={handleEditTransport}
          />
        </div>

        {selectedTransport && (
          <TransportDetails
            selectedTransport={selectedTransport}
            getCharacterById={getCharacterById}
            getTerritoireById={getTerritoireById}
            getUniversById={getUniversById}
          />
        )}
      </div>
    </div>
  );
}
