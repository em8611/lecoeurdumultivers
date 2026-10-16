import React from 'react';

// Fenêtre modale générique de fiche technique (titre, image, métadonnées, sections).
function FicheTechnique({ data, onClose }) {
  if (!data) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
      <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 480, maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>{data.icon} {data.title}</h2>
          {onClose && (
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }}>✕</button>
          )}
        </div>
        {data.image && (
          <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: 8, marginTop: 12 }} />
        )}
        {data.description && <p style={{ marginTop: 12, color: '#555' }}>{data.description}</p>}
        {data.metadata?.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {data.metadata.map((m, i) => (
              <span key={i} style={{ background: '#f1f3f5', padding: '4px 10px', borderRadius: 12, fontSize: 12 }}>
                {m.label}: {m.value}
              </span>
            ))}
          </div>
        )}
        {data.sections?.map((s, i) => (
          <div key={i} style={{ marginTop: 16 }}>
            <h4>{s.icon} {s.titre}</h4>
            <p style={{ whiteSpace: 'pre-wrap', color: '#555' }}>{s.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FicheTechnique;
