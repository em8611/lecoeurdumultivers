import React, { useState } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import { saveLocation, importElementFromFile, saveLocationToProject, fileManagerCapabilities } from '../../utils/fileManager.js';
import { useElementsState, useElementsActions } from '../../state/elementsStore.jsx';
import AdvancedLocationForm from './AdvancedLocationForm.jsx';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import { exportFicheLocation } from '../../utils/ficheExport.js';
import ElementRelationsEditor from '../common/ElementRelationsEditor.jsx';

function LocationManager() {
  const { locations } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    climate: '',
    description: '',
    features: '',
    inhabitants: ''
  });
  const [notification, setNotification] = useState(null);
  const [showBatchImport, setShowBatchImport] = useState(false);

  // Création par défaut pour import batch
  const createDefaultLocation = (name) => ({
    id: Date.now() + Math.random(),
    name,
    type: '',
    climate: '',
    description: '',
    features: [],
    inhabitants: []
  });

  const { handleBatchImport } = useBatchImport(
    (loc) => addElement('location', loc),
    createDefaultLocation,
    setNotification
  );

  const locationTypes = ['Ville', 'Village', 'Forêt', 'Montagne', 'Désert', 'Océan', 'Dimension', 'Planète', 'Station spatiale'];
  const climateTypes = ['Tropical', 'Tempéré', 'Froid', 'Désertique', 'Polaire', 'Neutre', 'Mystique'];

  const handleAddLocation = (locationData) => {
    const newLocation = {
      ...locationData,
      id: Date.now()
    };

    // Sauvegarde automatique du fichier
    const saveResult = saveLocation(newLocation);
    if (saveResult.success) {
      setNotification({
        type: 'success',
        message: `Lieu "${newLocation.name}" sauvegardé dans ${saveResult.fileName}`
      });
    } else {
      setNotification({
        type: 'error',
        message: `Erreur lors de la sauvegarde: ${saveResult.error}`
      });
    }

    addElement('location', newLocation);
    setFormData({ name: '', type: '', climate: '', description: '', features: '', inhabitants: '' });
    setShowForm(false);

    setTimeout(() => setNotification(null), 5000);
  };

  const handleDeleteLocation = (id) => {
    const locationToDelete = locations.find(loc => loc.id === id);
  deleteElement('location', id);
    if (selectedLocation?.id === id) {
      setSelectedLocation(null);
      setIsEditing(false);
    }

    setNotification({
      type: 'info',
      message: `Lieu "${locationToDelete?.name}" supprimé`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUpdateLocation = (updatedData) => {
    if (!selectedLocation) return;
    const id = selectedLocation.id;
    const updated = { ...updatedData, id };
    updateElement('location', id, updated);
    setSelectedLocation(updated);
    setIsEditing(false);
    setNotification({ type: 'success', message: `Lieu "${updated.name}" modifié` });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImportLocation = (event) => {
    const file = event.target.files[0];
    if (file) {
      importElementFromFile(file, (result) => {
        if (result.success && result.data.type === 'location') {
          const importedLocation = {
            ...result.data,
            id: Date.now()
          };
          addElement('location', importedLocation);
          setNotification({
            type: 'success',
            message: `Lieu "${importedLocation.name}" importé avec succès`
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
          borderRadius: 'var(--rayon-bouton)',
          color: 'white',
          backgroundColor:
            notification.type === 'success' ? '#2e7d4f' :
            notification.type === 'info' ? 'var(--coeur)' : '#a13d3d',
          boxShadow: 'var(--ombre-survol)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Gestion des Lieux</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={gotoFiches}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--fond-carte)',
              color: 'var(--encre)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer'
            }}
            title="Ouvrir le viewer des fiches"
          >
            Fiches
          </button>
          <label style={{
            padding: '8px 16px',
            backgroundColor: 'var(--fond-carte)',
            color: 'var(--encre)',
            border: '1px solid var(--trait)',
            borderRadius: 'var(--rayon-bouton)',
            cursor: 'pointer'
          }}>
            Importer
            <input
              type="file"
              accept=".json"
              onChange={handleImportLocation}
              style={{ display: 'none' }}
            />
          </label>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--or)',
              color: 'var(--sur-or)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Importer plusieurs lieux par leurs noms (une ligne = un lieu)"
          >
            Import Batch
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--coeur)',
              color: 'var(--sur-coeur)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Annuler' : '+ Nouveau Lieu'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ marginBottom: 20 }}>
          <AdvancedLocationForm
            onSubmit={handleAddLocation}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--coeur)', fontFamily: 'var(--police-affichage)' }}>Liste des lieux ({locations.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {locations.map(loc => (
              <li
                key={loc.id}
                style={{
                  cursor: 'pointer',
                  padding: 12,
                  backgroundColor: selectedLocation?.id === loc.id ? 'var(--douceur)' : 'var(--fond-carte)',
                  border: selectedLocation?.id === loc.id ? '1px solid var(--coeur)' : '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-carte)',
                  marginBottom: 8,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => { setSelectedLocation(loc); setIsEditing(false); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 16, color: 'var(--encre)' }}>{loc.name}</strong>
                    <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 2 }}>
                      {loc.type} • Climat {loc.climate}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); exportFicheLocation(loc); }}
                      style={{ padding: '6px 10px', border: '1px solid var(--trait)', background: 'var(--fond-carte)', color: 'var(--encre)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontSize: 12 }}
                      title="Exporter la fiche technique"
                    >
                      Fiche
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const result = saveLocation(loc);
                        if (result.success) {
                          setNotification({
                            type: 'success',
                            message: `Fichier ${result.fileName} téléchargé`
                          });
                          setTimeout(() => setNotification(null), 3000);
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'var(--fond-carte)',
                        color: 'var(--encre)',
                        border: '1px solid var(--trait)',
                        borderRadius: 'var(--rayon-bouton)',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Sauvegarder ce lieu"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const res = await saveLocationToProject(loc);
                          if (res.success) {
                            const hint = fileManagerCapabilities().fileSystemAPI
                              ? 'Choisissez le dossier src/data/locations de votre projet.'
                              : 'Votre navigateur ne supporte pas l\'écriture directe, téléchargement effectué.';
                            setNotification({ type: 'success', message: `Enregistré ${res.fileName}. ${hint}` });
                          } else {
                            setNotification({ type: 'error', message: `Erreur: ${res.error}` });
                          }
                        } catch (err) {
                          setNotification({ type: 'error', message: `Erreur: ${err.message}` });
                        } finally {
                          setTimeout(() => setNotification(null), 5000);
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'var(--fond-carte)',
                        color: 'var(--encre)',
                        border: '1px solid var(--trait)',
                        borderRadius: 'var(--rayon-bouton)',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Enregistrer via un sélecteur dans votre projet (ex: src/data/locations)"
                    >
                      Exporter
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLocation(loc.id);
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#a13d3d',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--rayon-bouton)',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Supprimer ce lieu"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedLocation && !isEditing && (
          <div style={{
            flex: 1,
            border: '1px solid var(--trait)',
            padding: 24,
            borderRadius: 'var(--rayon-carte)',
            backgroundColor: 'var(--fond-carte)',
            maxHeight: 'fit-content'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ marginTop: 0, marginBottom: 8, color: 'var(--coeur)', fontFamily: 'var(--police-affichage)' }}>
                Détails de {selectedLocation.name}
              </h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{ padding: '6px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
                  title="Modifier ce lieu"
                >
                  Modifier
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Type:</strong> {selectedLocation.type}
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Climat:</strong> {selectedLocation.climate}
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Description:</strong>
              <p style={{ margin: '4px 0', fontStyle: 'italic', color: 'var(--encre-douce)' }}>
                {selectedLocation.description}
              </p>
            </div>

            {selectedLocation.features.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <strong>Caractéristiques:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedLocation.features.map((feature, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--douceur)',
                        color: 'var(--encre)',
                        padding: '2px 8px',
                        borderRadius: 'var(--rayon-pilule)',
                        fontSize: 12,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLocation.inhabitants.length > 0 && (
              <div>
                <strong>Habitants:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedLocation.inhabitants.map((inhabitant, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--or)',
                        color: 'var(--sur-or)',
                        padding: '2px 8px',
                        borderRadius: 'var(--rayon-pilule)',
                        fontSize: 12,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      {inhabitant}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liaisons inter-éléments (store global) */}
            <ElementRelationsEditor
              element={{ id: selectedLocation.id, category: 'location', name: selectedLocation.name }}
            />
          </div>
        )}

        {selectedLocation && isEditing && (
          <div style={{ flex: 1 }}>
            <AdvancedLocationForm
              initialData={selectedLocation}
              onSubmit={handleUpdateLocation}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
      {/* Modal Import Batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Lieux"
        placeholder={"Citadelle éternelle\nForêt des murmures\nStation orbitale Alpha\nDôme aquatique\n..."}
        description="Entrez un nom de lieu par ligne. Chaque lieu sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />
    </div>
  );
}

export default LocationManager;
