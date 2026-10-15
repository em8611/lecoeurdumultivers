import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import DiplomatieForm from './components/DiplomatieForm.jsx';
import DiplomatieList from './components/DiplomatieList.jsx';
import DiplomatieDetails from './components/DiplomatieDetails.jsx';

const statusOptions = [
  'Alliance', 'Guerre', 'Neutralité', 'Vassalité', 'Traité',
  'Embargo', 'Non-agression', 'Rivalité', 'Autre'
];

const statusIcons = {
  'Alliance': '🤝',
  'Guerre': '⚔️',
  'Neutralité': '⚖️',
  'Vassalité': '👑',
  'Traité': '📜',
  'Embargo': '🚫',
  'Non-agression': '🕊️',
  'Rivalité': '😠',
  'Autre': '🔘'
};

function getStatusIcon(status) {
  return statusIcons[status] || '🔘';
}

export default function DiplomatieManager() {
  const { diplomatieRelations, equipes, territoires, evenements } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedRelation, setSelectedRelation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    fromType: 'equipe',
    fromId: '',
    toType: 'equipe',
    toId: '',
    status: 'Alliance',
    intensity: 3,
    description: '',
    startDate: '',
    relatedEventIds: [],
    tags: []
  };

  const [formData, setFormData] = useState(initialForm);

  const getEntityById = (type, id) => {
    const list = type === 'territoire' ? territoires : equipes;
    return list.find(e => e.id === id);
  };

  const getEntityOptions = (type) => (type === 'territoire' ? territoires : equipes);

  const handleEditRelation = (relation) => {
    setFormData({ ...relation });
    setIsEditing(true);
    setShowForm(true);
    setSelectedRelation(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('diplomatie', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: 'Relation diplomatique mise à jour' });
    } else {
      const newRelation = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('diplomatie', newRelation);
      setNotification({ type: 'success', message: 'Relation diplomatique créée' });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteRelation = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette relation diplomatique ?')) return;
    deleteElement('diplomatie', id);
    if (selectedRelation?.id === id) setSelectedRelation(null);
    setNotification({ type: 'info', message: 'Relation supprimée' });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredRelations = diplomatieRelations.filter(rel => {
    const fromEntity = getEntityById(rel.fromType, rel.fromId);
    const toEntity = getEntityById(rel.toType, rel.toId);
    const text = `${fromEntity?.name || ''} ${toEntity?.name || ''} ${rel.description || ''}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Tous' || rel.status === filterStatus;
    return matchesSearch && matchesStatus;
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
        <h2 style={{ margin: 0 }}>🤝 Factions & Diplomatie</h2>
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
            {showForm ? '✕ Annuler' : '+ Nouvelle Relation'}
          </button>
          <button
            onClick={() => exportElementsToFile(diplomatieRelations, 'diplomatie_export.json')}
            style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter toutes les relations diplomatiques en JSON"
          >
            ⬇️ Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', marginBottom: 0 }} title="Importer des relations depuis JSON">
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
                  let updated = diplomatieRelations;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = diplomatieRelations.some(r => r.id === item.id);
                    if (exists) updateElement('diplomatie', item.id, item);
                    else addElement('diplomatie', item);
                  });
                  setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                  setTimeout(() => setNotification(null), 4000);
                });
              }}
            />
          </label>
        </div>
      </div>

      {(equipes.length === 0 && territoires.length === 0) && (
        <p style={{ color: '#856404', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: 6, padding: 12, fontSize: 14 }}>
          Aucune Équipe ni Territoire n'existe encore. Créez-en d'abord dans les modules « Équipes » ou « Cartes & Géographie » pour pouvoir établir des relations diplomatiques.
        </p>
      )}

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher par entité ou description..."
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
        <DiplomatieForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          statusOptions={statusOptions}
          getEntityOptions={getEntityOptions}
          evenements={evenements}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Relations diplomatiques ({filteredRelations.length}/{diplomatieRelations.length})</h3>
          <DiplomatieList
            relations={filteredRelations}
            selectedRelation={selectedRelation}
            onSelect={setSelectedRelation}
            onDelete={handleDeleteRelation}
            onEdit={handleEditRelation}
            getEntityById={getEntityById}
            getStatusIcon={getStatusIcon}
          />
        </div>

        {selectedRelation && (
          <DiplomatieDetails
            selectedRelation={selectedRelation}
            getEntityById={getEntityById}
            getStatusIcon={getStatusIcon}
            evenements={evenements}
          />
        )}
      </div>
    </div>
  );
}
