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
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: 480, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {description && <p style={{ color: '#555', fontSize: 13 }}>{description}</p>}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={8}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, background: 'white', cursor: 'pointer' }}>
            Annuler
          </button>
          <button onClick={handleImport} style={{ padding: '8px 12px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Importer
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchImportModal;
