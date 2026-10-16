import React from 'react';
import FicheTransportButton from '../../components/common/FicheTransportButton.jsx';

export default function TransportDetails({
  selectedTransport,
  getCategoryIcon,
  getStatusIcon,
  getCharacterById,
  getTerritoireById,
  getUniversById
}) {
  const pilotes = (selectedTransport.pilotIds || []).map(getCharacterById).filter(Boolean);
  const territoires = (selectedTransport.territoireIds || []).map(getTerritoireById).filter(Boolean);
  const universList = (selectedTransport.universIds || []).map(getUniversById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedTransport.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedTransport.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{selectedTransport.category || 'Catégorie inconnue'}</div>
        </div>
        <FicheTransportButton transport={selectedTransport} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {getStatusIcon(selectedTransport.status)} {selectedTransport.status}
        </span>
        {selectedTransport.speed && (
          <span style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            💨 {selectedTransport.speed}
          </span>
        )}
        {selectedTransport.capacity && (
          <span style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            📦 {selectedTransport.capacity}
          </span>
        )}
      </div>

      {selectedTransport.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedTransport.description}</p>
        </div>
      )}

      {selectedTransport.origin && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>🛠️ Origine / Fabricant :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedTransport.origin}</p>
        </div>
      )}

      {pilotes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Pilotes / Conducteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {pilotes.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#ffe0b2', color: '#a15c00', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏔️ Territoires desservis :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {universList.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌌 Univers accessibles :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {universList.map(u => (
              <span key={u.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {u.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTransport.tags && selectedTransport.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTransport.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTransport.images && selectedTransport.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTransport.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedTransport.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
