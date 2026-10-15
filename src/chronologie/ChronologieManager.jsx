import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import EvenementForm from './components/EvenementForm.jsx';
import EvenementList from './components/EvenementList.jsx';
import EvenementDetails from './components/EvenementDetails.jsx';
import TimelineView from './components/TimelineView.jsx';

const categoryOptions = [
  'Naissance', 'Mort', 'Bataille', 'Découverte',
  'Fondation', 'Catastrophe', 'Traité/Accord', 'Autre'
];

const categoryIcons = {
  'Naissance': '👶',
  'Mort': '⚰️',
  'Bataille': '⚔️',
  'Découverte': '🔍',
  'Fondation': '🏛️',
  'Catastrophe': '🌋',
  'Traité/Accord': '🤝',
  'Autre': '📌'
};

function getCategoryIcon(category) {
  return categoryIcons[category] || '📌';
}

function sortEvenements(evenements) {
  return [...evenements].sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : Infinity;
    const orderB = typeof b.order === 'number' ? b.order : Infinity;
    if (orderA !== orderB) return orderA - orderB;
    const dateA = a.date || '';
    const dateB = b.date || '';
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    return (a.name || '').localeCompare(b.name || '');
  });
}

export default function ChronologieManager() {
  const { evenements, characters, locations, equipes } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedEvenement, setSelectedEvenement] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' ou 'list'
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Autre',
    date: '',
    order: '',
    description: '',
    consequences: '',
    characterIds: [],
    locationIds: [],
    equipeIds: [],
    relatedEventIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultEvenement = (name) => ({
    id: Date.now() + Math.random(),
    name: name,
    category: 'Autre',
    date: '',
    order: '',
    description: '',
    consequences: '',
    characterIds: [],
    locationIds: [],
    equipeIds: [],
    relatedEventIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (evenement) => addElement('evenement', evenement),
    createDefaultEvenement,
    setNotification
  );

  const handleEditEvenement = (evenement) => {
    setFormData({ ...evenement, order: evenement.order ?? '' });
    setIsEditing(true);
    setShowForm(true);
    setSelectedEvenement(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      order: formData.order === '' ? null : Number(formData.order)
    };

    if (isEditing) {
      updateElement('evenement', payload.id, {
        ...payload,
        updatedAt: new Date().toISOString()
      });
      setNotification({ type: 'success', message: `"${payload.name}" mis à jour` });
    } else {
      const newEvenement = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      };
      addElement('evenement', newEvenement);
      setNotification({ type: 'success', message: `"${payload.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteEvenement = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    const evenementToDelete = evenements.find(e => e.id === id);
    deleteElement('evenement', id);

    if (selectedEvenement?.id === id) {
      setSelectedEvenement(null);
    }

    setNotification({ type: 'info', message: `"${evenementToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const getLocationById = (id) => locations.find(l => l.id === id);
  const getEquipeById = (id) => equipes.find(eq => eq.id === id);
  const getEvenementById = (id) => evenements.find(ev => ev.id === id);

  const filteredEvenements = sortEvenements(
    evenements.filter(ev => {
      const matchesSearch = ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.date?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Tous' || ev.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
  );

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
        <h2 style={{ margin: 0 }}>🕰️ Chronologie / Événements</h2>
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
            {showForm ? '✕ Annuler' : '+ Nouvel Événement'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs événements par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(evenements, 'chronologie_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter tous les événements en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des événements depuis JSON">
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
                  let updated = evenements;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = evenements.some(ev => ev.id === item.id);
                    if (exists) updateElement('evenement', item.id, item);
                    else addElement('evenement', item);
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
        title="Import Batch - Chronologie"
        placeholder="Chute de la Citadelle&#10;Signature du Traité d'Aube&#10;Naissance de l'Héritier&#10;..."
        description="Entrez un nom d'événement par ligne. Chaque événement sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher un événement, une date, une description..."
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
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4, border: '1px solid #ced4da', borderRadius: 4, overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('timeline')}
              style={{
                padding: '8px 12px',
                backgroundColor: viewMode === 'timeline' ? '#2196f3' : 'white',
                color: viewMode === 'timeline' ? 'white' : '#333',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vue frise chronologique"
            >
              📈 Frise
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 12px',
                backgroundColor: viewMode === 'list' ? '#2196f3' : 'white',
                color: viewMode === 'list' ? 'white' : '#333',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vue liste"
            >
              ☰ Liste
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <EvenementForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          categoryOptions={categoryOptions}
          characters={characters}
          locations={locations}
          equipes={equipes}
          evenements={evenements}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>
            {filterCategory === 'Tous' ? 'Tous les événements' : filterCategory}
            {' '}({filteredEvenements.length}/{evenements.length})
          </h3>
          {viewMode === 'timeline' ? (
            <TimelineView
              evenements={filteredEvenements}
              selectedEvenement={selectedEvenement}
              onSelect={setSelectedEvenement}
              getCategoryIcon={getCategoryIcon}
            />
          ) : (
            <EvenementList
              evenements={filteredEvenements}
              selectedEvenement={selectedEvenement}
              onSelect={setSelectedEvenement}
              onDelete={handleDeleteEvenement}
              onEdit={handleEditEvenement}
              getCategoryIcon={getCategoryIcon}
            />
          )}
        </div>

        {selectedEvenement && (
          <EvenementDetails
            selectedEvenement={selectedEvenement}
            getCategoryIcon={getCategoryIcon}
            getCharacterById={getCharacterById}
            getLocationById={getLocationById}
            getEquipeById={getEquipeById}
            getEvenementById={getEvenementById}
            onSelectEvenement={setSelectedEvenement}
            onEdit={handleEditEvenement}
            onDelete={handleDeleteEvenement}
          />
        )}
      </div>
    </div>
  );
}
