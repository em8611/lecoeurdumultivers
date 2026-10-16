import React, { useState, useEffect, useCallback } from 'react';
import {
  DEFAULT_CHARACTER,
  CHARACTER_VALIDATION
} from './CharacterTypes.js';
import { validateField, parseStringList, generateId } from '../../utils/validationUtils.js';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';
import {
  BasicSection,
  PhysicalSection,
  PersonalitySection,
  HistoireSection,
  AbilitiesSection,
  EquipmentSection,
  RelationshipsSection,
  EquipeSection,
  ApparitionSection,
  AnimationSection,
  RepliquesSection,
  StatsSection,
  AutreSection,
  // Sections spécifiques par type
  ProtecteurDirectSection,
  ProtecteurIndirectSection,
  AllieSection,
  CompagnonSection,
  NeutreSection,
  AntagonisteSection,
  GardienSection,
  EnfantSection,
  GuideSection,
  AliasSection,
  ProtagonisteSection
} from './FormSections/index.js';

function AdvancedCharacterForm({ onSubmit, onCancel, initialData = null, onPrev, onNext, hasPrev = false, hasNext = false, navCurrentIndex = 0, navTotalCount = 0 }) {
  const [formData, setFormData] = useState({
    ...DEFAULT_CHARACTER,
    ...initialData,
    id: initialData?.id || generateId()
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');
  const [quickSaved, setQuickSaved] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [dirtySinceLastSave, setDirtySinceLastSave] = useState(false);

  // Calculer la progression du formulaire
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.character);

  // Configuration des onglets par type de personnage
  const tabsByType = {
    'Protagoniste': ['basic', 'specifique', 'abilities', 'repliques', 'animation', 'stats'],
    'Protecteur direct': ['basic', 'specifique', 'physical', 'personality', 'histoire', 'abilities', 'equipment', 'relationships', 'equipe', 'apparition', 'animation', 'repliques', 'stats', 'autre'],
    'Protectrice indirecte': ['basic', 'specifique', 'physical', 'personality', 'histoire', 'abilities', 'equipment', 'relationships', 'equipe', 'apparition', 'animation', 'repliques', 'stats', 'autre'],
    'Protecteur indirect': ['basic', 'specifique', 'physical', 'personality', 'histoire', 'abilities', 'equipment', 'relationships', 'equipe', 'apparition', 'animation', 'repliques', 'stats', 'autre'],
    'Antagoniste': ['basic', 'specifique', 'physical', 'abilities', 'apparition'],
    'Allié': ['basic', 'specifique', 'physical', 'abilities', 'apparition'],
    'Compagnon': ['basic', 'specifique', 'abilities', 'apparition', 'autre'],
    'Enfant': ['basic', 'specifique', 'physical', 'personality', 'abilities','relationships', 'apparition', 'animation', 'repliques', 'autre'], // Pas d'équipement ni stats combat
    'Gardien': ['basic', 'specifique', 'apparition'],
    'Gardienne': ['basic', 'specifique','apparition'],
    'Guide': ['basic', 'specifique', 'physical', 'personality','abilities', 'relationships', 'apparition', 'repliques', 'autre'], // Plus spirituel, moins d'équipement
    'Neutre': ['basic', 'specifique', 'apparition'],
    'Alias': ['basic', 'specifique', 'abilities', 'repliques', 'animation', 'stats']
  };

  const allTabs = [
    { id: 'basic', label: 'Informations de base' },
    { id: 'specifique', label: 'Spécifique' },
    { id: 'physical', label: 'Apparence' },
    { id: 'personality', label: 'Personnalité' },
    { id: 'histoire', label: 'Histoire' },
    { id: 'abilities', label: 'Capacités' },
    { id: 'equipment', label: 'Équipement' },
    { id: 'relationships', label: 'Relations' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'apparition', label: 'Apparition' },
    { id: 'animation', label: 'Animation' },
    { id: 'repliques', label: 'Répliques' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'autre', label: 'Autre' },
  ];

  // Filtrer les onglets selon le type de personnage
  const availableTabs = allTabs.filter(tab => {
    const allowedTabs = tabsByType[formData.type] || allTabs.map(t => t.id);
    return allowedTabs.includes(tab.id);
  });

  // Mettre à jour le formulaire quand le personnage sélectionné change (navigation)
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...DEFAULT_CHARACTER,
        ...initialData,
        id: initialData.id || generateId()
      });
      setErrors({});
      setDirtySinceLastSave(false);
    }
  }, [initialData?.id]);

  const handleInputChange = (field, value) => {
    // Mise à jour complète possible via sections spécifiques
    if (field === '_full') {
      setFormData(value);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setDirtySinceLastSave(true);

    // Si on change le type, vérifier que l'onglet actif est toujours disponible
    if (field === 'type') {
      const newAllowedTabs = tabsByType[value] || allTabs.map(t => t.id);
      if (!newAllowedTabs.includes(activeTab)) {
        setActiveTab('basic'); // Retourner à l'onglet de base si l'onglet actuel n'est plus disponible
      }
    }

    // Validation en temps réel
    if (CHARACTER_VALIDATION[field]) {
      const fieldErrors = validateField(value, CHARACTER_VALIDATION[field]);
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors
      }));
    }
  };

  const handleStatChange = (stat, value) => {
    const numValue = Math.max(1, Math.min(20, parseInt(value) || 10));
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: numValue
      }
    }));
  };

  const performValidationAndSubmit = (rawData, options = {}) => {
    // Validation complète
    const allErrors = {};
    Object.keys(CHARACTER_VALIDATION).forEach(field => {
      const fieldErrors = validateField(rawData[field], CHARACTER_VALIDATION[field]);
      if (fieldErrors.length > 0) {
        allErrors[field] = fieldErrors;
      }
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return false;
    }
    // Traitement des listes
    const processedData = {
      ...rawData,
      goals: parseStringList(rawData.goals),
      fears: parseStringList(rawData.fears),
      abilities: parseStringList(rawData.abilities),
      skills: parseStringList(rawData.skills),
      equipment: parseStringList(rawData.equipment),
      relationships: parseStringList(rawData.relationships),
      languages: parseStringList(rawData.languages),
      storyArcs: parseStringList(rawData.storyArcs),
      milestones: parseStringList(rawData.milestones),
      appearances: parseStringList(rawData.appearances),
      teamAffiliations: parseStringList(rawData.teamAffiliations),
      // associatedLocations est une liste d'objets { location, context }, on la garde telle quelle
      gestures: parseStringList(rawData.gestures),
      mannerisms: parseStringList(rawData.mannerisms),
      quotes: parseStringList(rawData.quotes)
    };
    onSubmit(processedData, options);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performValidationAndSubmit(formData);

  };

  // Sauvegarde rapide (sans fermer le formulaire)
  const handleQuickSave = useCallback(() => {
    const ok = performValidationAndSubmit(formData, { quick: true });
    if (ok) {
      setQuickSaved(true);
      setTimeout(() => setQuickSaved(false), 2000);
      setLastSaveTime(new Date());
      setDirtySinceLastSave(false);
    }
  }, [formData]);

  // Raccourcis clavier: Ctrl+S et Alt+Flèches pour naviguer
  useEffect(() => {
    const onKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if ((isMac && e.metaKey && e.key === 's') || (!isMac && e.ctrlKey && e.key === 's')) {
        e.preventDefault();
        handleQuickSave();
      }
      // Navigation Alt+Left / Alt+Right
      if (e.altKey && e.key === 'ArrowLeft' && hasPrev && typeof onPrev === 'function') {
        e.preventDefault();
        onPrev();
      }
      if (e.altKey && e.key === 'ArrowRight' && hasNext && typeof onNext === 'function') {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleQuickSave, hasPrev, hasNext, onPrev, onNext]);

  // Autosave toutes les 60s si des modifications non sauvegardées
  useEffect(() => {
    const interval = setInterval(() => {
      if (dirtySinceLastSave) {
        handleQuickSave();
      }
    }, 60000); // 60s
    return () => clearInterval(interval);
  }, [dirtySinceLastSave, handleQuickSave]);

  const formatTime = (date) => {
    if (!date) return 'Jamais';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div style={{
      border: '1px solid var(--trait)',
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* En-tête */}
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--trait)',
        backgroundColor: 'var(--douceur)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        <h3 style={{ margin: 0, color: 'var(--coeur)', fontFamily: 'var(--police-affichage)' }}>
          {initialData ? 'Modifier' : 'Créer'} un personnage
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--encre-douce)', marginRight: 8 }}>
            {navCurrentIndex > 0 && navTotalCount > 0 ? `${navCurrentIndex}/${navTotalCount}` : ''}
          </span>
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            title="Précédent (Alt+←)"
            style={{
              padding: '6px 10px',
              backgroundColor: 'var(--fond-carte)',
              color: hasPrev ? 'var(--encre)' : 'var(--encre-douce)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: hasPrev ? 'pointer' : 'not-allowed'
            }}
          >
            ← Précédent
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            title="Suivant (Alt+→)"
            style={{
              padding: '6px 10px',
              backgroundColor: hasNext ? 'var(--coeur)' : 'var(--douceur)',
              color: hasNext ? 'var(--sur-coeur)' : 'var(--encre-douce)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: hasNext ? 'pointer' : 'not-allowed'
            }}
          >
            Suivant →
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--trait)',
        backgroundColor: 'var(--douceur)',
        overflowX: 'auto'
      }}>
        {availableTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: activeTab === tab.id ? 'var(--coeur)' : 'var(--encre-douce)',
              borderBottom: activeTab === tab.id ? '2px solid var(--coeur)' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 12,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Barre de progression */}
      <div style={{ padding: '0 16px', paddingTop: 16 }}>
        <FormProgressBar
          progress={progress}
          filledCount={filledCount}
          totalCount={totalCount}
          showDetails={true}
          position="top"
        />
      </div>

      {/* Contenu */}
      <div style={{
        flex: 1,
        padding: 16,
        overflowY: 'auto'
      }}>
        {activeTab === 'basic' && <BasicSection formData={formData} errors={errors} onInputChange={handleInputChange} />}
        {activeTab === 'specifique' && (
          <>
            {formData.type === 'Protagoniste' &&
              <ProtagonisteSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Protecteur direct' &&
              <ProtecteurDirectSection formData={formData} onInputChange={handleInputChange} />}
            {(formData.type === 'Protectrice indirecte' || formData.type === 'Protecteur indirect') &&
              <ProtecteurIndirectSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Antagoniste' &&
              <AntagonisteSection formData={formData} onInputChange={handleInputChange} />}
            {(formData.type === 'Gardien' || formData.type === 'Gardienne') &&
              <GardienSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Enfant' &&
              <EnfantSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Guide' &&
              <GuideSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Allié' &&
              <AllieSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Compagnon' &&
              <CompagnonSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Neutre' &&
              <NeutreSection formData={formData} onInputChange={handleInputChange} />}
            {formData.type === 'Alias' &&
              <AliasSection formData={formData} onInputChange={handleInputChange} />}
          </>
        )}
        {activeTab === 'physical' && <PhysicalSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'personality' && <PersonalitySection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'histoire' && <HistoireSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'abilities' && <AbilitiesSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'equipment' && <EquipmentSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'relationships' && <RelationshipsSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'equipe' && <EquipeSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'apparition' && <ApparitionSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'animation' && <AnimationSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'repliques' && <RepliquesSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'autre' && <AutreSection formData={formData} onInputChange={handleInputChange} />}
        {activeTab === 'stats' && <StatsSection formData={formData} onStatChange={handleStatChange} onInputChange={handleInputChange} />}
      </div>

      {/* Toast local de sauvegarde rapide */}
      {quickSaved && (
        <div style={{
          position: 'absolute',
          bottom: 70,
          left: 20,
          background: '#2e7d4f',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: 'var(--rayon-bouton)',
          boxShadow: 'var(--ombre-survol)',
          fontSize: 12,
          zIndex: 5
        }}>
          Brouillon sauvegardé
        </div>
      )}

      {/* Boutons */}
      <div style={{
        padding: 16,
        borderTop: '1px solid var(--trait)',
        backgroundColor: 'var(--douceur)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="button"
            onClick={handleQuickSave}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--or)',
              color: 'var(--sur-or)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer'
            }}
            title="Sauvegarde rapide (Ctrl+S)"
          >
            Sauvegarder (Ctrl+S)
          </button>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: 11,
            color: 'var(--encre-douce)'
          }}>
            <span>Dernière sauvegarde: {formatTime(lastSaveTime)}</span>
            {dirtySinceLastSave && <span style={{ color: '#a13d3d' }}>Modifications non sauvegardées…</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--fond-carte)',
            color: 'var(--encre)',
            border: '1px solid var(--trait)',
            borderRadius: 'var(--rayon-bouton)',
            cursor: 'pointer'
          }}
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--coeur)',
            color: 'var(--sur-coeur)',
            border: 'none',
            borderRadius: 'var(--rayon-bouton)',
            cursor: 'pointer'
          }}
        >
          {initialData ? 'Modifier & Fermer' : 'Créer & Fermer'}
        </button>
      </div>
    </div>
  );
}

export default AdvancedCharacterForm;
