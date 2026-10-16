import React, { useState } from 'react';

function BatchImportModal({ isOpen, onClose, onImport, title, placeholder, description }) {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleImport = () => {
    if (!text.trim()) return;
    onImport(text);
    setText('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23,17,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: 'var(--fond-carte)', borderRadius: 'var(--rayon-carte-large)', padding: 20, width: 480, boxShadow: 'var(--ombre-survol)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--encre)' }}>{title}</h3>
        {description && <p style={{ color: 'var(--encre-douce)', fontSize: 13 }}>{description}</p>}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={8}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}>
            Annuler
          </button>
          <button onClick={handleImport} style={{ padding: '8px 12px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}>
            Importer
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchImportModal;
