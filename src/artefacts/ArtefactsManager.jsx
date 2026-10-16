import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import ArtefactForm from './components/ArtefactForm.jsx';
import ArtefactList from './components/ArtefactList.jsx';
import ArtefactDetails from './components/ArtefactDetails.jsx';

const categoryOptions = ['Arme', 'Armure / Équipement', 'Bijou', 'Relique sacrée', 'Objet magique', 'Technologie ancienne', 'Autre'];
const statusOptions = ['Intact', 'Perdu', 'Détruit', 'Scellé', 'Caché'];

export default function ArtefactsManager() {
  const { artefacts, characters, territoires, quetes, evenements } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedArtefact, setSelectedArtefact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Toutes');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Objet magique',
    status: 'Intact',
    description: '',
    powers: '',
    history: '',
    creator: '',
    currentOwnerId: '',
    previousOwnerIds: [],
    locationId: '',
    relatedQuestIds: [],
    relatedEventIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultArtefact = (name) => ({
    id: Date.now() + Math.random(),
    name,
    category: 'Objet magique',
    status: 'Intact',
    description: '',
    powers: '',
    history: '',
    creator: '',
    currentOwnerId: '',
    previousOwnerIds: [],
    locationId: '',
    relatedQuestIds: [],
    relatedEventIds: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (artefact) => addElement('artefact', artefact),
    createDefaultArtefact,
    setNotification
  );

  const handleEditArtefact = (artefact) => {
    setFormData({ ...artefact });
    setIsEditing(true);
    setShowForm(true);
    setSelectedArtefact(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('artefact', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newArtefact = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('artefact', newArtefact);
      setNotification({ type: 'success', message: `"${formData.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteArtefact = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet artefact ?')) return;

    const artefactToDelete = artefacts.find(a => a.id === id);
    deleteElement('artefact', id);

    if (selectedArtefact?.id === id) setSelectedArtefact(null);

    setNotification({ type: 'info', message: `"${artefactToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);
  const getTerritoireById = (id) => territoires.find(t => t.id === id);
  const getQueteById = (id) => quetes.find(q => q.id === id);
  const getEvenementById = (id) => evenements.find(ev => ev.id === id);

  const filteredArtefacts = artefacts
    .filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.powers?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Toutes' || a.category === filterCategory;
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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Artefacts & Reliques</h2>
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
            {showForm ? 'Annuler' : '+ Nouvel Artefact'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs artefacts par leurs noms"
          >
            Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(artefacts, 'artefacts_export.json')}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
            title="Exporter tous les artefacts en JSON"
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }} title="Importer des artefacts depuis JSON">
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
                  let updated = artefacts;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = artefacts.some(a => a.id === item.id);
                    if (exists) updateElement('artefact', item.id, item);
                    else addElement('artefact', item);
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
        title="Import Batch - Artefacts"
        placeholder="Lame des Anciens&#10;Couronne du Néant&#10;Sceau de l'Aube&#10;..."
        description="Entrez un nom d'artefact par ligne. Chaque artefact sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Recherche</label>
          <input
            type="text"
            placeholder="Rechercher un artefact, une description, un pouvoir..."
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
        <ArtefactForm
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
          quetes={quetes}
          evenements={evenements}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--encre)' }}>
            Tous les artefacts ({filteredArtefacts.length}/{artefacts.length})
          </h3>
          <ArtefactList
            artefacts={filteredArtefacts}
            selectedArtefact={selectedArtefact}
            onSelect={setSelectedArtefact}
            onDelete={handleDeleteArtefact}
            onEdit={handleEditArtefact}
          />
        </div>

        {selectedArtefact && (
          <ArtefactDetails
            selectedArtefact={selectedArtefact}
            getCharacterById={getCharacterById}
            getTerritoireById={getTerritoireById}
            getQueteById={getQueteById}
            getEvenementById={getEvenementById}
          />
        )}
      </div>
    </div>
  );
}
