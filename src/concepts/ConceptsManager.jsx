import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import ConceptForm from './components/ConceptForm.jsx';
import ConceptList from './components/ConceptList.jsx';
import ConceptDetails from './components/ConceptDetails.jsx';

const categoryOptions = ['Loi', 'Règle', 'Système', 'Principe', 'Phénomène', 'Autre'];

export default function ConceptsManager() {
  const { concepts } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: 'Loi',
    description: '',
    mechanism: '',
    scope: '',
    origin: '',
    exceptions: '',
    consequences: '',
    relatedConcepts: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultConcept = (name) => ({
    id: Date.now() + Math.random(),
    name: name,
    category: 'Loi',
    description: '',
    mechanism: '',
    scope: '',
    origin: '',
    exceptions: '',
    consequences: '',
    relatedConcepts: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (concept) => addElement('concept', concept),
    createDefaultConcept,
    setNotification
  );

  const handleEditConcept = (concept) => {
    setFormData({ ...concept });
    setIsEditing(true);
    setShowForm(true);
    setSelectedConcept(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('concept', formData.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newConcept = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      addElement('concept', newConcept);
      setNotification({ type: 'success', message: `"${formData.name}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteConcept = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce concept ?')) return;

    const conceptToDelete = concepts.find(c => c.id === id);
    deleteElement('concept', id);

    if (selectedConcept?.id === id) {
      setSelectedConcept(null);
    }

    setNotification({ type: 'info', message: `"${conceptToDelete?.name}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredConcepts = concepts
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Tous' || c.category === filterCategory;
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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Concepts</h2>
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
            {showForm ? 'Annuler' : '+ Nouveau Concept'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs concepts par leurs noms"
          >
            Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(concepts, 'concepts_export.json')}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
            title="Exporter tous les concepts en JSON"
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }} title="Importer des concepts depuis JSON">
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
                  let updated = concepts;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = concepts.some(c => c.id === item.id);
                    if (exists) updateElement('concept', item.id, item);
                    else addElement('concept', item);
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
        title="Import Batch - Concepts"
        placeholder="Loi du Reflux&#10;Pacte des Sept&#10;Équilibre des Sphères&#10;..."
        description="Entrez un nom de concept par ligne. Chaque concept sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Recherche</label>
          <input
            type="text"
            placeholder="Rechercher un concept ou une description..."
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
            <option value="Tous">Toutes les catégories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <ConceptForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData(initialForm);
          }}
          categoryOptions={categoryOptions}
          isEditing={isEditing}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--encre)' }}>
            {filterCategory === 'Tous' ? 'Tous les concepts' : filterCategory}
            {' '}({filteredConcepts.length}/{concepts.length})
          </h3>
          <ConceptList
            concepts={filteredConcepts}
            selectedConcept={selectedConcept}
            onSelect={setSelectedConcept}
            onDelete={handleDeleteConcept}
            onEdit={handleEditConcept}
          />
        </div>

        {selectedConcept && (
          <ConceptDetails
            selectedConcept={selectedConcept}
            allConcepts={concepts}
            onSelectConcept={setSelectedConcept}
          />
        )}
      </div>
    </div>
  );
}
