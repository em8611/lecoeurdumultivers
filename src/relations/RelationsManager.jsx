import React, { useMemo, useState } from 'react';
import { gotoFiches } from '../utils/nav.js';
import { importElementsFromFiles } from '../utils/importer.js';
import { exportElementsToFile } from '../utils/exporter.js';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';
import { useBatchImport } from '../utils/useBatchImport';
import BatchImportModal from '../components/common/BatchImportModal';
import {
  RELATION_TYPES,
  RELATION_STATUSES,
  DEFAULT_RELATION,
  isFamilialType,
  isProfessionalType,
  isFriendlyType,
  getTypeColor,
  getIntensityColor,
  getIntensityLabel
} from './RelationTypes.js';
import {
  FamilialRelationFields,
  ProfessionalRelationFields,
  CompanionRelationFields,
  CreatorOwnerRelationFields,
  SpecialRelationFields,
  FriendlyRelationFields,
  AllyRelationFields,
  LoveRelationFields,
  RivalryRelationFields,
  AntagonistRelationFields,
  NeutralRelationFields,
  ViolentRelationFields,
  IdolFanaticRelationFields
} from './RelationFormFields.jsx';
import RelationDetailsPanel from './RelationDetailsPanel.jsx';

export default function RelationsManager() {
  const { characters, relations } = useElementsState();
  const { updateElement, addElement, updateElement: updateAny, deleteElement } = useElementsActions();
  // Import/Export
  const handleExport = async () => {
    try {
      await exportElementsToFile(relations, 'relations_export.json');
      setNotification({ type: 'success', message: 'Relations exportées avec succès.' });
    } catch (e) {
      setNotification({ type: 'error', message: "Erreur lors de l'export : " + e.message });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImport = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    try {
      importElementsFromFiles(files, ({ success, data, fileName }) => {
        if (!success || !data) {
          setNotification({ type: 'error', message: `Erreur import ${fileName}` });
          setTimeout(() => setNotification(null), 4000);
          return;
        }
        const payload = data && data.data ? data.data : data;
        const items = Array.isArray(payload) ? payload : [payload];
        items.forEach(item => {
          if (!item || typeof item !== 'object') return;
          if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 10000);
          const exists = relations.some(r => r.id === item.id);
          if (exists) {
            updateAny('relation', item.id, item);
          } else {
            addElement('relation', item);
          }
          if (syncCharacters) syncCharactersRelationships(item, 'add');
        });
        setNotification({ type: 'success', message: `Importé depuis ${fileName}` });
        setTimeout(() => setNotification(null), 4000);
      });
    } finally {
      event.target.value = '';
    }
  };
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Création d'une relation par défaut
  const createDefaultRelation = (name) => ({
    ...DEFAULT_RELATION,
    id: Date.now() + Math.random(),
    fromId: characters.length > 0 ? characters[0].id : null,
    toId: characters.length > 1 ? characters[1].id : null,
    description: name || '',
    history: [],
    createdAt: new Date().toISOString()
  });

  const {
    showBatchImport,
    setShowBatchImport,
    handleBatchImport
  } = useBatchImport(
    (relation) => {
      addElement('relation', relation);
      if (syncCharacters) syncCharactersRelationships(relation, 'add');
    },
    createDefaultRelation,
    setNotification
  );

  // Filtres
  const [filterType, setFilterType] = useState('Tous');
  const [filterCharacterId, setFilterCharacterId] = useState('Tous');
  const [filterMinIntensity, setFilterMinIntensity] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Formulaire
  const [formData, setFormData] = useState({ ...DEFAULT_RELATION, history: [] });
  const [newHistoryText, setNewHistoryText] = useState('');
  const [newHistoryType, setNewHistoryType] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [syncCharacters, setSyncCharacters] = useState(true);
  // Édition d'une entrée d'historique
  const [editingHistoryId, setEditingHistoryId] = useState(null);
  const [editingHistory, setEditingHistory] = useState({ text: '', historyType: '', historyStatus: '' });

  const characterById = (id) => {
    if (id === undefined || id === null) return undefined;
    const needle = id.toString();
    return characters.find(c => (c.id ?? '').toString() === needle);
  };

  // Ajouter / retirer tag du formulaire
  const handleAddTag = () => {
    const tag = currentTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
    setCurrentTag('');
  };
  const handleRemoveTag = (t) => setFormData({ ...formData, tags: formData.tags.filter(x => x !== t) });
  // Historique: ajouter / retirer
  const handleAddHistory = () => {
    const text = (newHistoryText || '').trim();
    const hType = (newHistoryType || '').trim();
    if (!text && !hType) return;
    const position = (formData.history?.length || 0) + 1;
    const entry = { id: Date.now(), position, text, historyType: hType, historyStatus: formData.status };
    setFormData({ ...formData, history: [...(formData.history || []), entry] });
    setNewHistoryText('');
    setNewHistoryType('');
  };
  const handleRemoveHistory = (id) => {
    const next = (formData.history || []).filter(e => e.id !== id).map((e, i) => ({ ...e, position: i + 1 }));
    setFormData({ ...formData, history: next });
  };

  const handleMoveHistory = (id, direction) => {
    const hist = [...(formData.history || [])];
    const index = hist.findIndex(e => e.id === id);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      [hist[index - 1], hist[index]] = [hist[index], hist[index - 1]];
    } else if (direction === 'down' && index < hist.length - 1) {
      [hist[index + 1], hist[index]] = [hist[index], hist[index + 1]];
    } else {
      return;
    }
    const reindexed = hist.map((e, i) => ({ ...e, position: i + 1 }));
    setFormData({ ...formData, history: reindexed });
  };

  const handleStartEditHistory = (entry) => {
    setEditingHistoryId(entry.id);
    setEditingHistory({
      text: entry.text || '',
      historyType: entry.historyType || '',
      historyStatus: entry.historyStatus || formData.status || RELATION_STATUSES[0]
    });
  };

  const handleCancelEditHistory = () => {
    setEditingHistoryId(null);
    setEditingHistory({ text: '', historyType: '', historyStatus: '' });
  };

  const handleSaveEditHistory = () => {
    if (!editingHistoryId) return;
    const updated = (formData.history || []).map(e =>
      e.id === editingHistoryId
        ? { ...e, text: editingHistory.text, historyType: editingHistory.historyType, historyStatus: editingHistory.historyStatus }
        : e
    );
    setFormData({ ...formData, history: updated });
    handleCancelEditHistory();
  };

  // Vérifier doublon
  const relationExists = ({ fromId, toId, type, direction }) => {
    return relations.some(r => {
      if (direction === 'Bilatérale' || r.direction === 'Bilatérale') {
        // paire non ordonnée
        const samePair = (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId);
        return samePair && r.type === type;
      }
      // unilatérale stricte
      return r.fromId === fromId && r.toId === toId && r.type === type && r.direction === 'Unilatérale';
    });
  };

  // Synchroniser un résumé de relation dans les personnages (champ relationships[])
  const syncCharactersRelationships = (rel, action) => {
    const from = characterById(rel.fromId);
    const to = characterById(rel.toId);
    if (!from || !to) return;

    const labelFrom = `${rel.type} → ${to.name}`;
    const labelTo = rel.direction === 'Bilatérale' ? `${rel.type} ↔ ${from.name}` : `${rel.type} ← ${from.name}`;

    if (action === 'add') {
      // FROM
      const fromRelationships = Array.isArray(from.relationships) ? from.relationships : [];
      const newFrom = { relationships: fromRelationships.includes(labelFrom) ? fromRelationships : [...fromRelationships, labelFrom] };
      updateElement('character', from.id, newFrom);
      // TO
      const toRelationships = Array.isArray(to.relationships) ? to.relationships : [];
      const newTo = { relationships: toRelationships.includes(labelTo) ? toRelationships : [...toRelationships, labelTo] };
      updateElement('character', to.id, newTo);
    } else if (action === 'remove') {
      const fromRelationships = Array.isArray(from.relationships) ? from.relationships : [];
      updateElement('character', from.id, { relationships: fromRelationships.filter(x => x !== labelFrom) });
      const toRelationships = Array.isArray(to.relationships) ? to.relationships : [];
      updateElement('character', to.id, { relationships: toRelationships.filter(x => x !== labelTo) });
    }
  };

  // Commencer édition d'une relation existante
  const handleEditRelation = (rel) => {
    setFormData({ ...rel });
    setIsEditing(true);
    setShowForm(true);
    setSelectedRelation(null);
  };

  // Création ou modification de relation
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fromId, toId } = formData;
    if (!fromId || !toId) {
      setNotification({ type: 'error', message: 'Veuillez sélectionner deux personnages.' });
      return;
    }
    if (fromId === toId) {
      setNotification({ type: 'error', message: 'Impossible de créer une relation avec soi-même.' });
      return;
    }

    // Skip duplicate check si on édite la même relation
    if (!isEditing && relationExists(formData)) {
      setNotification({ type: 'error', message: 'Cette relation existe déjà.' });
      return;
    }

    // Validation minimale pour les relations professionnelles enrichies
    if (isProfessionalType(formData.type)) {
      if (formData.type === 'Mentor' && !formData.mentorshipFocus) {
        setNotification({ type: 'error', message: 'Mentorat: focus du mentorat requis.' });
        return;
      }
      if (formData.type === 'Protégé·e' && !formData.developmentGoals) {
        setNotification({ type: 'error', message: 'Protégé·e: objectifs de développement requis.' });
        return;
      }
      if (formData.type === 'Collègue' && (!formData.department || !formData.project)) {
        setNotification({ type: 'error', message: 'Collègue: département et projet recommandés (veuillez les renseigner).' });
        return;
      }
      if ((formData.type === 'Professeur' || formData.type === 'Formateur') && !formData.teachingSubject) {
        setNotification({ type: 'error', message: 'Professeur: matière enseignée requise.' });
        return;
      }
      if ((formData.type === 'Élève' || formData.type === 'Étudiant' || formData.type === 'Apprenti') && !formData.learningProgress) {
        setNotification({ type: 'error', message: 'Élève: progression d\'apprentissage requise.' });
        return;
      }
    }

    if (isEditing) {
      // Mise à jour
      const oldRel = relations.find(r => r.id === formData.id);
      updateAny('relation', formData.id, { ...formData, updatedAt: new Date().toISOString() });
      setSelectedRelation({ ...formData, updatedAt: new Date().toISOString() });
      setShowForm(false);
      setIsEditing(false);
      setNotification({ type: 'success', message: 'Relation modifiée avec succès.' });

      // Re-sync si nécessaire
      if (syncCharacters && oldRel) {
        syncCharactersRelationships(oldRel, 'remove');
        syncCharactersRelationships(formData, 'add');
      }
    } else {
      // Création
      const newRel = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      addElement('relation', newRel);
      setSelectedRelation(newRel);
      setShowForm(false);
      setNotification({ type: 'success', message: 'Relation créée avec succès.' });
      if (syncCharacters) syncCharactersRelationships(newRel, 'add');
    }

    // reset form
    setFormData({ ...DEFAULT_RELATION, history: [] });
    setNewHistoryText('');
    setNewHistoryType('');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteRelation = (id) => {
    const rel = relations.find(r => r.id === id);
    deleteElement('relation', id);
    if (selectedRelation?.id === id) setSelectedRelation(null);
    if (syncCharacters && rel) syncCharactersRelationships(rel, 'remove');
    setNotification({ type: 'info', message: 'Relation supprimée.' });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredRelations = useMemo(() => {
    let list = relations;
    if (filterType !== 'Tous') list = list.filter(r => r.type === filterType);
    if (filterCharacterId !== 'Tous') list = list.filter(r => r.fromId === filterCharacterId || r.toId === filterCharacterId);
    if (filterMinIntensity > 1) list = list.filter(r => r.intensity >= filterMinIntensity);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(r => {
        const from = characterById(r.fromId)?.name?.toLowerCase() || '';
        const to = characterById(r.toId)?.name?.toLowerCase() || '';
        const tags = (r.tags || []).join(' ').toLowerCase();
        return from.includes(q) || to.includes(q) || tags.includes(q);
      });
    }
    return list;
  }, [relations, filterType, filterCharacterId, filterMinIntensity, searchText, characters]);

  return (
    <div style={{ padding: 16 }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1000,
          padding: '12px 20px', borderRadius: 6, color: 'white',
          backgroundColor: notification.type === 'success' ? '#28a745' : notification.type === 'error' ? '#dc3545' : '#17a2b8',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>🔗 Gestion des Relations</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={gotoFiches}
            style={{ padding: '8px 12px', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Ouvrir le viewer des fiches techniques"
          >
            📄 Fiches
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555' }}>
            <input
              type="checkbox"
              checked={syncCharacters}
              onChange={(e) => setSyncCharacters(e.target.checked)}
            />
            Synchroniser avec les personnages
          </label>
          {/* Boutons Import/Export */}
          <button
            onClick={handleExport}
            style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Exporter les relations"
          >⬇️ Exporter</button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ padding: '8px 12px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            title="Créer plusieurs relations en lot"
          >📦 Import Batch</button>
          <label style={{ display: 'inline-block', margin: 0 }} title="Importer des relations">
            <input
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
            <span style={{ padding: '8px 12px', backgroundColor: '#17a2b8', color: 'white', borderRadius: 4, cursor: 'pointer', userSelect: 'none' }}>⬆️ Importer</span>
          </label>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setIsEditing(false);
                setFormData({ ...DEFAULT_RELATION, history: [] });
              } else {
                setShowForm(true);
                setIsEditing(false);
                setFormData({ ...DEFAULT_RELATION, history: [] });
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            {showForm ? 'Annuler' : '+ Nouvelle Relation'}
          </button>
        </div>
      </div>

      {/* Formulaire */}
      {showForm && (
  <div style={{ backgroundColor: '#f8f9fa', padding: 24, borderRadius: 14, marginBottom: 24, border: '1px solid #dee2e6', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
          <h3 style={{ marginTop: 0 }}>{isEditing ? 'Modifier la relation' : 'Créer une relation'}</h3>
          <form onSubmit={handleSubmit} className="relations-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>De</label>
                <select
                  value={formData.fromId}
                  onChange={(e) => setFormData({ ...formData, fromId: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                >
                  <option value="">Sélectionner...</option>
                  {characters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Vers</label>
                <select
                  value={formData.toId}
                  onChange={(e) => setFormData({ ...formData, toId: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                >
                  <option value="">Sélectionner...</option>
                  {characters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                >
                  {RELATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Direction</label>
                <select
                  value={formData.direction}
                  onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                >
                  <option value="Bilatérale">Bilatérale</option>
                  <option value="Unilatérale">Unilatérale</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Intensité</label>
                <input
                  type="range" min={1} max={5}
                  value={formData.intensity}
                  onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{getIntensityLabel(formData.intensity)}</div>
              </div>
            </div>

            {/* Champs conditionnels selon le type de relation */}
            {isFamilialType(formData.type) && <FamilialRelationFields formData={formData} setFormData={setFormData} />}
            {isProfessionalType(formData.type) && <ProfessionalRelationFields formData={formData} setFormData={setFormData} />}
            {isFriendlyType(formData.type) && <FriendlyRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Allié·e' && <AllyRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Amour' && <LoveRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Rivalité' && <RivalryRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Antagoniste' && <AntagonistRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Compagnon' && <CompanionRelationFields formData={formData} setFormData={setFormData} />}
            {(formData.type === 'Créateur' || formData.type === 'Propriétaire') && <CreatorOwnerRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Spécial' && <SpecialRelationFields formData={formData} setFormData={setFormData} />}
            {formData.type === 'Neutre' && <NeutralRelationFields formData={formData} setFormData={setFormData} />}
            {(formData.type === 'Idole' || formData.type === 'Fanatique') && <IdolFanaticRelationFields formData={formData} setFormData={setFormData} />}
            {(formData.type === 'Abuseur' || formData.type === 'Victime' || formData.type === 'Meurtrier') && <ViolentRelationFields formData={formData} setFormData={setFormData} />}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                >
                  {RELATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Tags</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text" value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                    placeholder="Ajouter un tag"
                  />
                  <button type="button" onClick={handleAddTag} style={{ padding: '8px 12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Ajouter</button>
                </div>
                {formData.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                    {formData.tags.map(t => (
                      <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', backgroundColor: '#e7f3ff', border: '1px solid #90caf9', borderRadius: 12, fontSize: 12 }}>
                        {t}
                        <button type="button" onClick={() => handleRemoveTag(t)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Champ Description supprimé (redondant avec le panneau de détails et l'historique) */}

            {/* Historique commun */}
            <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#f7f7f9', border: '1px solid #e2e3e5', borderRadius: 10 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Historique de la relation</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: 14, alignItems: 'end', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Événement / Note</div>
                  <input
                    type="text"
                    value={newHistoryText}
                    onChange={(e) => setNewHistoryText(e.target.value)}
                    placeholder="Ex: Rencontre tendue, Promotion, Trêve, Dispute, Sauvetage..."
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Type associé</div>
                  <select
                    value={newHistoryType}
                    onChange={(e) => setNewHistoryType(e.target.value)}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
                  >
                    <option value="">(Optionnel)</option>
                    {RELATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <button type="button" onClick={handleAddHistory} style={{ padding: '8px 12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Ajouter</button>
                </div>
              </div>
              {(formData.history || []).length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {formData.history.map((entry, idx) => (
                    <li key={entry.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 10 }}>
                      <span style={{ minWidth: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', borderRadius: 999, fontSize: 12, color: '#374151' }}>
                        {(entry.position ?? (idx + 1))}
                      </span>

                      {editingHistoryId === entry.id ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 140px auto', gap: 8, alignItems: 'center', width: '100%' }}>
                          <input
                            type="text"
                            value={editingHistory.text}
                            onChange={(e) => setEditingHistory({ ...editingHistory, text: e.target.value })}
                            placeholder="Événement / Note"
                            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da', fontSize: 13 }}
                          />
                          <select
                            value={editingHistory.historyType}
                            onChange={(e) => setEditingHistory({ ...editingHistory, historyType: e.target.value })}
                            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da', fontSize: 13 }}
                          >
                            <option value="">(Type optionnel)</option>
                            {RELATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <select
                            value={editingHistory.historyStatus}
                            onChange={(e) => setEditingHistory({ ...editingHistory, historyStatus: e.target.value })}
                            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da', fontSize: 13 }}
                          >
                            {RELATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            <button type="button" onClick={handleSaveEditHistory} style={{ padding: '6px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Enregistrer</button>
                            <button type="button" onClick={handleCancelEditHistory} style={{ padding: '6px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Annuler</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {entry.historyType && (
                            <span style={{ padding: '2px 8px', backgroundColor: getTypeColor(entry.historyType), color: '#fff', borderRadius: 12, fontSize: 11 }}>
                              {entry.historyType}
                            </span>
                          )}
                          {entry.historyStatus && (
                            <span style={{ padding: '2px 8px', backgroundColor: '#343a40', color: '#fff', borderRadius: 12, fontSize: 11 }}>
                              {entry.historyStatus}
                            </span>
                          )}
                          <span style={{ flex: 1 }}>{entry.text || ''}</span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button type="button" onClick={() => handleStartEditHistory(entry)} title="Modifier" style={{ padding: '4px 8px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>✏️</button>
                            <button type="button" onClick={() => handleMoveHistory(entry.id, 'up')} disabled={idx === 0} title="Monter" style={{ padding: '4px 6px', backgroundColor: '#e5e7eb', color: '#111', border: 'none', borderRadius: 4, cursor: idx === 0 ? 'not-allowed' : 'pointer', fontSize: 12 }}>▲</button>
                            <button type="button" onClick={() => handleMoveHistory(entry.id, 'down')} disabled={idx === (formData.history.length - 1)} title="Descendre" style={{ padding: '4px 6px', backgroundColor: '#e5e7eb', color: '#111', border: 'none', borderRadius: 4, cursor: idx === (formData.history.length - 1) ? 'not-allowed' : 'pointer', fontSize: 12 }}>▼</button>
                            <button type="button" onClick={() => handleRemoveHistory(entry.id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Supprimer</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                {isEditing ? 'Mettre à jour' : 'Créer'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setIsEditing(false); setFormData({ ...DEFAULT_RELATION, history: [] }); }} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Filtres */}
      {!showForm && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 12, marginBottom: 16, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <input
            type="text" placeholder="Recherche (noms, tags)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}>
            <option value="Tous">Tous les types</option>
            {RELATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterCharacterId} onChange={(e) => setFilterCharacterId(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}>
            <option value="Tous">Tous les personnages</option>
            {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>Intensité min.</label>
            <input type="range" min={1} max={5} value={filterMinIntensity} onChange={(e) => setFilterMinIntensity(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>
      )}

      {/* Liste + détails */}
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Relations ({filteredRelations.length}/{relations.length})</h3>
          {filteredRelations.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune relation. Créez-en une pour commencer.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredRelations.map(rel => {
                const from = characterById(rel.fromId);
                const to = characterById(rel.toId);
                return (
                  <li key={rel.id}
                    onClick={() => setSelectedRelation(rel)}
                    style={{ cursor: 'pointer', padding: 12, backgroundColor: selectedRelation?.id === rel.id ? '#e3f2fd' : '#fff', border: selectedRelation?.id === rel.id ? '2px solid #2196f3' : '1px solid #dee2e6', borderRadius: 8, marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ padding: '2px 10px', backgroundColor: getTypeColor(rel.type), color: 'white', borderRadius: 12, fontSize: 12 }}>{rel.type}</span>
                          <strong style={{ fontSize: 15 }}>
                            {from?.name} {rel.direction === 'Bilatérale' ? '↔' : '→'} {to?.name}
                          </strong>
                          <span style={{ padding: '2px 8px', backgroundColor: getIntensityColor(rel.intensity), color: 'white', borderRadius: 6, fontSize: 12 }}>
                            {getIntensityLabel(rel.intensity)}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                          {rel.status}{rel.since ? ` • depuis ${new Date(rel.since).toLocaleDateString('fr-FR')}` : ''}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditRelation(rel); }}
                          style={{ padding: '4px 10px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteRelation(rel.id); }}
                          style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                          title="Supprimer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Détails */}
        {selectedRelation && (
          <RelationDetailsPanel
            relation={selectedRelation}
            characterById={characterById}
          />
        )}
      </div>

      {/* Modal d'import batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Relations"
        placeholder="Relation amicale\nRelation familiale\nAlliance stratégique\nRivalité intense\n..."
        description="Entrez les descriptions des relations à créer, une par ligne"
      />
    </div>
  );
}
