import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import TraditionForm from './components/TraditionForm.jsx';
import TraditionList from './components/TraditionList.jsx';
import TraditionDetails from './components/TraditionDetails.jsx';

const categoryOptions = ['Coutume', 'Fête / Rituel', 'Art', 'Vêtement / Mode', 'Norme sociale', 'Autre'];

const categoryIcons = {
  'Coutume': '📜',
  'Fête / Rituel': '🎉',
  'Art': '🎨',
  'Vêtement / Mode': '👗',
  'Norme sociale': '📏',
  'Autre': '🌀'
};

function getCategoryIcon(category) { return categoryIcons[category] || '🌀'; }

export default function CultureManager() {
  const { traditions, equipes, territoires } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedTradition, setSelectedTradition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Toutes');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Coutume',
    description: '',
    origin: '',
    practice: '',
    significance: '',
    equipeIds: [],
    territoireIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultTradition = (name) => ({
    id: Date.now() + Math.random(),
    name,
    category: 'Coutume',
    description: '',
    origin: '',
    practice: '',
    significance: '',
    equipeIds: [],
    territoireIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (tradition) => addElement('tradition', tradition),
    createDefaultTradition,
    setNotification
  );

  const handleEditTradition = (tradition) => {
    setFormData({ ...tradition });
    setIsEditing(true);
    setShowForm(true);
    setSelectedTradition(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('tradition', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mise à jour` });
    } else {
      const newTradition = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('tradition', newTradition);
      setNotification({ type: 'success', message: `"${formData.name}" créée` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteTradition = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tradition ?')) return;

    const toDelete = traditions.find(t => t.id === id);
    deleteElement('tradition', id);

    if (selectedTradition?.id === id) setSelectedTradition(null);

    setNotification({ type: 'info', message: `"${toDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getEquipeById = (id) => equipes.find(e => e.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);

  const filteredTraditions = traditions
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
          padding: '10px 16px', borderRadius: 6, color: 'white',
          backgroundColor: notification.type === 'success' ? '#28a745' : notification.type === 'info' ? '#17a2b8' : '#dc3545',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>🏺 Culture & Société</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={gotoFiches}
            style={{ padding: '8px 12px', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Ouvrir le viewer des fiches techniques"
          >
            📄 Fiches
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
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showForm ? '✕ Annuler' : '+ Nouvelle Tradition'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs traditions par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(traditions, 'traditions_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter toutes les traditions en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des traditions depuis JSON">
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
                  let updated = traditions;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = traditions.some(t => t.id === item.id);
                    if (exists) updateElement('tradition', item.id, item);
                    else addElement('tradition', item);
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
        title="Import Batch - Traditions"
        placeholder="Fête des Récoltes&#10;Rite du Passage&#10;Tissage des Clans&#10;..."
        description="Entrez un nom de tradition par ligne. Chaque tradition sera créée avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher une tradition, une description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Catégorie</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="Toutes">Toutes les catégories</option>
            {categoryOptions.map(c => (
              <option key={c} value={c}>{getCategoryIcon(c)} {c}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <TraditionForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          categoryOptions={categoryOptions}
          equipes={equipes}
          territoires={territoires}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>
            Toutes les traditions ({filteredTraditions.length}/{traditions.length})
          </h3>
          <TraditionList
            traditions={filteredTraditions}
            selectedTradition={selectedTradition}
            onSelect={setSelectedTradition}
            onDelete={handleDeleteTradition}
            onEdit={handleEditTradition}
            getCategoryIcon={getCategoryIcon}
          />
        </div>

        {selectedTradition && (
          <TraditionDetails
            selectedTradition={selectedTradition}
            getCategoryIcon={getCategoryIcon}
            getEquipeById={getEquipeById}
            getTerritoireById={getTerritoireById}
          />
        )}
      </div>
    </div>
  );
}
