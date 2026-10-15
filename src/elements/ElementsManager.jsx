import React, { useState } from 'react';
import CharacterManager from './characters/CharacterManager.jsx';
import LocationManager from './locations/LocationManager.jsx';
import ObjectManager from './objects/ObjectManager.jsx';
import BestiaireManager from './bestiaire/BestiaireManager.jsx';
import NourritureManager from './nourriture/NourritureManager.jsx';
import MateriauxManager from './materiaux/MateriauxManager.jsx';
import ElementStatistics from '../components/common/ElementStatistics.jsx';
import ElementExporter from '../components/common/ElementExporter.jsx';
import ElementFormFactory from '../components/common/ElementFormFactory.jsx';
import { useElementsState, useElementsActions } from '../state/elementsStore.jsx';

function ElementsManager() {
  const [activeManager, setActiveManager] = useState('overview');
  const [createInitialCategory, setCreateInitialCategory] = useState(null);
  const [notification, setNotification] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const storeElements = useElementsState();
  const { importBulk } = useElementsActions();
  const [importing, setImporting] = useState(false);
  let fileInputRef;

  const managers = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'create', label: 'Créer', icon: '➕' },
    { id: 'statistics', label: 'Statistiques', icon: '📈' },
    { id: 'export', label: 'Export', icon: '📤' },
    { id: 'characters', label: 'Personnages', icon: '🎭' },
    { id: 'locations', label: 'Lieux', icon: '🗺️' },
    { id: 'objects', label: 'Objets', icon: '💎' },
    { id: 'bestiaire', label: 'Bestiaire', icon: '🐉' },
    { id: 'nourriture', label: 'Nourriture', icon: '🍖' },
    { id: 'materiaux', label: 'Matériaux', icon: '⚒️' }
  ];

  const categories = [
    {
      id: 'characters',
      icon: '🎭',
      label: 'Personnages',
      color: '#2196f3',
      bgColor: '#e3f2fd',
      description: 'Créez et gérez vos personnages avec leurs caractéristiques, capacités et relations.'
    },
    {
      id: 'locations',
      icon: '🗺️',
      label: 'Lieux',
      color: '#17a2b8',
      bgColor: '#e0f7fa',
      description: 'Définissez les environnements, climats et caractéristiques de vos mondes.'
    },
    {
      id: 'objects',
      icon: '💎',
      label: 'Objets',
      color: '#6f42c1',
      bgColor: '#f3e5f5',
      description: 'Cataloguez artefacts, armes et objets magiques avec leurs pouvoirs uniques.'
    },
    {
      id: 'bestiaire',
      icon: '🐉',
      label: 'Bestiaire',
      color: '#28a745',
      bgColor: '#d4edda',
      description: 'Répertoriez créatures, monstres et animaux fantastiques de votre univers.'
    },
    {
      id: 'nourriture',
      icon: '🍖',
      label: 'Nourriture',
      color: '#fd7e14',
      bgColor: '#ffe5cc',
      description: 'Décrivez cuisines, ingrédients et recettes de vos différentes cultures.'
    },
    {
      id: 'materiaux',
      icon: '⚒️',
      label: 'Matériaux',
      color: '#6c757d',
      bgColor: '#e8e9ea',
      description: 'Cataloguez ressources, minerais et matériaux utilisés dans votre monde.'
    }
  ];

  const renderOverview = () => (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>📊 Vue d'ensemble des éléments</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              try {
                const payload = {
                  timestamp: new Date().toISOString(),
                  characters: storeElements.characters || [],
                  locations: storeElements.locations || [],
                  objects: storeElements.objects || [],
                  bestiaires: storeElements.bestiaires || [],
                  nourritures: storeElements.nourritures || [],
                  materiauxs: storeElements.materiauxs || []
                };
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const stamp = new Date().toISOString().replace(/[:.]/g, '-');
                a.href = url;
                a.download = `elements-export-${stamp}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setNotification({ type: 'success', message: 'Export JSON téléchargé' });
              } catch (e) {
                setNotification({ type: 'error', message: `Erreur export: ${e.message}` });
              }
            }}
            style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >📤 Export JSON</button>
          <input
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            ref={(ref) => { fileInputRef = ref; }}
            onChange={async (e) => {
              try {
                setImporting(true);
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const text = await file.text();
                const data = JSON.parse(text);
                const payload = {
                  characters: Array.isArray(data.characters) ? data.characters : [],
                  locations: Array.isArray(data.locations) ? data.locations : [],
                  objects: Array.isArray(data.objects) ? data.objects : [],
                  bestiaires: Array.isArray(data.bestiaires) ? data.bestiaires : [],
                  nourritures: Array.isArray(data.nourritures) ? data.nourritures : [],
                  materiauxs: Array.isArray(data.materiauxs) ? data.materiauxs : []
                };
                const counts = {
                  characters: payload.characters.length,
                  locations: payload.locations.length,
                  objects: payload.objects.length,
                  bestiaires: payload.bestiaires.length,
                  nourritures: payload.nourritures.length,
                  materiauxs: payload.materiauxs.length
                };
                setImportPreview({ fileName: file.name, payload, counts });
                e.target.value = '';
              } catch (err) {
                setNotification({ type: 'error', message: `Erreur import: ${err.message}` });
              } finally {
                setImporting(false);
              }
            }}
          />
          <button
            onClick={() => {
              if (fileInputRef) fileInputRef.click();
            }}
            disabled={importing}
            style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >📥 Importer un JSON</button>
        </div>
      </div>
      {importPreview && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: 520, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
            <h3 style={{ marginTop: 0 }}>Aperçu import: {importPreview.fileName}</h3>
            <p style={{ color: '#555' }}>Confirmez l'import. Comptes par catégorie:</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li>🎭 Personnages: <strong>{importPreview.counts.characters}</strong></li>
              <li>🗺️ Lieux: <strong>{importPreview.counts.locations}</strong></li>
              <li>💎 Objets: <strong>{importPreview.counts.objects}</strong></li>
              <li>🐉 Bestiaire: <strong>{importPreview.counts.bestiaires}</strong></li>
              <li>🍖 Nourriture: <strong>{importPreview.counts.nourritures}</strong></li>
              <li>⚒️ Matériaux: <strong>{importPreview.counts.materiauxs}</strong></li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                onClick={() => setImportPreview(null)}
                style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, background: 'white', cursor: 'pointer' }}
              >Annuler</button>
              <button
                onClick={() => {
                  importBulk(importPreview.payload);
                  setImportPreview(null);
                  setNotification({ type: 'success', message: 'Import JSON appliqué' });
                }}
                style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
              >Confirmer</button>
            </div>
          </div>
        </div>
      )}
      <p style={{ color: '#666', marginBottom: 30 }}>
        Gérez tous les éléments de votre univers narratif : personnages, lieux et objets.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {categories.map(category => (
          <div
            key={category.id}
            style={{
              border: `2px solid ${category.color}`,
              borderRadius: 12,
              padding: 20,
              backgroundColor: category.bgColor,
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 10 }}>{category.icon}</div>
            <h3 style={{ textAlign: 'center', color: category.color, marginBottom: 10 }}>{category.label}</h3>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#555', minHeight: 60 }}>
              {category.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
              <button
                onClick={() => setActiveManager(category.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: category.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold'
                }}
              >
                Gérer
              </button>
              <button
                onClick={() => { setCreateInitialCategory(category.id === 'characters' ? 'character' : category.id); setActiveManager('create'); }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold'
                }}
              >
                + Créer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );

  const renderActiveManager = () => {
    switch (activeManager) {
      case 'statistics':
        return <ElementStatistics elements={storeElements} />;
      case 'export':
        return (
          <div style={{ padding: 16 }}>
            <ElementExporter elements={storeElements} />
          </div>
        );
      case 'create':
        return (
          <div style={{ padding: 16 }}>
            <ElementFormFactory initialCategory={createInitialCategory || 'character'} />
          </div>
        );
      case 'characters':
        return <CharacterManager />;
      case 'locations':
        return <LocationManager />;
      case 'objects':
        return <ObjectManager />;
      case 'bestiaire':
        return <BestiaireManager />;
      case 'nourriture':
        return <NourritureManager />;
      case 'materiaux':
        return <MateriauxManager />;
      default:
        return renderOverview();
    }
  };

  return (
    <div>
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

      <div style={{
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        padding: '10px 16px',
        display: 'flex',
        gap: 8
      }}>
        {managers.map(manager => (
          <button
            key={manager.id}
            onClick={() => setActiveManager(manager.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 6,
              backgroundColor: activeManager === manager.id ? '#007bff' : 'transparent',
              color: activeManager === manager.id ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeManager === manager.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {manager.icon} {manager.label}
          </button>
        ))}
      </div>

      {renderActiveManager()}
    </div>
  );
}

export default ElementsManager;
