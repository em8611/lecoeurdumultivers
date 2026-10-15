import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import LangueForm from './components/LangueForm.jsx';
import LangueList from './components/LangueList.jsx';
import LangueDetails from './components/LangueDetails.jsx';

const statusOptions = ['Vivante', 'Morte', 'En évolution', 'Sacrée', 'Secrète', 'Autre'];
const writingSystemOptions = ['Alphabet', 'Syllabaire', 'Idéogrammes', 'Runes', 'Orale uniquement', 'Autre'];

const statusIcons = {
  'Vivante': '🟢',
  'Morte': '💀',
  'En évolution': '🌱',
  'Sacrée': '✨',
  'Secrète': '🤫',
  'Autre': '❓'
};

function getStatusIcon(status) {
  return statusIcons[status] || '❓';
}

export default function LanguesManager() {
  const { langues, territoires, equipes, characters } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedLangue, setSelectedLangue] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    family: '',
    status: 'Vivante',
    writingSystem: 'Alphabet',
    description: '',
    phonetics: '',
    grammar: '',
    samplePhrases: [],
    relatedLanguageIds: [],
    territoireIds: [],
    equipeIds: [],
    characterIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultLangue = (name) => ({
    id: Date.now() + Math.random(),
    name,
    family: '',
    status: 'Vivante',
    writingSystem: 'Alphabet',
    description: '',
    phonetics: '',
    grammar: '',
    samplePhrases: [],
    relatedLanguageIds: [],
    territoireIds: [],
    equipeIds: [],
    characterIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (langue) => addElement('langue', langue),
    createDefaultLangue,
    setNotification
  );

  const handleEditLangue = (langue) => {
    setFormData({ ...langue });
    setIsEditing(true);
    setShowForm(true);
    setSelectedLangue(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('langue', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mise à jour` });
    } else {
      const newLangue = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('langue', newLangue);
      setNotification({ type: 'success', message: `"${formData.name}" créée` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteLangue = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette langue ?')) return;

    const langueToDelete = langues.find(l => l.id === id);
    deleteElement('langue', id);

    langues
      .filter(l => (l.relatedLanguageIds || []).includes(id))
      .forEach(l => {
        updateElement('langue', l.id, { relatedLanguageIds: l.relatedLanguageIds.filter(lid => lid !== id) });
      });

    if (selectedLangue?.id === id) setSelectedLangue(null);

    setNotification({ type: 'info', message: `"${langueToDelete?.name}" supprimée` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getLangueById = (id) => langues.find(l => l.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);
  const getEquipeById = (id) => equipes.find(e => e.id === id);
  const getCharacterById = (id) => characters.find(c => c.id === id);

  const filteredLangues = langues
    .filter(l => {
      const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.family?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'Tous' || l.status === filterStatus;
      return matchesSearch && matchesStatus;
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
        <h2 style={{ margin: 0 }}>🗣️ Langues & Écritures</h2>
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
            {showForm ? '✕ Annuler' : '+ Nouvelle Langue'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs langues par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(langues, 'langues_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter toutes les langues en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des langues depuis JSON">
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
                  let updated = langues;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = langues.some(l => l.id === item.id);
                    if (exists) updateElement('langue', item.id, item);
                    else addElement('langue', item);
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
        title="Import Batch - Langues"
        placeholder="Haut-Valyrien&#10;Langue des Anciens&#10;Dialecte du Nord&#10;..."
        description="Entrez un nom de langue par ligne. Chaque langue sera créée avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher une langue, une famille, une description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, boxSizing: 'border-box' }}
          />
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
        <LangueForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          statusOptions={statusOptions}
          writingSystemOptions={writingSystemOptions}
          langues={langues}
          territoires={territoires}
          equipes={equipes}
          characters={characters}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>
            Toutes les langues ({filteredLangues.length}/{langues.length})
          </h3>
          <LangueList
            langues={filteredLangues}
            selectedLangue={selectedLangue}
            onSelect={setSelectedLangue}
            onDelete={handleDeleteLangue}
            onEdit={handleEditLangue}
            getStatusIcon={getStatusIcon}
          />
        </div>

        {selectedLangue && (
          <LangueDetails
            selectedLangue={selectedLangue}
            getStatusIcon={getStatusIcon}
            getLangueById={getLangueById}
            getTerritoireById={getTerritoireById}
            getEquipeById={getEquipeById}
            getCharacterById={getCharacterById}
            onSelectLangue={setSelectedLangue}
          />
        )}
      </div>
    </div>
  );
}
