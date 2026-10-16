import React, { useState } from 'react';
import { useElementsState } from '../state/elementsStore.jsx';
import { MODULES, ENTITY_SOURCES } from '../utils/moduleRegistry.js';

function Lightbox({ image, onClose, onNavigate }) {
  if (!image) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2000, padding: 24
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white', borderRadius: 10, padding: 16,
          maxWidth: '90vw', maxHeight: '90vh', boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', gap: 12
        }}
      >
        <img
          src={image.src}
          alt={image.entityName}
          style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 6 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <strong style={{ fontSize: 15 }}>{image.entityName || 'Sans nom'}</strong>
            <div style={{ fontSize: 12, color: '#888' }}>{image.icon} {image.typeLabel}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onNavigate(image.moduleKey)}
              style={{ padding: '8px 14px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ouvrir le module
            </button>
            <button
              onClick={onClose}
              style={{ padding: '8px 14px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalerieManager({ onNavigate }) {
  const state = useElementsState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('Tous');
  const [lightboxImage, setLightboxImage] = useState(null);

  const modulesWithImages = MODULES.filter(m =>
    ENTITY_SOURCES.some(src => src.moduleKey === m.key)
  );

  const allImages = ENTITY_SOURCES.flatMap(source => {
    const entities = state[source.stateKey] || [];
    return entities.flatMap(entity =>
      (entity.images || []).map((src, idx) => ({
        src,
        idx,
        entityId: entity.id,
        entityName: entity.name,
        moduleKey: source.moduleKey,
        typeLabel: source.label,
        icon: source.icon
      }))
    );
  });

  const filteredImages = allImages.filter(img => {
    const matchesSearch = (img.entityName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'Tous' || img.moduleKey === filterModule;
    return matchesSearch && matchesModule;
  });

  const handleNavigate = (moduleKey) => {
    setLightboxImage(null);
    if (onNavigate) onNavigate(moduleKey);
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>🖼️ Galerie</h2>
      </div>

      <div style={{ display: 'flex', gap: 15, marginBottom: 20, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Recherche</label>
          <input
            type="text"
            placeholder="🔍 Rechercher par nom de fiche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>Module</label>
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="Tous">Tous les modules</option>
            {modulesWithImages.map(m => (
              <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p style={{ color: '#888', fontSize: 13, marginTop: -8, marginBottom: 20 }}>
        {filteredImages.length} image{filteredImages.length === 1 ? '' : 's'} affichée{filteredImages.length === 1 ? '' : 's'} sur {allImages.length} au total.
      </p>

      {filteredImages.length === 0 ? (
        <p style={{ color: '#999', fontStyle: 'italic' }}>
          Aucune image ne correspond aux filtres sélectionnés. Ajoutez des illustrations depuis les fiches des différents modules.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 12
        }}>
          {filteredImages.map((img, index) => (
            <button
              key={`${img.moduleKey}-${img.entityId}-${img.idx}-${index}`}
              onClick={() => setLightboxImage(img)}
              style={{
                padding: 0, border: '1px solid #ddd', borderRadius: 8,
                overflow: 'hidden', cursor: 'pointer', backgroundColor: 'white',
                textAlign: 'left'
              }}
              title={img.entityName}
            >
              <img
                src={img.src}
                alt={img.entityName}
                style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '6px 8px' }}>
                <div style={{ fontSize: 12, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {img.entityName || 'Sans nom'}
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>{img.icon} {img.typeLabel}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} onNavigate={handleNavigate} />
    </div>
  );
}
