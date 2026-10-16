import React from 'react';

function ImageUploader({ images = [], onImagesChange }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const readers = files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(newImages => {
      onImagesChange([...images, ...newImages]);
    });
    e.target.value = '';
  };

  const removeImage = (idx) => {
    onImagesChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: 'var(--encre)' }}>Images</label>
      <input type="file" accept="image/*" multiple onChange={handleFiles} />
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {images.map((src, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <img src={src} alt={`image-${idx}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                style={{
                  position: 'absolute', top: -6, right: -6,
                  background: '#a13d3d', color: 'white', border: 'none',
                  borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 11
                }}
                aria-label="Retirer l'image"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
