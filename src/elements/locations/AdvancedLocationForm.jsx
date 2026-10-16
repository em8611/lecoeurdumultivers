import React, { useState } from 'react';
import {
  LOCATION_TYPES,
  LOCATION_CLIMATE_TYPES,
  LOCATION_TERRAIN_TYPES,
  LOCATION_SIZE_CATEGORIES,
  LOCATION_DANGER_LEVELS,
  DEFAULT_LOCATION,
  LOCATION_VALIDATION
} from './LocationTypes.js';
import { LOCATION_GROUPS } from './constants';
import { UNIVERSE_FRANCHISE_GROUPS } from '../../univers/constants';
import { validateField, parseStringList, generateId } from '../../utils/validationUtils.js';

function AdvancedLocationForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    ...DEFAULT_LOCATION,
    ...initialData,
    id: initialData?.id || generateId()
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Informations de base' },
    { id: 'geography', label: 'Géographie' },
    { id: 'culture', label: 'Culture & Société' },
    { id: 'resources', label: 'Ressources' },
    { id: 'history', label: 'Histoire' },
    { id: 'features', label: 'Caractéristiques' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validation en temps réel
    if (LOCATION_VALIDATION[field]) {
      const fieldErrors = validateField(value, LOCATION_VALIDATION[field]);
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation complète
    const allErrors = {};
    Object.keys(LOCATION_VALIDATION).forEach(field => {
      const fieldErrors = validateField(formData[field], LOCATION_VALIDATION[field]);
      if (fieldErrors.length > 0) {
        allErrors[field] = fieldErrors;
      }
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    // Traitement des listes
    const processedData = {
      ...formData,
      inhabitants: parseStringList(formData.inhabitants),
      resources: parseStringList(formData.resources),
      threats: parseStringList(formData.threats),
      features: parseStringList(formData.features),
      connectedLocations: parseStringList(formData.connectedLocations)
    };

    onSubmit(processedData);
  };

  const renderBasicTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Univers / Franchises
        </label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={formData._franchiseDraft || ''}
            onChange={(e) => handleInputChange('_franchiseDraft', e.target.value)}
            style={{ flex: 1, padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            <option value="">Ajouter...</option>
            {UNIVERSE_FRANCHISE_GROUPS.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              const val = formData._franchiseDraft;
              if (!val) return;
              const current = Array.isArray(formData.universeFranchises) ? formData.universeFranchises : [];
              if (!current.includes(val)) {
                handleInputChange('universeFranchises', [...current, val]);
              }
              handleInputChange('_franchiseDraft', '');
            }}
            style={{ padding: '8px 12px', borderRadius: 'var(--rayon-bouton)', border: 'none', background: 'var(--coeur)', color: 'var(--sur-coeur)', cursor: 'pointer' }}
          >Ajouter</button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {(Array.isArray(formData.universeFranchises) ? formData.universeFranchises : []).map((f, idx) => (
            <span key={f + idx} style={{ background: 'var(--douceur)', border: '1px solid var(--trait)', color: 'var(--encre)', padding: '4px 8px', borderRadius: 'var(--rayon-pilule)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {f}
              <button
                type="button"
                onClick={() => {
                  const current = (Array.isArray(formData.universeFranchises) ? formData.universeFranchises : []).filter((x) => x !== f);
                  handleInputChange('universeFranchises', current);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--encre-douce)', cursor: 'pointer' }}
                aria-label={`Supprimer ${f}`}
              >✕</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Lieu prédéfini
        </label>
        <select
          value={''}
          onChange={(e) => {
            const val = e.target.value;
            if (val) handleInputChange('name', val);
          }}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          <option value="">Sélectionner...</option>
          {LOCATION_GROUPS.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Nom *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: errors.name ? '2px solid #a13d3d' : '1px solid var(--trait)'
          }}
          placeholder="Nom du lieu"
        />
        {errors.name && (
          <div style={{ color: '#a13d3d', fontSize: 12, marginTop: 2 }}>
            {errors.name.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          {LOCATION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Taille
        </label>
        <select
          value={formData.size}
          onChange={(e) => handleInputChange('size', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          {LOCATION_SIZE_CATEGORIES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Niveau de danger
        </label>
        <select
          value={formData.dangerLevel}
          onChange={(e) => handleInputChange('dangerLevel', e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            backgroundColor: getDangerColor(formData.dangerLevel)
          }}
        >
          {LOCATION_DANGER_LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Population
        </label>
        <input
          type="number"
          value={formData.population}
          onChange={(e) => handleInputChange('population', parseInt(e.target.value) || 0)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: errors.population ? '2px solid #a13d3d' : '1px solid var(--trait)'
          }}
          min="0"
        />
        {errors.population && (
          <div style={{ color: '#a13d3d', fontSize: 12, marginTop: 2 }}>
            {errors.population.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Région parent
        </label>
        <input
          type="text"
          value={formData.parentRegion}
          onChange={(e) => handleInputChange('parentRegion', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Région, royaume, continent..."
        />
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            minHeight: 80,
            resize: 'vertical'
          }}
          placeholder="Description générale du lieu"
        />
      </div>
    </div>
  );

  const renderGeographyTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Climat
        </label>
        <select
          value={formData.climate}
          onChange={(e) => handleInputChange('climate', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          {LOCATION_CLIMATE_TYPES.map(climate => (
            <option key={climate} value={climate}>{climate}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Terrain principal
        </label>
        <select
          value={formData.terrain}
          onChange={(e) => handleInputChange('terrain', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          {LOCATION_TERRAIN_TYPES.map(terrain => (
            <option key={terrain} value={terrain}>{terrain}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Altitude (mètres)
        </label>
        <input
          type="number"
          value={formData.altitude}
          onChange={(e) => handleInputChange('altitude', parseInt(e.target.value) || 0)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Altitude en mètres"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Température moyenne (°C)
        </label>
        <input
          type="number"
          value={formData.averageTemperature}
          onChange={(e) => handleInputChange('averageTemperature', parseInt(e.target.value) || 0)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Température en degrés Celsius"
        />
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Caractéristiques géographiques
        </label>
        <textarea
          value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features}
          onChange={(e) => handleInputChange('features', e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            minHeight: 60,
            resize: 'vertical'
          }}
          placeholder="Rivières, montagnes, forêts... (séparés par des virgules)"
        />
      </div>
    </div>
  );

  const renderCultureTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Culture
        </label>
        <textarea
          value={formData.culture}
          onChange={(e) => handleInputChange('culture', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 80, resize: 'vertical' }}
          placeholder="Traditions, coutumes, pratiques culturelles..."
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Gouvernement
        </label>
        <textarea
          value={formData.government}
          onChange={(e) => handleInputChange('government', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 60, resize: 'vertical' }}
          placeholder="Type de gouvernement, dirigeants, lois..."
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Religion
        </label>
        <input
          type="text"
          value={formData.religion}
          onChange={(e) => handleInputChange('religion', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Religions pratiquées"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Langues
        </label>
        <input
          type="text"
          value={Array.isArray(formData.languages) ? formData.languages.join(', ') : formData.languages}
          onChange={(e) => handleInputChange('languages', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Langues parlées (séparées par virgules)"
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Habitants
        </label>
        <textarea
          value={Array.isArray(formData.inhabitants) ? formData.inhabitants.join(', ') : formData.inhabitants}
          onChange={(e) => handleInputChange('inhabitants', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 60, resize: 'vertical' }}
          placeholder="Races, espèces, groupes... (séparés par virgules)"
        />
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Ressources naturelles
        </label>
        <textarea
          value={Array.isArray(formData.resources) ? formData.resources.join(', ') : formData.resources}
          onChange={(e) => handleInputChange('resources', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 80, resize: 'vertical' }}
          placeholder="Minerais, plantes, animaux... (séparés par virgules)"
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Économie
        </label>
        <textarea
          value={formData.economy}
          onChange={(e) => handleInputChange('economy', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 80, resize: 'vertical' }}
          placeholder="Commerce, industrie, monnaie..."
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Monnaie
        </label>
        <input
          type="text"
          value={formData.currency}
          onChange={(e) => handleInputChange('currency', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Type de monnaie utilisée"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Menaces
        </label>
        <input
          type="text"
          value={Array.isArray(formData.threats) ? formData.threats.join(', ') : formData.threats}
          onChange={(e) => handleInputChange('threats', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Dangers, ennemis... (séparés par virgules)"
        />
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Histoire
        </label>
        <textarea
          value={formData.history}
          onChange={(e) => handleInputChange('history', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 120, resize: 'vertical' }}
          placeholder="Événements historiques, origines, conflits passés..."
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Monuments et lieux remarquables
        </label>
        <textarea
          value={Array.isArray(formData.landmarks) ? formData.landmarks.join(', ') : formData.landmarks}
          onChange={(e) => handleInputChange('landmarks', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 80, resize: 'vertical' }}
          placeholder="Monuments, bâtiments importants... (séparés par virgules)"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Notes additionnelles
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', minHeight: 80, resize: 'vertical' }}
          placeholder="Notes libres, rappels, idées..."
        />
      </div>
    </div>
  );

  const renderFeaturesTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Alliés
        </label>
        <input
          type="text"
          value={Array.isArray(formData.allies) ? formData.allies.join(', ') : formData.allies}
          onChange={(e) => handleInputChange('allies', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Alliés, nations amies... (séparés par virgules)"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Ennemis
        </label>
        <input
          type="text"
          value={Array.isArray(formData.enemies) ? formData.enemies.join(', ') : formData.enemies}
          onChange={(e) => handleInputChange('enemies', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Ennemis, rivaux... (séparés par virgules)"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Lieux connectés
        </label>
        <input
          type="text"
          value={Array.isArray(formData.connections) ? formData.connections.join(', ') : formData.connections}
          onChange={(e) => handleInputChange('connections', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Lieux voisins, routes... (séparés par virgules)"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Image de carte (URL)
        </label>
        <input
          type="text"
          value={formData.mapImage}
          onChange={(e) => handleInputChange('mapImage', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="URL de l'image de carte"
        />
      </div>
      {formData.mapImage && (
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
            Aperçu de la carte
          </label>
          <img
            src={formData.mapImage}
            alt="Carte du lieu"
            style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Coordonnées (X, Y, Z)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <input
            type="number"
            value={formData.coordinates?.x || 0}
            onChange={(e) => handleInputChange('coordinates', { ...formData.coordinates, x: parseFloat(e.target.value) || 0 })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
            placeholder="X"
          />
          <input
            type="number"
            value={formData.coordinates?.y || 0}
            onChange={(e) => handleInputChange('coordinates', { ...formData.coordinates, y: parseFloat(e.target.value) || 0 })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
            placeholder="Y"
          />
          <input
            type="number"
            value={formData.coordinates?.z || 0}
            onChange={(e) => handleInputChange('coordinates', { ...formData.coordinates, z: parseFloat(e.target.value) || 0 })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
            placeholder="Z"
          />
        </div>
      </div>
    </div>
  );

  function getDangerColor(level) {
    const colors = {
      'Très sûr': '#d4edda',
      'Sûr': '#d1ecf1',
      'Modéré': '#fff3cd',
      'Dangereux': '#f8d7da',
      'Très dangereux': '#f5c6cb',
      'Mortel': '#721c24'
    };
    return colors[level] || '#fff';
  }

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
        backgroundColor: 'var(--douceur)'
      }}>
        <h3 style={{ margin: 0, color: 'var(--coeur)', fontFamily: 'var(--police-affichage)' }}>
          {initialData ? 'Modifier' : 'Créer'} un lieu
        </h3>
      </div>

      {/* Onglets */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--trait)',
        backgroundColor: 'var(--douceur)',
        overflowX: 'auto'
      }}>
        {tabs.map(tab => (
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

      {/* Contenu */}
      <div style={{
        flex: 1,
        padding: 16,
        overflowY: 'auto'
      }}>
        {activeTab === 'basic' && renderBasicTab()}
        {activeTab === 'geography' && renderGeographyTab()}
        {activeTab === 'culture' && renderCultureTab()}
        {activeTab === 'resources' && renderResourcesTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'features' && renderFeaturesTab()}
      </div>

      {/* Boutons */}
      <div style={{
        padding: 16,
        borderTop: '1px solid var(--trait)',
        backgroundColor: 'var(--douceur)',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12
      }}>
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
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </div>
  );
}

export default AdvancedLocationForm;
