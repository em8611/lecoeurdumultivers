import React from 'react';
import FicheMytheButton from '../../components/common/FicheMytheButton.jsx';

export default function MytheDetails({ selectedMythe, getCategoryIcon, getDiviniteById, getCharacterById, getEvenementById }) {
  const deities = (selectedMythe.deityIds || []).map(getDiviniteById).filter(Boolean);
  const characters = (selectedMythe.characterIds || []).map(getCharacterById).filter(Boolean);
  const events = (selectedMythe.eventIds || []).map(getEvenementById).filter(Boolean);

  return (
    <div style={{
      flex: 1,
      border: '1px solid #ddd',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#ffffff',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedMythe.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedMythe.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{selectedMythe.category}</div>
        </div>
        <FicheMytheButton mythe={selectedMythe} />
      </div>

      {selectedMythe.truthStatus && (
        <div style={{ marginBottom: 15 }}>
          <span style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            Véracité : {selectedMythe.truthStatus}
          </span>
        </div>
      )}

      {selectedMythe.description && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>📖 Récit :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{selectedMythe.description}</p>
        </div>
      )}

      {selectedMythe.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌍 Origine :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedMythe.origin}</p>
        </div>
      )}

      {selectedMythe.signification && (
        <div style={{ marginBottom: 15 }}>
          <strong>💭 Signification / Morale :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedMythe.signification}</p>
        </div>
      )}

      {deities.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🙏 Divinités liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {deities.map(d => (
              <span key={d.id} style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {d.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Personnages liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {characters.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#e7f3ff', color: '#0c5460', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🕰️ Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {events.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedMythe.tags && selectedMythe.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedMythe.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedMythe.images && selectedMythe.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedMythe.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedMythe.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
