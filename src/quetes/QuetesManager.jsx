import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import QueteForm from './components/QueteForm.jsx';
import QueteList from './components/QueteList.jsx';
import QueteDetails from './components/QueteDetails.jsx';

const categoryOptions = [
  'Quête principale', 'Quête secondaire', 'Intrigue politique',
  'Mystère', 'Enquête', 'Mission', 'Arc narratif', 'Autre'
];

const statusOptions = ['Non commencée', 'En cours', 'En pause', 'Terminée', 'Échouée', 'Abandonnée'];

const categoryIcons = {
  'Quête principale': '🏆',
  'Quête secondaire': '🔹',
  'Intrigue politique': '🏛️',
  'Mystère': '🔍',
  'Enquête': '🕵️',
  'Mission': '🎯',
  'Arc narratif': '📚',
  'Autre': '📌'
};

const statusIcons = {
  'Non commencée': '⭕',
  'En cours': '🔄',
  'En pause': '⏸️',
  'Terminée': '✅',
  'Échouée': '❌',
  'Abandonnée': '🗑️'
};

function getCategoryIcon(category) { return categoryIcons[category] || '📌'; }
function getStatusIcon(status) { return statusIcons[status] || '⭕'; }

export default function QuetesManager() {
  const { quetes, characters, equipes, locations, evenements } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedQuete, setSelectedQuete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Quête secondaire',
    status: 'Non commencée',
    advancement: 0,
    description: '',
    objectives: [],
    stakes: '',
    resolution: '',
    protagonistIds: [],
    antagonistIds: [],
    equipeIds: [],
    locationIds: [],
    relatedEventIds: [],
    relatedQuestIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultQuete = (name) => ({
    id: Date.now() + Math.random(),
    name,
    category: 'Quête secondaire',
    status: 'Non commencée',
    advancement: 0,
    description: '',
    objectives: [],
    stakes: '',
    resolution: '',
    protagonistIds: [],
    antagonistIds: [],
    equipeIds: [],
    locationIds: [],
    relatedEventIds: [],
    relatedQuestIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (quete) => addElement('quete', quete),
    createDefaultQuete,
    setNotification
  );

  const handleEditQuete = (quete) => {
    setFormData({ ...quete });
    setIsEditing(true);
    setShowForm(true);
    setSelectedQuete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('quete', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mise à jour` });
    } else {
      const newQuete = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('quete', newQuete);
      setNotification({ type: 'success', message: `"${formData.name}" créée` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteQuete = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette quête ?')) return;

    const questToDelete = quetes.find(q => q.id === id);
    deleteElement('quete', id);

    quetes
      .filter(q => (q.relatedQuestIds || []).includes(id))
      .forEach(q => {
        updateElement('quete', q.id, { relatedQuestIds: q.relatedQuestIds.filter(qid => qid !== id) });
      });

    if (selectedQuete?.id === id) setSelectedQuete(null);

    setNotification({ type: 'info', message: `"${questToDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const getEquipeById = (id) => equipes.find(e => e.id === id);
  const getLocationById = (id) => locations.find(l => l.id === id);
  const getEvenementById = (id) => evenements.find(ev => ev.id === id);
  const getQueteById = (id) => quetes.find(q => q.id === id);

  const filteredQuetes = quetes
    .filter(q => {
      const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'Tous' || q.status === filterStatus;
      const matchesCategory = filterCategory === 'Tous' || q.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
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
        <h2 style={{ margin: 0 }}>🗡️ Quêtes & Intrigues</h2>
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
            {showForm ? '✕ Annuler' : '+ Nouvelle Quête'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs quêtes par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(quetes, 'quetes_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter toutes les quêtes en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des quêtes depuis JSON">
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
                  let updated = quetes;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = quetes.some(q => q.id === item.id);
                    if (exists) updateElement('quete', item.id, item);
                    else addElement('quete', item);
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
        title="Import Batch - Quêtes"
        placeholder="La Quête du Sceau Brisé&#10;Le Complot de la Cour d'Argent&#10;Disparition à Port-Lune&#10;..."
        description="Entrez un nom de quête par ligne. Chaque quête sera créée avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher une quête ou une description..."
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
            <option value="Tous">Toutes les catégories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Statut</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="Tous">Tous les statuts</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{getStatusIcon(s)} {s}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <QueteForm
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
          equipes={equipes}
          locations={locations}
          evenements={evenements}
          quetes={quetes}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>
            {filterCategory === 'Tous' ? 'Toutes les quêtes' : filterCategory}
            {' '}({filteredQuetes.length}/{quetes.length})
          </h3>
          <QueteList
            quetes={filteredQuetes}
            selectedQuete={selectedQuete}
            onSelect={setSelectedQuete}
            onDelete={handleDeleteQuete}
            onEdit={handleEditQuete}
            getCategoryIcon={getCategoryIcon}
            getStatusIcon={getStatusIcon}
          />
        </div>

        {selectedQuete && (
          <QueteDetails
            selectedQuete={selectedQuete}
            getCategoryIcon={getCategoryIcon}
            getStatusIcon={getStatusIcon}
            getCharacterById={getCharacterById}
            getEquipeById={getEquipeById}
            getLocationById={getLocationById}
            getEvenementById={getEvenementById}
            getQueteById={getQueteById}
            onSelectQuete={setSelectedQuete}
            onEdit={handleEditQuete}
            onDelete={handleDeleteQuete}
          />
        )}
      </div>
    </div>
  );
}
