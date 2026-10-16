import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import DisciplineForm from './components/DisciplineForm.jsx';
import DisciplineList from './components/DisciplineList.jsx';
import DisciplineDetails from './components/DisciplineDetails.jsx';

const magieCategoryOptions = [
  'École Élémentaire', 'Nécromancie', 'Illusion', 'Invocation',
  'Enchantement', 'Divination', 'Transmutation', 'Magie du Sang',
  'Magie Spirituelle', 'Autre'
];

const combatCategoryOptions = [
  'Arme blanche', 'Arme à distance', 'Mains nues / Arts martiaux',
  'Combat tactique / Stratégie', 'Combat monté', 'Combat magique hybride', 'Autre'
];

export default function MagieManager() {
  const { ecolesMagie, stylesCombat, characters } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [subTab, setSubTab] = useState('magie'); // 'magie' ou 'combat'
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const config = subTab === 'magie'
    ? {
        family: 'Magie',
        category: 'ecoleMagie',
        items: ecolesMagie,
        categoryOptions: magieCategoryOptions,
        label: 'École de Magie',
        labelPlural: 'Écoles de Magie',
        exportFileName: 'ecoles_magie_export.json'
      }
    : {
        family: 'Combat',
        category: 'styleCombat',
        items: stylesCombat,
        categoryOptions: combatCategoryOptions,
        label: 'Style de Combat',
        labelPlural: 'Styles de Combat',
        exportFileName: 'styles_combat_export.json'
      };

  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    category: config.categoryOptions[0],
    description: '',
    mechanism: '',
    energySource: '',
    masteryLevels: [],
    limitations: '',
    practitionerIds: [],
    tags: [],
    images: []
  };

  const [formData, setFormData] = useState(initialForm);

  const switchTab = (tab) => {
    setSubTab(tab);
    setSelectedItem(null);
    setShowForm(false);
    setIsEditing(false);
    setSearchTerm('');
  };

  const handleEditItem = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
    setShowForm(true);
    setSelectedItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateElement(config.category, formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setNotification({ type: 'success', message: `"${formData.name}" mis à jour` });
    } else {
      const newItem = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement(config.category, newItem);
      setNotification({ type: 'success', message: `"${formData.name}" créé(e)` });
    }
    setFormData({ ...initialForm, category: config.categoryOptions[0] });
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteItem = (id) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${subTab === 'magie' ? 'cette école' : 'ce style'} ?`)) return;
    const itemToDelete = config.items.find(i => i.id === id);
    deleteElement(config.category, id);
    if (selectedItem?.id === id) setSelectedItem(null);
    setNotification({ type: 'info', message: `"${itemToDelete?.name}" supprimé(e)` });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCharacterById = (id) => characters.find(c => c.id === id);

  const filteredItems = config.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Magie & Système de Combat</h2>
        <button
          onClick={gotoFiches}
          style={{ padding: '8px 12px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          title="Ouvrir le viewer des fiches techniques"
        >
          Fiches
        </button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid var(--trait)' }}>
        <button
          onClick={() => switchTab('magie')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'magie' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'magie' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'magie' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Écoles de Magie ({ecolesMagie.length})
        </button>
        <button
          onClick={() => switchTab('combat')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: subTab === 'combat' ? '2px solid var(--coeur)' : '2px solid transparent',
            marginBottom: -2,
            backgroundColor: 'transparent',
            color: subTab === 'combat' ? 'var(--coeur)' : 'var(--encre-douce)',
            fontWeight: subTab === 'combat' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Styles de Combat ({stylesCombat.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder={`Rechercher une ${config.label.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setIsEditing(false);
                setFormData({ ...initialForm, category: config.categoryOptions[0] });
              } else {
                setFormData({ ...initialForm, category: config.categoryOptions[0] });
                setShowForm(true);
                setIsEditing(false);
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showForm ? 'Annuler' : `+ Nouvelle ${config.label}`}
          </button>
          <button
            onClick={() => exportElementsToFile(config.items, config.exportFileName)}
            style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
          >
            Exporter
          </button>
          <label style={{ padding: '8px 16px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', marginBottom: 0 }}>
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
                  let updated = config.items;
                  items.forEach(item => {
                    if (!item || typeof item !== 'object') return;
                    if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
                    updated = mergeElementInList(updated, item);
                  });
                  updated.forEach(item => {
                    const exists = config.items.some(i => i.id === item.id);
                    if (exists) updateElement(config.category, item.id, item);
                    else addElement(config.category, item);
                  });
                  setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                  setTimeout(() => setNotification(null), 4000);
                });
              }}
            />
          </label>
        </div>
      </div>

      {showForm && (
        <DisciplineForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setIsEditing(false); setFormData({ ...initialForm, category: config.categoryOptions[0] }); }}
          categoryOptions={config.categoryOptions}
          characters={characters}
          isEditing={isEditing}
          label={config.label}
        />
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--encre)' }}>{config.labelPlural} ({filteredItems.length}/{config.items.length})</h3>
          <DisciplineList
            items={filteredItems}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
        </div>

        {selectedItem && (
          <DisciplineDetails
            selectedItem={selectedItem}
            getCharacterById={getCharacterById}
            family={config.family}
          />
        )}
      </div>
    </div>
  );
}
