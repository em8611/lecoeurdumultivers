import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import DictionnaireForm from './components/DictionnaireForm.jsx';
import DictionnaireList from './components/DictionnaireList.jsx';
import DictionnaireDetails from './components/DictionnaireDetails.jsx';

const categoryOptions = [
  'Magie', 'Technologie', 'Politique', 'Culture', 'Créature',
  'Lieu', 'Phénomène', 'Objet', 'Langage', 'Religion', 'Autre'
];

export default function DictionnaireManager() {
  const { termes } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedTerme, setSelectedTerme] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    term: '',
    category: 'Autre',
    pronunciation: '',
    definition: '',
    origin: '',
    examples: '',
    relatedTerms: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const createDefaultTerme = (name) => ({
    id: Date.now() + Math.random(),
    term: name,
    category: 'Autre',
    pronunciation: '',
    definition: '',
    origin: '',
    examples: '',
    relatedTerms: [],
    tags: [],
    images: [],
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (terme) => addElement('terme', terme),
    createDefaultTerme,
    setNotification
  );

  const handleEditTerme = (terme) => {
    setFormData({ ...terme });
    setIsEditing(true);
    setShowForm(true);
    setSelectedTerme(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateElement('terme', formData.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setNotification({ type: 'success', message: `"${formData.term}" mis à jour` });
    } else {
      const newTerme = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      addElement('terme', newTerme);
      setNotification({ type: 'success', message: `"${formData.term}" créé` });
    }

    setFormData(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteTerme = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce terme ?')) return;

    const termeToDelete = termes.find(t => t.id === id);
    deleteElement('terme', id);

    if (selectedTerme?.id === id) {
      setSelectedTerme(null);
    }

    setNotification({ type: 'info', message: `"${termeToDelete?.term}" supprimé` });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredTermes = termes
    .filter(t => {
      const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.definition?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Tous' || t.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Dictionnaire</h2>
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
            {showForm ? 'Annuler' : '+ Nouveau Terme'}
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs termes par leurs noms"
          >
            Import Batch
          </button>
          <button
            onClick={() => exportElementsToFile(termes, 'dictionnaire_export.json')}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
            title="Exporter tout le dictionnaire en JSON"
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }} title="Importer des termes depuis JSON">
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
                  let updated = termes;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = termes.some(t => t.id === item.id);
                    if (exists) updateElement('terme', item.id, item);
                    else addElement('terme', item);
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
        title="Import Batch - Dictionnaire"
        placeholder="Mana&#10;Vigile&#10;Sceau d'Aube&#10;..."
        description="Entrez un terme par ligne. Chaque terme sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Recherche</label>
          <input
            type="text"
            placeholder="Rechercher un terme ou une définition..."
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
        <DictionnaireForm
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
          <h3>
            {filterCategory === 'Tous' ? 'Tous les termes' : filterCategory}
            {' '}({filteredTermes.length}/{termes.length})
          </h3>
          <DictionnaireList
            termes={filteredTermes}
            selectedTerme={selectedTerme}
            onSelect={setSelectedTerme}
            onDelete={handleDeleteTerme}
            onEdit={handleEditTerme}
          />
        </div>

        {selectedTerme && (
          <DictionnaireDetails
            selectedTerme={selectedTerme}
            allTermes={termes}
            onSelectTerme={setSelectedTerme}
          />
        )}
      </div>
    </div>
  );
}
