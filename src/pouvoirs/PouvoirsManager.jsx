import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import PouvoirForm from './components/PouvoirForm.jsx';
import PouvoirFilters from './components/PouvoirFilters.jsx';
import PouvoirList from './components/PouvoirList.jsx';
import PouvoirDetails from './components/PouvoirDetails.jsx';

export default function PouvoirsManager() {
  const { characters, pouvoirs } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedPouvoir, setSelectedPouvoir] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filterType, setFilterType] = useState('Tous');
  const [filterLevel, setFilterLevel] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    type: 'Pouvoir',
    category: 'Élémentaire',
    level: 'Débutant',
    description: '',
    effects: '',
    cost: '',
    requirements: '',
    users: [],
    range: '',
    duration: '',
    cooldown: '',
    damage: '',
    element: '',
    learningMethod: '',
    evolution: '',
    combinations: '',
    weaknesses: '',
    strengths: '',
    visualEffect: '',
    soundEffect: '',
    sideEffects: '',
    origin: '',
    rarity: 'Commun',
    tags: []
  };

  const [formData, setFormData] = useState(initialForm);

  // Hook pour l'import batch
  const createDefaultPouvoir = (name) => ({
    id: Date.now() + Math.random(),
    name: name,
    type: 'Pouvoir',
    category: 'Élémentaire',
    level: 'Débutant',
    description: '',
    effects: '',
    cost: '',
    requirements: '',
    users: [],
    range: '',
    duration: '',
    cooldown: '',
    damage: '',
    element: '',
    learningMethod: '',
    evolution: '',
    combinations: '',
    weaknesses: '',
    strengths: '',
    visualEffect: '',
    soundEffect: '',
    sideEffects: '',
    origin: '',
    rarity: 'Commun',
    tags: [],
    usageMoments: '',
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (pouvoir) => addElement('pouvoir', pouvoir),
    createDefaultPouvoir,
    setNotification
  );

  const getCategoryIcon = (category) => {
    const icons = {
      'Élémentaire': '🔥',
      'Mental': '🧠',
      'Physique': '💪',
      'Magique': '✨',
      'Technologique': '⚙️',
      'Spirituel': '🌟',
      'Temporel': '⏰',
      'Spatial': '🌌',
      'Énergétique': '⚡',
      'Guérison': '💚',
      'Autre': '🎯'
    };
    return icons[category] || '🎯';
  };

  const getLevelColor = (level) => {
    const colors = {
      'Débutant': '#6c757d',
      'Intermédiaire': '#17a2b8',
      'Avancé': '#007bff',
      'Expert': '#28a745',
      'Maître': '#6f42c1',
      'Légendaire': '#fd7e14'
    };
    return colors[level] || '#6c757d';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('pouvoir', formData.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newPouvoir = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      addElement('pouvoir', newPouvoir);
      setNotification({ type: 'success', message: `"${formData.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleEditPouvoir = (pouvoir) => {
    setFormData({ ...pouvoir });
    setIsEditing(true);
    setShowForm(true);
    setSelectedPouvoir(null);
  };

  const handleDeletePouvoir = (id) => {
    const pouvoirToDelete = pouvoirs.find(p => p.id === id);
    deleteElement('pouvoir', id);
    if (selectedPouvoir?.id === id) setSelectedPouvoir(null);
    setNotification({ type: 'info', message: `"${pouvoirToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddUser = (characterId) => {
    if (!selectedPouvoir) return;
    const updatedUsers = [...selectedPouvoir.users, characterId];
    updateElement('pouvoir', selectedPouvoir.id, { users: updatedUsers });
    setSelectedPouvoir({ ...selectedPouvoir, users: updatedUsers });
    const character = characters.find(c => c.id === characterId);
    setNotification({ type: 'success', message: `${character?.name} ajouté(e)` });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleRemoveUser = (characterId) => {
    if (!selectedPouvoir) return;
    const updatedUsers = selectedPouvoir.users.filter(id => id !== characterId);
    updateElement('pouvoir', selectedPouvoir.id, { users: updatedUsers });
    setSelectedPouvoir({ ...selectedPouvoir, users: updatedUsers });
    const character = characters.find(c => c.id === characterId);
    setNotification({ type: 'info', message: `${character?.name} retiré(e)` });
    setTimeout(() => setNotification(null), 2500);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const availableCharacters = selectedPouvoir
    ? characters.filter(c => !selectedPouvoir.users.includes(c.id))
    : [];

  const filteredPouvoirs = pouvoirs.filter(p => {
    const matchType = filterType === 'Tous' || p.type === filterType;
    const matchLevel = filterLevel === 'Tous' || p.level === filterLevel;
    return matchType && matchLevel;
  });

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
        <h2 style={{ margin: 0 }}>✨ Gestion des Pouvoirs et Compétences</h2>
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
            {showForm ? '✕ Annuler' : '+ Nouveau Pouvoir/Compétence'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs pouvoirs par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(pouvoirs, 'pouvoirs_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter tous les pouvoirs en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des pouvoirs depuis JSON">
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
                  const payload = data && data.data ? data.data : data;
                  const items = Array.isArray(payload) ? payload : [payload];
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    const exists = pouvoirs.some(p => p.id === item.id);
                    if (exists) updateElement('pouvoir', item.id, item);
                    else addElement('pouvoir', item);
                  });
                  setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                  setTimeout(() => setNotification(null), 3000);
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
        title="Import Batch - Pouvoirs"
        placeholder="Boule de feu&#10;Télékinésie&#10;Super vitesse&#10;..."
        description="Entrez un nom de pouvoir par ligne. Chaque pouvoir sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <PouvoirFilters
        filterType={filterType}
        setFilterType={setFilterType}
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
      />

      {showForm && (
        <PouvoirForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setIsEditing(false); setFormData(initialForm); }}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Liste des pouvoirs ({filteredPouvoirs.length}/{pouvoirs.length})</h3>
          {filteredPouvoirs.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              {pouvoirs.length === 0 ? 'Aucun pouvoir créé. Cliquez sur le bouton ci-dessus pour commencer.' : 'Aucun pouvoir ne correspond aux filtres sélectionnés.'}
            </p>
          ) : (
            <PouvoirList
              pouvoirs={filteredPouvoirs}
              selectedPouvoir={selectedPouvoir}
              onSelect={setSelectedPouvoir}
              onDelete={handleDeletePouvoir}
              onEdit={handleEditPouvoir}
              getCategoryIcon={getCategoryIcon}
              getLevelColor={getLevelColor}
            />
          )}
        </div>

        {selectedPouvoir && (
          <PouvoirDetails
            selectedPouvoir={selectedPouvoir}
            getCategoryIcon={getCategoryIcon}
            getLevelColor={getLevelColor}
            characters={characters}
            availableCharacters={availableCharacters}
            getCharacterById={getCharacterById}
            onAddUser={handleAddUser}
            onRemoveUser={handleRemoveUser}
          />
        )}
      </div>
    </div>
  );
}
