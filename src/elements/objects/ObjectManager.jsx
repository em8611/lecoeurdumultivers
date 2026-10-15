import React, { useState } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import { saveObject, importElementFromFile } from '../../utils/fileManager.js';
import { useElementsState, useElementsActions } from '../../state/elementsStore.jsx';
import { exportElement } from '../common/exportElement.js';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import { exportFicheObject } from '../../utils/ficheExport.js';
import AdvancedObjectForm from './AdvancedObjectForm.jsx';
import ElementRelationsEditor from '../common/ElementRelationsEditor.jsx';

function ObjectManager() {
  const { objects } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();
  const [selectedObject, setSelectedObject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    rarity: '',
    description: '',
    powers: '',
    origin: '',
    currentLocation: '',
    image: '',
    creationDate: '',
    owner: '',
    previousOwners: '',
    estimatedValue: '',
    state: '',
    materials: '',
    dimensions: '',
    symbolism: '',
    tags: '',
    restrictions: '',
    sideEffects: '',
    notableAppearances: ''
  });
  const [notification, setNotification] = useState(null);

  const objectTypes = ['Artefact', 'Arme', 'Bijou', 'Livre', 'Outil', 'Relique', 'Cristal', 'Potion', 'Technologie'];
  const rarityLevels = ['Commun', 'Peu commun', 'Rare', 'Épique', 'Légendaire', 'Mythique', 'Unique'];

  const getRarityColor = (rarity) => {
    const colors = {
      'Commun': '#6c757d',
      'Peu commun': '#28a745',
      'Rare': '#007bff',
      'Épique': '#6f42c1',
      'Légendaire': '#fd7e14',
      'Mythique': '#dc3545',
      'Unique': '#ffc107'
    };
    return colors[rarity] || '#6c757d';
  };

  const handleAddObject = () => {
    const newObject = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      rarity: formData.rarity,
      description: formData.description,
      powers: formData.powers.split(',').map(p => p.trim()).filter(p => p),
      origin: formData.origin,
      currentLocation: formData.currentLocation,
      image: formData.image,
      creationDate: formData.creationDate,
      owner: formData.owner,
      previousOwners: formData.previousOwners.split(',').map(o => o.trim()).filter(o => o),
      estimatedValue: formData.estimatedValue,
      state: formData.state,
      materials: formData.materials,
      dimensions: formData.dimensions,
      symbolism: formData.symbolism,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      restrictions: formData.restrictions,
      sideEffects: formData.sideEffects,
      notableAppearances: formData.notableAppearances
    };
    // Sauvegarde automatique du fichier
    const saveResult = saveObject(newObject);
    if (saveResult.success) {
      setNotification({
        type: 'success',
        message: `Objet "${newObject.name}" sauvegardé dans ${saveResult.fileName}`
      });
    }
    addElement('object', newObject);
    setFormData({
      name: '', type: '', rarity: '', description: '', powers: '', origin: '', currentLocation: '', image: '', creationDate: '', owner: '', previousOwners: '', estimatedValue: '', state: '', materials: '', dimensions: '', symbolism: '', tags: '', restrictions: '', sideEffects: '', notableAppearances: ''
    });
    setShowForm(false);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDeleteObject = (id) => {
    const objectToDelete = objects.find(obj => obj.id === id);
    deleteElement('object', id);
    if (selectedObject?.id === id) {
      setSelectedObject(null);
      setIsEditing(false);
    }

    setNotification({
      type: 'info',
      message: `Objet "${objectToDelete?.name}" supprimé`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const mapLegacyToAdvanced = (obj) => {
    return {
      ...obj,
      value: obj.estimatedValue != null ? parseInt(obj.estimatedValue) || 0 : obj.value,
      condition: obj.state ?? obj.condition,
      dateCreated: obj.creationDate ?? obj.dateCreated,
      currentOwner: obj.owner ?? obj.currentOwner
    };
  };

  const handleUpdateObject = (updated) => {
    if (!selectedObject) return;
    const id = selectedObject.id;

    const compat = {
      estimatedValue: updated.value != null ? String(updated.value) : selectedObject.estimatedValue,
      state: updated.condition ?? selectedObject.state,
      creationDate: updated.dateCreated ?? selectedObject.creationDate,
      owner: updated.currentOwner ?? selectedObject.owner
    };

    const merged = { ...selectedObject, ...updated, ...compat, id };
    updateElement('object', id, merged);
    setSelectedObject(merged);
    setIsEditing(false);
    setNotification({ type: 'success', message: `Objet "${merged.name}" modifié` });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImportObject = (event) => {
    const file = event.target.files[0];
    if (file) {
      importElementFromFile(file, (result) => {
        if (result.success && result.data.type === 'object') {
          const importedObject = {
            ...result.data,
            id: Date.now()
          };
          addElement('object', importedObject);
          setNotification({
            type: 'success',
            message: `Objet "${importedObject.name}" importé avec succès`
          });
        } else {
          setNotification({
            type: 'error',
            message: 'Erreur lors de l\'importation: fichier invalide'
          });
        }
        setTimeout(() => setNotification(null), 5000);
      });
    }
    event.target.value = '';
  };

  // Import batch par noms (remplace ancien import lot multiple fichiers)
  const createDefaultObject = (name) => ({
    id: Date.now() + Math.random(),
    name,
    type: '',
    rarity: '',
    description: '',
    powers: [],
    origin: '',
    currentLocation: '',
    image: '',
    creationDate: '',
    owner: '',
    previousOwners: [],
    estimatedValue: '',
    state: '',
    materials: '',
    dimensions: '',
    symbolism: '',
    tags: [],
    restrictions: '',
    sideEffects: '',
    notableAppearances: ''
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (obj) => addElement('object', obj),
    createDefaultObject,
    setNotification
  );

  const handleExportObject = async (object) => {
    const res = await exportElement({ ...object, type: 'object', module: 'objects' }, { module: 'objects' });
    if (res.success) {
      setNotification({ type: 'success', message: `Exporté ${res.fileName}. ${res.hint}` });
    } else {
      setNotification({ type: 'error', message: `Erreur export: ${res.error}` });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div style={{ padding: 16 }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: 6,
          color: 'white',
          backgroundColor:
            notification.type === 'success' ? '#28a745' :
            notification.type === 'error' ? '#dc3545' : '#17a2b8',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>💎 Gestion des Objets</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={gotoFiches}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3949ab',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
            title="Ouvrir le viewer des fiches"
          >
            📄 Fiches
          </button>
          <label style={{
            padding: '8px 16px',
            backgroundColor: '#fd7e14',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}>
            📁 Importer
            <input
              type="file"
              accept=".json"
              onChange={handleImportObject}
              style={{ display: 'none' }}
            />
          </label>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Importer plusieurs objets par leurs noms (une ligne = un objet)"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Annuler' : '+ Nouvel Objet'}
          </button>
          {selectedObject && (
            <button
              onClick={() => handleExportObject(selectedObject)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
              title="Exporter en JSON dans le projet"
            >
              📤 Exporter
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div style={{
          border: '1px solid #ddd',
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#f8f9fa',
          marginBottom: 20
        }}>
          <h3>Créer un nouvel objet</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input type="text" placeholder="Nom de l'objet" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
              <option value="">Sélectionner un type</option>
              {objectTypes.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
            <select value={formData.rarity} onChange={e => setFormData({...formData, rarity: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
              <option value="">Sélectionner une rareté</option>
              {rarityLevels.map(rarity => (<option key={rarity} value={rarity}>{rarity}</option>))}
            </select>
            <input type="text" placeholder="Pouvoirs (séparés par virgules)" value={formData.powers} onChange={e => setFormData({...formData, powers: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Origine/Créateur" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Localisation actuelle" value={formData.currentLocation} onChange={e => setFormData({...formData, currentLocation: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Image (URL)" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="date" placeholder="Date de création/découverte" value={formData.creationDate} onChange={e => setFormData({...formData, creationDate: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Propriétaire actuel" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Propriétaires précédents (séparés par virgules)" value={formData.previousOwners} onChange={e => setFormData({...formData, previousOwners: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Valeur estimée" value={formData.estimatedValue} onChange={e => setFormData({...formData, estimatedValue: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="État (neuf, usé, etc.)" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Matériaux/Composition" value={formData.materials} onChange={e => setFormData({...formData, materials: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Dimensions/Poids" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Symbolisme/Légende associée" value={formData.symbolism} onChange={e => setFormData({...formData, symbolism: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Tags/Catégories (séparés par virgules)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Restrictions d’utilisation" value={formData.restrictions} onChange={e => setFormData({...formData, restrictions: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Effets secondaires/Dangers" value={formData.sideEffects} onChange={e => setFormData({...formData, sideEffects: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="text" placeholder="Apparitions notables (histoire, quêtes...)" value={formData.notableAppearances} onChange={e => setFormData({...formData, notableAppearances: e.target.value})} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <textarea placeholder="Description de l'objet" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: 8, marginTop: 12, borderRadius: 4, border: '1px solid #ccc', minHeight: 60, resize: 'vertical' }} />
          <button onClick={handleAddObject} disabled={!formData.name} style={{ marginTop: 12, padding: '8px 16px', backgroundColor: formData.name ? '#6f42c1' : '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: formData.name ? 'pointer' : 'not-allowed' }}>
            Créer l'objet
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Liste des objets ({objects.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {objects.map(obj => (
              <li
                key={obj.id}
                style={{
                  cursor: 'pointer',
                  padding: 12,
                  backgroundColor: selectedObject?.id === obj.id ? '#f3e5f5' : '#f8f9fa',
                  border: selectedObject?.id === obj.id ? '2px solid #6f42c1' : '1px solid #dee2e6',
                  borderRadius: 6,
                  marginBottom: 8,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => { setSelectedObject(obj); setIsEditing(false); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ fontSize: 16 }}>{obj.name}</strong>
                      <span
                        style={{
                          backgroundColor: getRarityColor(obj.rarity),
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: 8,
                          fontSize: 10,
                          fontWeight: 'bold'
                        }}
                      >
                        {obj.rarity}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      {obj.type} • {obj.currentLocation}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); exportFicheObject(obj); }}
                      style={{ padding: '4px 8px', border: '1px solid #ddd', background: '#fff', borderRadius: 3, cursor: 'pointer', fontSize: 12 }}
                      title="Exporter la fiche technique"
                    >
                      📄
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleExportObject(obj); }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        borderRadius: 3,
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Exporter cet objet"
                    >
                      📤
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteObject(obj.id);
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: 3,
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Supprimer cet objet"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedObject && !isEditing && (
          <div style={{
            flex: 1,
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 8,
            backgroundColor: '#ffffff',
            maxHeight: 'fit-content'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ margin: 0, color: '#6f42c1' }}>
                  💎 {selectedObject.name}
                </h3>
                <span
                  style={{
                    backgroundColor: getRarityColor(selectedObject.rarity),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}
                >
                  {selectedObject.rarity}
                </span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                style={{ padding: '6px 10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                title="Modifier cet objet"
              >
                ✏️ Modifier
              </button>
            </div>
            {selectedObject.image && (
              <div style={{ marginBottom: 12 }}>
                <img src={selectedObject.image} alt={selectedObject.name} style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8, border: '1px solid #eee' }} />
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <strong>Type:</strong> {selectedObject.type}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Origine/Créateur:</strong> {selectedObject.origin}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Localisation actuelle:</strong> {selectedObject.currentLocation}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Date de création/découverte:</strong> {selectedObject.creationDate}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Propriétaire actuel:</strong> {selectedObject.owner}
            </div>
            {selectedObject.previousOwners && selectedObject.previousOwners.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <strong>Propriétaires précédents:</strong> {Array.isArray(selectedObject.previousOwners) ? selectedObject.previousOwners.join(', ') : selectedObject.previousOwners}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <strong>Valeur estimée:</strong> {selectedObject.estimatedValue}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>État:</strong> {selectedObject.state}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Matériaux/Composition:</strong> {selectedObject.materials}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Dimensions/Poids:</strong> {selectedObject.dimensions}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Symbolisme/Légende associée:</strong> {selectedObject.symbolism}
            </div>
            {selectedObject.tags && selectedObject.tags.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <strong>Tags/Catégories:</strong> {Array.isArray(selectedObject.tags) ? selectedObject.tags.join(', ') : selectedObject.tags}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <strong>Restrictions d’utilisation:</strong> {selectedObject.restrictions}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Effets secondaires/Dangers:</strong> {selectedObject.sideEffects}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Apparitions notables:</strong> {selectedObject.notableAppearances}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Description:</strong>
              <p style={{ margin: '4px 0', fontStyle: 'italic', color: '#555' }}>
                {selectedObject.description}
              </p>
            </div>
            {selectedObject.powers && selectedObject.powers.length > 0 && (
              <div>
                <strong>Pouvoirs:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedObject.powers.map((power, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#6f42c1',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      ⚡ {power}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liaisons inter-éléments (store global) */}
            <ElementRelationsEditor
              element={{ id: selectedObject.id, category: 'object', name: selectedObject.name }}
            />
          </div>
        )}

        {selectedObject && isEditing && (
          <div style={{ flex: 1 }}>
            <AdvancedObjectForm
              initialData={mapLegacyToAdvanced(selectedObject)}
              onSubmit={handleUpdateObject}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
      {/* Modal import batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Objets"
        placeholder={"Épée solaire\nAnneau ancien\nCristal d'énergie\nGrimoire perdu\n..."}
        description="Entrez un nom d'objet par ligne. Chaque objet sera créé avec des valeurs par défaut que vous pourrez ensuite modifier."
      />
    </div>
  );
}

export default ObjectManager;
