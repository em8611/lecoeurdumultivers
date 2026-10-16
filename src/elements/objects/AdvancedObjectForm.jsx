import React, { useState } from 'react';
import {
  OBJECT_TYPES,
  OBJECT_RARITY_LEVELS,
  OBJECT_CONDITIONS,
  MAGIC_SCHOOLS,
  DEFAULT_OBJECT,
  OBJECT_VALIDATION
} from './ObjectTypes.js';
import { validateField, parseStringList, generateId } from '../../utils/validationUtils.js';

function AdvancedObjectForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    ...DEFAULT_OBJECT,
    ...initialData,
    id: initialData?.id || generateId()
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Informations de base' },
    { id: 'properties', label: 'Propriétés' },
    { id: 'magic', label: 'Magie & Enchantements' },
    { id: 'history', label: 'Histoire & Origine' },
    { id: 'gameplay', label: 'Mécaniques de jeu' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validation en temps réel
    if (OBJECT_VALIDATION[field]) {
      const fieldErrors = validateField(value, OBJECT_VALIDATION[field]);
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
    Object.keys(OBJECT_VALIDATION).forEach(field => {
      const fieldErrors = validateField(formData[field], OBJECT_VALIDATION[field]);
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
      materials: parseStringList(formData.materials),
      powers: parseStringList(formData.powers),
      restrictions: parseStringList(formData.restrictions),
      previousOwners: parseStringList(formData.previousOwners)
    };

    onSubmit(processedData);
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'Commun': '#6c757d',
      'Peu commun': '#28a745',
      'Rare': '#007bff',
      'Très rare': '#6f42c1',
      'Épique': '#fd7e14',
      'Légendaire': '#dc3545',
      'Artefact': '#ffc107'
    };
    return colors[rarity] || '#6c757d';
  };

  const renderBasicTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
          placeholder="Nom de l'objet"
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
          {OBJECT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Rareté
        </label>
        <select
          value={formData.rarity}
          onChange={(e) => handleInputChange('rarity', e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            backgroundColor: getRarityColor(formData.rarity) + '20',
            color: getRarityColor(formData.rarity),
            fontWeight: 'bold'
          }}
        >
          {OBJECT_RARITY_LEVELS.map(rarity => (
            <option key={rarity} value={rarity} style={{ color: getRarityColor(rarity) }}>
              {rarity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Condition
        </label>
        <select
          value={formData.condition}
          onChange={(e) => handleInputChange('condition', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        >
          {OBJECT_CONDITIONS.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Valeur estimée (pièces d'or)
        </label>
        <input
          type="number"
          value={formData.value}
          onChange={(e) => handleInputChange('value', parseInt(e.target.value) || 0)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 'var(--rayon-bouton)',
            border: errors.value ? '2px solid #a13d3d' : '1px solid var(--trait)'
          }}
          min="0"
        />
        {errors.value && (
          <div style={{ color: '#a13d3d', fontSize: 12, marginTop: 2 }}>
            {errors.value.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Poids (kg)
        </label>
        <input
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          min="0"
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
          placeholder="Description détaillée de l'objet"
        />
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
          Matériaux
        </label>
        <input
          type="text"
          value={Array.isArray(formData.materials) ? formData.materials.join(', ') : formData.materials}
          onChange={(e) => handleInputChange('materials', e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          placeholder="Acier, cuir, bois magique... (séparés par des virgules)"
        />
      </div>
    </div>
  );

  const renderMagicTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={formData.isMagical}
            onChange={(e) => handleInputChange('isMagical', e.target.checked)}
            style={{ marginRight: 8 }}
          />
          <span style={{ fontWeight: 'bold' }}>Objet magique</span>
        </label>
      </div>

      {formData.isMagical && (
        <>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              École de magie
            </label>
            <select
              value={formData.magicSchool}
              onChange={(e) => handleInputChange('magicSchool', e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
            >
              <option value="">Aucune école spécifique</option>
              {MAGIC_SCHOOLS.map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Charges magiques
            </label>
            <input
              type="number"
              value={formData.charges}
              onChange={(e) => handleInputChange('charges', parseInt(e.target.value) || 0)}
              style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
              min="0"
              placeholder="0 = charges illimitées"
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={formData.requiresAttunement}
                onChange={(e) => handleInputChange('requiresAttunement', e.target.checked)}
                style={{ marginRight: 8 }}
              />
              <span style={{ fontWeight: 'bold' }}>Nécessite un lien magique</span>
            </label>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Pouvoirs magiques
            </label>
            <textarea
              value={Array.isArray(formData.powers) ? formData.powers.join(', ') : formData.powers}
              onChange={(e) => handleInputChange('powers', e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 'var(--rayon-bouton)',
                border: '1px solid var(--trait)',
                minHeight: 60,
                resize: 'vertical'
              }}
              placeholder="Liste des pouvoirs et effets magiques (séparés par des virgules)"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              Restrictions d'usage
            </label>
            <textarea
              value={Array.isArray(formData.restrictions) ? formData.restrictions.join(', ') : formData.restrictions}
              onChange={(e) => handleInputChange('restrictions', e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 'var(--rayon-bouton)',
                border: '1px solid var(--trait)',
                minHeight: 60,
                resize: 'vertical'
              }}
              placeholder="Limitations, conditions d'usage, malédictions... (séparés par des virgules)"
            />
          </div>
        </>
      )}
    </div>
  );

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
          {initialData ? 'Modifier' : 'Créer'} un objet
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
        {activeTab === 'magic' && renderMagicTab()}
        {/* Autres onglets à implémenter selon les besoins */}
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

export default AdvancedObjectForm;
