import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import UniversForm from './components/UniversForm.jsx';
import UniversList from './components/UniversList.jsx';
import UniversDetails from './components/UniversDetails.jsx';

const statusOptions = ['Actif', 'Instable', 'En formation', 'Effondré', 'Scellé', 'Inconnu'];
const dangerOptions = ['Sûr', 'Modéré', 'Dangereux', 'Extrême', 'Catastrophique'];

export default function UniversManager() {
  const { universMultivers, territoires, concepts } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedUnivers, setSelectedUnivers] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    franchise: '',
    group: '',
    description: '',
    rules: '',
    accessPoints: '',
    dangerLevel: 'Modéré',
    status: 'Actif',
    connectedUniverseIds: [],
    territoireIds: [],
    conceptIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultUnivers = (name) => ({
    id: Date.now() + Math.random(),
    name,
    franchise: '',
    group: '',
    description: '',
    rules: '',
    accessPoints: '',
    dangerLevel: 'Modéré',
    status: 'Actif',
    connectedUniverseIds: [],
    territoireIds: [],
    conceptIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (univers) => addElement('univers', univers),
    createDefaultUnivers,
    setNotification
  );

  const handleEditUnivers = (univers) => {
    setFormData({ ...univers });
    setIsEditing(true);
    setShowForm(true);
    setSelectedUnivers(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('univers', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newUnivers = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('univers', newUnivers);
      setNotification({ type: 'success', message: `"${formData.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteUnivers = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet univers ?')) return;

    const universToDelete = universMultivers.find(u => u.id === id);
    deleteElement('univers', id);

    universMultivers
      .filter(u => (u.connectedUniverseIds || []).includes(id))
      .forEach(u => {
        updateElement('univers', u.id, { connectedUniverseIds: u.connectedUniverseIds.filter(uid => uid !== id) });
      });

    if (selectedUnivers?.id === id) setSelectedUnivers(null);

    setNotification({ type: 'info', message: `"${universToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getUniversById = (id) => universMultivers.find(u => u.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);
  const getConceptById = (id) => concepts.find(c => c.id === id);

  const filteredUnivers = universMultivers
    .filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.franchise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'Tous' || u.status === filterStatus;
      return matchesSearch && matchesStatus;
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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Univers / Multivers</h2>
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
            {showForm ? 'Annuler' : '+ Nouvel Univers'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs univers par leurs noms"
          >
            Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(universMultivers, 'univers_export.json')}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
            title="Exporter tous les univers en JSON"
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }} title="Importer des univers depuis JSON">
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
                  let updated = universMultivers;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = universMultivers.some(u => u.id === item.id);
                    if (exists) updateElement('univers', item.id, item);
                    else addElement('univers', item);
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
        title="Import Batch - Univers"
        placeholder="Terre Prime&#10;Nexus Spatio-Temporel&#10;Royaume Élémentaire&#10;..."
        description="Entrez un nom d'univers par ligne. Chaque univers sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Recherche</label>
          <input
            type="text"
            placeholder="Rechercher un univers, une franchise, une description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Statut</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="Tous">Tous les statuts</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <UniversForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          statusOptions={statusOptions}
          dangerOptions={dangerOptions}
          universMultivers={universMultivers}
          territoires={territoires}
          concepts={concepts}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--encre)' }}>
            Tous les univers ({filteredUnivers.length}/{universMultivers.length})
          </h3>
          <UniversList
            universList={filteredUnivers}
            selectedUnivers={selectedUnivers}
            onSelect={setSelectedUnivers}
            onDelete={handleDeleteUnivers}
            onEdit={handleEditUnivers}
          />
        </div>

        {selectedUnivers && (
          <UniversDetails
            selectedUnivers={selectedUnivers}
            getUniversById={getUniversById}
            getTerritoireById={getTerritoireById}
            getConceptById={getConceptById}
            onSelectUnivers={setSelectedUnivers}
          />
        )}
      </div>
    </div>
  );
}
