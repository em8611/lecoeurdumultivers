import React, { useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { exportElementsToFile } from '../utils/exporter';
import { importElementsFromFiles, mergeElementInList } from '../utils/importer';
import { useBatchImport } from '../utils/useBatchImport.js';
import BatchImportModal from '../components/common/BatchImportModal.jsx';
import EquipeForm from './components/EquipeForm.jsx';
import EquipeStats from './components/EquipeStats.jsx';
import EquipeList from './components/EquipeList.jsx';
import EquipeDetails from './components/EquipeDetails.jsx';

export default function EquipesManager() {
  const { characters, equipes } = useElementsState();
  const { addElement, deleteElement, updateElement } = useElementsActions();

  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'cards'
  const [isEditing, setIsEditing] = useState(false);

  // Hook pour l'import batch
  const createDefaultEquipe = (name) => ({
    id: Date.now() + Math.random(),
    name: name,
    type: 'Équipe',
    description: '',
    members: [],
    leader: null,
    seconds: [],
    founded: '',
    headquarters: '',
    objectives: '',
    status: 'Active',
    emblem: '',
    colors: {
      primary: '#2196f3',
      secondary: '#90caf9'
    },
    tags: [],
    relations: [],
    subBranches: [],
    keyMoments: '',
    createdAt: new Date().toISOString()
  });

  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (equipe) => addElement('equipe', equipe),
    createDefaultEquipe,
    setNotification
  );

  // Formulaire nouvelle équipe (enrichi)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Équipe',
    description: '',
    members: [],
    leader: null,
    seconds: [],
    founded: '',
    headquarters: '',
    objectives: '',
    status: 'Active',
    emblem: '',
    colors: {
      primary: '#2196f3',
      secondary: '#90caf9'
    },
    tags: [],
    relations: [],
    subBranches: [],
    keyMoments: ''
  });

  // État pour la création de sous-branche
  const [showSubBranchForm, setShowSubBranchForm] = useState(false);
  const [subBranchData, setSubBranchData] = useState({
    name: '',
    members: []
  });

  const typeOptions = [
    'Équipe', 'Groupe', 'Faction', 'Organisation',
    'Guilde', 'Clan', 'Alliance', 'Famille',
    'Escouade', 'Division', 'Ordre', 'Confrérie'
  ];

  const statusOptions = ['Active', 'Dissoute', 'En formation', 'En pause', 'Secrète'];

  const handleEditEquipe = (equipe) => {
    setFormData({ ...equipe });
    setIsEditing(true);
    setShowForm(true);
    setSelectedEquipe(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Mode édition
      updateElement('equipe', formData.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setNotification({
        type: 'success',
        message: `${formData.type} "${formData.name}" mis(e) à jour avec succès`
      });
      setIsEditing(false);
    } else {
      // Mode création
      const newEquipe = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      addElement('equipe', newEquipe);
      setNotification({
        type: 'success',
        message: `${formData.type} "${formData.name}" créée avec succès`
      });
    }

    // Reset form
    setFormData({
      name: '',
      type: 'Équipe',
      description: '',
      members: [],
      leader: null,
      seconds: [],
      founded: '',
      headquarters: '',
      objectives: '',
      status: 'Active',
      emblem: '',
      colors: {
        primary: '#2196f3',
        secondary: '#90caf9'
      },
      tags: [],
      relations: [],
      subBranches: [],
      keyMoments: ''
    });
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDeleteEquipe = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) return;

    const equipeToDelete = equipes.find(eq => eq.id === id);
    deleteElement('equipe', id);

    if (selectedEquipe?.id === id) {
      setSelectedEquipe(null);
    }

    setNotification({
      type: 'info',
      message: `${equipeToDelete?.type} "${equipeToDelete?.name}" supprimée`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddMember = (characterId) => {
    if (selectedEquipe) {
      const updatedMembers = [...selectedEquipe.members, characterId];
      updateElement('equipe', selectedEquipe.id, { members: updatedMembers });
      setSelectedEquipe({ ...selectedEquipe, members: updatedMembers });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'success',
        message: `${character?.name} ajouté(e) à ${selectedEquipe.name}`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveMember = (characterId) => {
    if (selectedEquipe) {
      const updatedMembers = selectedEquipe.members.filter(id => id !== characterId);
      updateElement('equipe', selectedEquipe.id, { members: updatedMembers });
      setSelectedEquipe({ ...selectedEquipe, members: updatedMembers });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'info',
        message: `${character?.name} retiré(e) de ${selectedEquipe.name}`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSetLeader = (characterId) => {
    if (selectedEquipe) {
      updateElement('equipe', selectedEquipe.id, { leader: characterId });
      setSelectedEquipe({ ...selectedEquipe, leader: characterId });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'success',
        message: `${character?.name} est maintenant le leader de ${selectedEquipe.name}`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSetSecond = (characterId) => {
    if (selectedEquipe) {
      const currentSeconds = selectedEquipe.seconds || [];
      const updatedSeconds = [...currentSeconds, characterId];
      updateElement('equipe', selectedEquipe.id, { seconds: updatedSeconds });
      setSelectedEquipe({ ...selectedEquipe, seconds: updatedSeconds });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'success',
        message: `${character?.name} est maintenant un second de ${selectedEquipe.name}`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveSecond = (characterId) => {
    if (selectedEquipe) {
      const currentSeconds = selectedEquipe.seconds || [];
      const updatedSeconds = currentSeconds.filter(id => id !== characterId);
      updateElement('equipe', selectedEquipe.id, { seconds: updatedSeconds });
      setSelectedEquipe({ ...selectedEquipe, seconds: updatedSeconds });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'info',
        message: `${character?.name} n'est plus second de ${selectedEquipe.name}`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdateEquipe = (field, value) => {
    if (selectedEquipe) {
      updateElement('equipe', selectedEquipe.id, { [field]: value });
      setSelectedEquipe({ ...selectedEquipe, [field]: value });
    }
  };

  const handleAddSubBranch = (e) => {
    e.preventDefault();
    if (selectedEquipe && subBranchData.name.trim()) {
      const newSubBranch = {
        id: Date.now(),
        name: subBranchData.name,
        members: subBranchData.members
      };

      const updatedSubBranches = [...(selectedEquipe.subBranches || []), newSubBranch];
      updateElement('equipe', selectedEquipe.id, { subBranches: updatedSubBranches });
      setSelectedEquipe({ ...selectedEquipe, subBranches: updatedSubBranches });

      setNotification({
        type: 'success',
        message: `Sous-branche "${subBranchData.name}" créée`
      });

      setSubBranchData({ name: '', members: [] });
      setShowSubBranchForm(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteSubBranch = (subBranchId) => {
    if (selectedEquipe && window.confirm('Supprimer cette sous-branche ?')) {
      const updatedSubBranches = (selectedEquipe.subBranches || []).filter(sb => sb.id !== subBranchId);
      updateElement('equipe', selectedEquipe.id, { subBranches: updatedSubBranches });
      setSelectedEquipe({ ...selectedEquipe, subBranches: updatedSubBranches });

      setNotification({
        type: 'info',
        message: 'Sous-branche supprimée'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAddMemberToSubBranch = (subBranchId, characterId) => {
    if (selectedEquipe) {
      const updatedSubBranches = (selectedEquipe.subBranches || []).map(sb =>
        sb.id === subBranchId
          ? { ...sb, members: [...sb.members, characterId] }
          : sb
      );

      updateElement('equipe', selectedEquipe.id, { subBranches: updatedSubBranches });
      setSelectedEquipe({ ...selectedEquipe, subBranches: updatedSubBranches });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'success',
        message: `${character?.name} ajouté à la sous-branche`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveMemberFromSubBranch = (subBranchId, characterId) => {
    if (selectedEquipe) {
      const updatedSubBranches = (selectedEquipe.subBranches || []).map(sb =>
        sb.id === subBranchId
          ? { ...sb, members: sb.members.filter(id => id !== characterId) }
          : sb
      );

      updateElement('equipe', selectedEquipe.id, { subBranches: updatedSubBranches });
      setSelectedEquipe({ ...selectedEquipe, subBranches: updatedSubBranches });

      const character = characters.find(c => c.id === characterId);
      setNotification({
        type: 'info',
        message: `${character?.name} retiré de la sous-branche`
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getCharacterById = (id) => {
    return characters.find(c => c.id === id);
  };

  const availableCharacters = characters.filter(
    char => !selectedEquipe?.members.includes(char.id)
  );

  // Filtrage et recherche
  const filteredEquipes = equipes.filter(equipe => {
    const matchesSearch = equipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Tous' || equipe.type === filterType;
    return matchesSearch && matchesType;
  });

  // Statistiques
  const stats = {
    total: equipes.length,
    active: equipes.filter(e => e.status === 'Active').length,
    totalMembers: equipes.reduce((sum, e) => sum + e.members.length, 0),
    avgMembersPerTeam: equipes.length > 0
      ? (equipes.reduce((sum, e) => sum + e.members.length, 0) / equipes.length).toFixed(1)
      : 0
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
            notification.type === 'error' ? '#a13d3d' : 'var(--coeur)',
          boxShadow: 'var(--ombre-survol)',
          animation: 'slideIn 0.3s ease'
        }}>
          {notification.message}
        </div>
      )}

      {/* En-tête avec statistiques */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Gestion des Équipes et Groupes</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={gotoFiches}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--fond-carte)',
                color: 'var(--encre)',
                border: '1px solid var(--trait)',
                borderRadius: 'var(--rayon-bouton)',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              title="Ouvrir le viewer des fiches"
            >
              Fiches
            </button>
            <button
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  setIsEditing(false);
                  setFormData({
                    name: '',
                    type: 'Équipe',
                    description: '',
                    members: [],
                    leader: null,
                    seconds: [],
                    founded: '',
                    headquarters: '',
                    objectives: '',
                    status: 'Active',
                    emblem: '',
                    colors: {
                      primary: '#2196f3',
                      secondary: '#90caf9'
                    },
                    tags: [],
                    relations: [],
                    subBranches: [],
                    keyMoments: ''
                  });
                } else {
                  setShowForm(true);
                  setIsEditing(false);
                }
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--coeur)',
                color: 'var(--sur-coeur)',
                border: 'none',
                borderRadius: 'var(--rayon-bouton)',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {showForm ? 'Annuler' : '+ Nouvelle Équipe/Groupe'}
            </button>
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
              title="Importer plusieurs équipes par leurs noms"
            >
              Import Batch
            </button>
            <button
              onClick={() => exportElementsToFile(equipes, 'equipes_export.json')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--fond-carte)',
                color: 'var(--encre)',
                border: '1px solid var(--trait)',
                borderRadius: 'var(--rayon-bouton)',
                cursor: 'pointer'
              }}
              title="Exporter toutes les équipes/groupes en JSON"
            >
              Exporter
            </button>
            <label style={{
              padding: '8px 16px',
              backgroundColor: 'var(--fond-carte)',
              color: 'var(--encre)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              marginBottom: 0
            }}
              title="Importer une ou plusieurs équipes/groupes depuis un ou plusieurs fichiers JSON"
            >
              Importer
              <input
                type="file"
                accept=".json"
                multiple
                style={{ display: 'none' }}
                onChange={e => {
                  importElementsFromFiles(e.target.files, ({ success, data, fileName }) => {
                    if (success && data) {
                      // Importer les équipes dans le store
                      const importedEquipes = Array.isArray(data) ? data : [data];
                      importedEquipes.forEach(equipe => {
                        if (!equipes.find(eq => eq.id === equipe.id)) {
                          addElement('equipe', equipe);
                        }
                      });
                      setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
                    } else {
                      setNotification({ type: 'error', message: `Erreur import ${fileName}` });
                    }
                    setTimeout(() => setNotification(null), 4000);
                  });
                }}
              />
            </label>
          </div>
        </div>

        {/* Statistiques */}
        <EquipeStats stats={stats} />

        {/* Barre de recherche et filtres */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Rechercher une équipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--rayon-bouton)',
              border: '1px solid var(--trait)',
              fontSize: 14
            }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--rayon-bouton)',
              border: '1px solid var(--trait)',
              fontSize: 14,
              minWidth: 150
            }}
          >
            <option value="Tous">Tous les types</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: 4, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 12px',
                backgroundColor: viewMode === 'list' ? 'var(--coeur)' : 'var(--fond-carte)',
                color: viewMode === 'list' ? 'var(--sur-coeur)' : 'var(--encre)',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vue liste"
            >
              ☰
            </button>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                padding: '8px 12px',
                backgroundColor: viewMode === 'cards' ? 'var(--coeur)' : 'var(--fond-carte)',
                color: viewMode === 'cards' ? 'var(--sur-coeur)' : 'var(--encre)',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vue cartes"
            >
              ▦
            </button>
          </div>
        </div>
      </div>

      {/* Modal Import Batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Équipes"
        placeholder="Les Gardiens de l'Aube&#10;Équipe Alpha&#10;Les Protecteurs&#10;..."
        description="Entrez un nom d'équipe par ligne. Chaque équipe sera créée avec des valeurs par défaut que vous pourrez modifier ensuite."
      />

      {/* Formulaire enrichi */}
      {showForm && (
        <EquipeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setFormData({
              name: '',
              type: 'Équipe',
              description: '',
              members: [],
              leader: null,
              seconds: [],
              founded: '',
              headquarters: '',
              objectives: '',
              status: 'Active',
              emblem: '',
              colors: {
                primary: '#2196f3',
                secondary: '#90caf9'
              },
              tags: [],
              relations: [],
              subBranches: [],
              keyMoments: ''
            });
          }}
          typeOptions={typeOptions}
          statusOptions={statusOptions}
          isEditing={isEditing}
        />
      )}

      {/* Liste et détails */}
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Liste des équipes */}
        <div style={{ flex: 1 }}>
          <h3>
            {filterType === 'Tous' ? 'Toutes les équipes' : filterType}
            {' '}({filteredEquipes.length})
          </h3>
          <EquipeList
            equipes={filteredEquipes}
            selectedEquipe={selectedEquipe}
            viewMode={viewMode}
            onSelectEquipe={setSelectedEquipe}
            onDeleteEquipe={handleDeleteEquipe}
            onEditEquipe={handleEditEquipe}
          />
        </div>

        {/* Détails de l'équipe sélectionnée */}
        {selectedEquipe && (
          <EquipeDetails
            selectedEquipe={selectedEquipe}
            characters={characters}
            availableCharacters={availableCharacters}
            getCharacterById={getCharacterById}
            onSetLeader={handleSetLeader}
            onSetSecond={handleSetSecond}
            onRemoveSecond={handleRemoveSecond}
            onRemoveMember={handleRemoveMember}
            onAddMember={handleAddMember}
            showSubBranchForm={showSubBranchForm}
            setShowSubBranchForm={setShowSubBranchForm}
            subBranchData={subBranchData}
            setSubBranchData={setSubBranchData}
            onAddSubBranch={handleAddSubBranch}
            onDeleteSubBranch={handleDeleteSubBranch}
            onAddMemberToSubBranch={handleAddMemberToSubBranch}
            onRemoveMemberFromSubBranch={handleRemoveMemberFromSubBranch}
          />
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
