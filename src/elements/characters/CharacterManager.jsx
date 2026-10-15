import React, { useState, useEffect } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import { saveCharacter, importElementFromFile, saveCharacterToProject, fileManagerCapabilities } from '../../utils/fileManager.js';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import AccordionList from '../../components/common/AccordionList.jsx';
import { exportFicheCharacter } from '../../utils/ficheExport.js';
import { FicheCharacterButton } from '../../components/common';
import AdvancedCharacterForm from './AdvancedCharacterForm.jsx';
import { useElementsState, useElementsActions } from '../../state/elementsStore.jsx';
import { DEFAULT_CHARACTER, CHARACTER_TYPE_COLORS } from './CharacterTypes.js';
import { CHARACTER_ENERGY_COLORS } from './constants';
import ElementRelationsEditor from '../common/ElementRelationsEditor.jsx';

function CharacterManager({ preselectedCharacterId }) {
  // Utilisation du store global au lieu d'un état local
  const { characters } = useElementsState();
  const { addElement, updateElement, deleteElement } = useElementsActions();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  // Le formulaire avancé gère désormais son propre état
  const [notification, setNotification] = useState(null);
  const [showList, setShowList] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Hook pour l'import batch
  const createDefaultCharacter = (name) => ({
    ...DEFAULT_CHARACTER,
    id: Date.now() + Math.random(),
    name: name,
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (character) => addElement('character', character),
    createDefaultCharacter,
    setNotification
  );

  // Filtrer les personnages selon la recherche
  const filteredCharacters = characters.filter(char => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      char.name?.toLowerCase().includes(query) ||
      char.origin?.toLowerCase().includes(query) ||
      char.type?.toLowerCase().includes(query) ||
      char.race?.toLowerCase().includes(query) ||
      char.backstory?.toLowerCase().includes(query)
    );
  });

  // Recalibrer la page quand la recherche ou la taille change
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredCharacters.length);
  const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

  // Effet pour sélectionner automatiquement un personnage si fourni via props
  useEffect(() => {
    if (preselectedCharacterId) {
      const character = characters.find(c => c.id === preselectedCharacterId);
      if (character) {
        setSelectedCharacter(character);
        // Ouvrir directement le formulaire d'édition
        setShowForm(true);
      }
    }
  }, [preselectedCharacterId, characters]);

  // Réinitialiser l'image active quand on change de personnage sélectionné
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedCharacter?.id]);

  const handleSubmitAdvanced = (newCharacter, options = {}) => {
    // Si le personnage a un ID existant dans la liste, on le met à jour
    const existingCharacter = characters.find(c => c.id === newCharacter.id);

    if (existingCharacter) {
      updateElement('character', newCharacter.id, newCharacter);
    } else {
      addElement('character', newCharacter);
    }

    // Si sauvegarde rapide, ne pas déclencher le téléchargement JSON
    if (options.quick) {
      setNotification({
        type: 'success',
        message: `Brouillon de "${newCharacter.name}" enregistré`
      });
      setTimeout(() => setNotification(null), 3000);
      return; // ne pas fermer le formulaire, pas de download
    }

    // Fermer le formulaire sans téléchargement
    setNotification({
      type: 'success',
      message: `Personnage "${newCharacter.name}" ${existingCharacter ? 'mis à jour' : 'créé'}`
    });

    setShowForm(false);
    setSelectedCharacter(null);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEditCharacter = () => {
    setShowForm(true);
  };

  const handleDeleteCharacter = (id) => {
    const characterToDelete = characters.find(char => char.id === id);
  deleteElement('character', id);
    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }

    setNotification({
      type: 'info',
      message: `Personnage "${characterToDelete?.name}" supprimé (le fichier reste dans vos téléchargements)`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleImportCharacter = (event) => {
    const file = event.target.files[0];
    if (file) {
      importElementFromFile(file, (result) => {
        if (result.success) {
          // Vérifie si c'est un personnage (nouveau format avec type='character' OU ancien format avec type dans CHARACTER_TYPES)
          const isCharacter = result.data.type === 'character' ||
                             (result.data.name && result.data.race); // Vérifie les champs de base d'un personnage

          if (isCharacter) {
            const importedCharacter = {
              ...DEFAULT_CHARACTER,
              ...result.data,
              type: result.data.type === 'character' ? DEFAULT_CHARACTER.type : result.data.type, // Garde le type de personnage
              id: Date.now() // Nouveau ID pour éviter les conflits
            };
            addElement('character', importedCharacter);
            setNotification({
              type: 'success',
              message: `Personnage "${importedCharacter.name}" importé avec succès`
            });
          } else {
            setNotification({
              type: 'error',
              message: 'Erreur lors de l\'importation: fichier invalide ou non compatible'
            });
          }
        } else {
          setNotification({
            type: 'error',
            message: 'Erreur lors de l\'importation: fichier invalide ou non compatible'
          });
        }
        setTimeout(() => setNotification(null), 5000);
      });
    }
    // Reset l'input file
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
        <h2>🎭 Gestion des Personnages</h2>
        <div style={{ display: 'flex', gap: 10 }}>
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
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}>
            📁 Importer
            <input
              type="file"
              accept=".json"
              onChange={handleImportCharacter}
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
            title="Importer plusieurs personnages par leurs noms"
          >
            📝 Import Batch
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {showForm ? 'Annuler' : '+ Nouveau Personnage'}
          </button>
        </div>
      </div>

      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Personnages"
        placeholder="Alice Dubois&#10;Bob Martin&#10;Claire Lefèvre&#10;..."
        description="Entrez un nom de personnage par ligne. Chaque personnage sera créé avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      {showForm && (
        <div style={{ marginBottom: 20 }}>
          <AdvancedCharacterForm
            initialData={selectedCharacter}
            onSubmit={handleSubmitAdvanced}
            onCancel={() => {
              setShowForm(false);
              setSelectedCharacter(null);
            }}
            {
              ...(() => {
                const list = filteredCharacters;
                const idx = selectedCharacter ? list.findIndex(c => c.id === selectedCharacter.id) : -1;
                const hasPrev = idx > 0;
                const hasNext = idx >= 0 && idx < list.length - 1;
                return {
                  onPrev: hasPrev ? () => setSelectedCharacter(list[idx - 1]) : undefined,
                  onNext: hasNext ? () => setSelectedCharacter(list[idx + 1]) : undefined,
                  hasPrev,
                  hasNext,
                  navCurrentIndex: idx >= 0 ? idx + 1 : 0,
                  navTotalCount: list.length,
                };
              })()
            }
          />
        </div>
      )}

      {!showForm && (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3>Liste des personnages ({characters.length})</h3>
              <button
                onClick={() => setShowList(!showList)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: showList ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                {showList ? '👁️ Masquer la liste' : '👁️ Afficher la liste'}
              </button>
            </div>
            {showList && (
              <>
                <input
                  type="text"
                  placeholder="🔍 Rechercher par nom, origine, type, race ou histoire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    marginBottom: 12,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
                <AccordionList
                  items={paginatedCharacters}
              selectedItem={selectedCharacter}
              onSelect={setSelectedCharacter}
              onEdit={() => setShowForm(true)}
              onDelete={handleDeleteCharacter}
              renderHeader={(char) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 16 }}>{char.name}</strong>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      {char.age} ans • {char.origin}
                    </div>
                  </div>
                  {char.type && (
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 'bold',
                      backgroundColor: CHARACTER_TYPE_COLORS[char.type] || '#808080',
                      color: '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>
                      {char.type}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); exportFicheCharacter(char); }}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 12 }}
                    title="Exporter la fiche technique"
                  >
                    📄 Fiche
                  </button>
                </div>
              )}
              renderContent={(char) => (
                <div style={{ fontSize: 14, color: '#555' }}>
                  {char.type && (
                    <div style={{ marginBottom: 8 }}>
                      <strong>Type :</strong> {char.type}
                    </div>
                  )}
                  {char.race && (
                    <div style={{ marginBottom: 8 }}>
                      <strong>Race :</strong> {char.race}
                    </div>
                  )}
                  {char.backstory && (
                    <div style={{ marginBottom: 8 }}>
                      <strong>Histoire :</strong>
                      <p style={{ margin: '4px 0 0 0', lineHeight: 1.5, maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {char.backstory.substring(0, 150)}{char.backstory.length > 150 ? '...' : ''}
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const result = saveCharacter(char);
                        if (result.success) {
                          setNotification({
                            type: 'success',
                            message: `Fichier ${result.fileName} téléchargé`
                          });
                          setTimeout(() => setNotification(null), 3000);
                        }
                      }}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Sauvegarder ce personnage"
                    >
                      💾 Sauvegarder
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const res = await saveCharacterToProject(char);
                          if (res.success) {
                            setNotification({
                              type: 'success',
                              message: `Enregistré ${res.fileName}`
                            });
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
                        padding: '6px 12px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                      title="Enregistrer dans le projet"
                    >
                      📂 Projet
                    </button>
                  </div>
                </div>
              )}
              emptyMessage={searchQuery ? "Aucun personnage ne correspond à votre recherche." : "Aucun personnage créé. Cliquez sur le bouton ci-dessus pour commencer."}
            />
                {/* Pagination */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: '#555' }}>
                    Affichage {filteredCharacters.length === 0 ? 0 : startIndex + 1}-{endIndex} sur {filteredCharacters.length}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => setPage(1)}
                      disabled={page <= 1}
                      style={{ padding: '6px 10px', border: '1px solid #ddd', background: page <= 1 ? '#f1f3f5' : '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer', borderRadius: 4 }}
                      title="Première page"
                    >
                      «
                    </button>
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      style={{ padding: '6px 10px', border: '1px solid #ddd', background: page <= 1 ? '#f1f3f5' : '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer', borderRadius: 4 }}
                      title="Page précédente"
                    >
                      ←
                    </button>
                    <span style={{ padding: '6px 10px', fontSize: 12 }}>
                      Page {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      style={{ padding: '6px 10px', border: '1px solid #ddd', background: page >= totalPages ? '#f1f3f5' : '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer', borderRadius: 4 }}
                      title="Page suivante"
                    >
                      →
                    </button>
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={page >= totalPages}
                      style={{ padding: '6px 10px', border: '1px solid #ddd', background: page >= totalPages ? '#f1f3f5' : '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer', borderRadius: 4 }}
                      title="Dernière page"
                    >
                      »
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        {selectedCharacter && (
          <div style={{
            flex: 1,
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 8,
            backgroundColor: '#ffffff',
            maxHeight: 'fit-content'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ marginTop: 0, color: '#2196f3' }}>
                📋 Détails de {selectedCharacter.name}
              </h3>
              <button
                onClick={handleEditCharacter}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                ✏️ Modifier
              </button>
            </div>

            {/* Images du personnage */}
            {Array.isArray(selectedCharacter.images) && selectedCharacter.images.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                {/* Image principale */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <div style={{
                    width: 320,
                    height: 320,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '3px solid #495057',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    <img
                      src={selectedCharacter.images[Math.min(selectedImageIndex, selectedCharacter.images.length - 1)] || selectedCharacter.images[0]}
                      alt={selectedCharacter.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.replaceWith(Object.assign(document.createElement('div'), {
                          style: 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f8f9fa;color:#6c757d;font-size:12px;',
                          textContent: '❌ Image indisponible'
                        }));
                      }}
                    />
                  </div>
                </div>
                {/* Vignettes si plusieurs images */}
                {selectedCharacter.images.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {selectedCharacter.images.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        title={`Image ${idx + 1}`}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 8,
                          overflow: 'hidden',
                          padding: 0,
                          border: idx === selectedImageIndex ? '2px solid #2196f3' : '1px solid #dee2e6',
                          cursor: 'pointer',
                          background: '#fff'
                        }}
                      >
                        <img src={url} alt={`mini-${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {selectedCharacter.type && (
                <span style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: 16,
                  fontSize: 13,
                  fontWeight: 'bold',
                  backgroundColor: CHARACTER_TYPE_COLORS[selectedCharacter.type] || '#808080',
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {selectedCharacter.type}
                </span>
              )}
              {selectedCharacter.energy && (
                <span style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: 16,
                  fontSize: 13,
                  fontWeight: 'bold',
                  backgroundColor: CHARACTER_ENERGY_COLORS[selectedCharacter.energy] || '#6c757d',
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                  ⚡ {selectedCharacter.energy}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Âge:</strong> {selectedCharacter.age} ans
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Origine:</strong> {selectedCharacter.origin}
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Description:</strong>
              <p style={{ margin: '4px 0', fontStyle: 'italic', color: '#555' }}>
                {selectedCharacter.description}
              </p>
            </div>

            {selectedCharacter.abilities.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <strong>Capacités:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedCharacter.abilities.map((ability, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedCharacter.relationships.length > 0 && (
              <div>
                <strong>Relations:</strong>
                <div style={{ marginTop: 4 }}>
                  {selectedCharacter.relationships.map((relation, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#ffc107',
                        color: '#212529',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        marginRight: 6,
                        marginBottom: 4
                      }}
                    >
                      {relation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liaisons inter-éléments (store global) */}
            <ElementRelationsEditor
              element={{ id: selectedCharacter.id, category: 'character', name: selectedCharacter.name }}
            />
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default CharacterManager;
