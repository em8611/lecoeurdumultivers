import React, { useEffect, useState } from 'react';
import FormField from '../../../components/common/FormField.jsx';
import { CHARACTER_GENDERS } from '../constants';

function PhysicalSection({ formData, onInputChange }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = Array.isArray(formData.physicalImages) ? formData.physicalImages : [];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % Math.max(images.length, 1));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  return (
    <div className="form-section-card form-grid">
      <FormField
        id="character-gender"
        label="Sexe"
        type="select"
        value={formData.gender || 'Masculin'}
        onChange={(e) => onInputChange('gender', e.target.value)}
        options={CHARACTER_GENDERS}
      />

      <FormField
        id="character-height"
        label="Taille"
        type="text"
        value={formData.height || ''}
        onChange={(e) => onInputChange('height', e.target.value)}
        placeholder="Ex: 1m75, Grand, Petit..."
      />

      <FormField
        id="character-weight"
        label="Poids"
        type="text"
        value={formData.weight || ''}
        onChange={(e) => onInputChange('weight', e.target.value)}
        placeholder="Ex: 70kg, Mince, Corpulent..."
      />

      <FormField
        id="character-eye-color"
        label="Couleur des yeux"
        type="text"
        value={formData.eyeColor || ''}
        onChange={(e) => onInputChange('eyeColor', e.target.value)}
        placeholder="Ex: Bleu, Vert, Noisette..."
      />

      <FormField
        id="character-hair-color"
        label="Couleur des cheveux"
        type="text"
        value={formData.hairColor || ''}
        onChange={(e) => onInputChange('hairColor', e.target.value)}
        placeholder="Ex: Noir, Blond, Roux..."
      />

      <FormField
        id="character-physical-appearance"
        label="Apparence physique principale"
        type="textarea"
        value={formData.physicalAppearance || ''}
        onChange={(e) => onInputChange('physicalAppearance', e.target.value)}
        containerClassName="form-full"
        placeholder="Description détaillée de l'apparence..."
      />

      {/* Uploader d'images pour l'apparence physique */}
      <div className="form-full form-field">
        <label className="form-label" htmlFor="character-appearance-images">Images d'apparence</label>
        <div className="form-image-upload" style={{ alignItems: 'flex-start' }}>
          <input
            id="character-appearance-images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (!files.length) return;
              const readers = files.map((file) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (ev) => resolve(ev.target.result);
                reader.readAsDataURL(file);
              }));
              Promise.all(readers).then((images) => {
                const current = Array.isArray(formData.physicalImages) ? formData.physicalImages : [];
                onInputChange('physicalImages', [...current, ...images]);
              });
              // réinitialise l'input pour permettre de re-sélectionner les mêmes fichiers si besoin
              e.target.value = '';
            }}
          />
        </div>

        {/* Grille d'aperçu des images */}
        <div className="form-image-grid" style={{ marginTop: '0.75rem' }}>
          {images.map((imgSrc, idx) => (
            <div key={idx} className="form-image-thumb-wrap">
              <img
                src={imgSrc}
                alt={`Apparence ${idx + 1}`}
                className="form-image-thumb"
                onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                style={{ cursor: 'zoom-in' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                  style={{ width: '100%' }}
                >
                  Voir en grand
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    const current = Array.isArray(formData.physicalImages) ? formData.physicalImages : [];
                    const next = current.filter((_, i) => i !== idx);
                    onInputChange('physicalImages', next);
                  }}
                  style={{ width: '100%' }}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FormField
        id="character-clothing-style"
        label="Style Vestimentaire"
        type="textarea"
        value={formData.clothingStyle || ''}
        onChange={(e) => onInputChange('clothingStyle', e.target.value)}
        containerClassName="form-full"
        placeholder="Description du style vestimentaire, tenues habituelles..."
      />

      <FormField
        id="character-other-appearance"
        label="Autre Apparence"
        type="textarea"
        value={formData.otherAppearance || ''}
        onChange={(e) => onInputChange('otherAppearance', e.target.value)}
        containerClassName="form-full"
        placeholder="Autres détails sur l'apparence..."
      />

      <FormField
        id="character-distinctive-features"
        label="Signes distinctifs"
        type="textarea"
        value={formData.distinctiveFeatures || ''}
        onChange={(e) => onInputChange('distinctiveFeatures', e.target.value)}
        containerClassName="form-full"
        placeholder="Cicatrices, tatouages, marques particulières..."
      />
      {/* Lightbox pour afficher l'image en grand */}
      {lightboxOpen && images.length > 0 && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`Aperçu ${lightboxIndex + 1}`}
              className="lightbox-image"
            />
            <div className="lightbox-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setLightboxIndex((i) => (i - 1 + images.length) % images.length)}
              >
                ◀ Précédent
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setLightboxIndex((i) => (i + 1) % images.length)}
              >
                Suivant ▶
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setLightboxOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhysicalSection;
