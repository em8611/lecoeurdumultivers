import React from 'react';
import FicheUniversButton from '../../components/common/FicheUniversButton.jsx';

export default function UniversDetails({
  selectedUnivers,
  getStatusIcon,
  getUniversById,
  getTerritoireById,
  getConceptById,
  onSelectUnivers
}) {
  const connectedUnivers = (selectedUnivers.connectedUniverseIds || []).map(getUniversById).filter(Boolean);
  const territoires = (selectedUnivers.territoireIds || []).map(getTerritoireById).filter(Boolean);
  const conceptsLinked = (selectedUnivers.conceptIds || []).map(getConceptById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getStatusIcon(selectedUnivers.status)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedUnivers.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedUnivers.franchise || 'Franchise inconnue'}
            {selectedUnivers.group && ` • ${selectedUnivers.group}`}
          </div>
        </div>
        <FicheUniversButton univers={selectedUnivers} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {selectedUnivers.status}
        </span>
        {selectedUnivers.dangerLevel && (
          <span style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            ⚠️ {selectedUnivers.dangerLevel}
          </span>
        )}
      </div>

      {selectedUnivers.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedUnivers.description}</p>
        </div>
      )}

      {selectedUnivers.rules && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>⚙️ Règles spécifiques :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedUnivers.rules}</p>
        </div>
      )}

      {selectedUnivers.accessPoints && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌀 Points d'accès / Portails :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedUnivers.accessPoints}</p>
        </div>
      )}

      {connectedUnivers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Univers connectés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {connectedUnivers.map(u => (
              <button
                key={u.id}
                onClick={() => onSelectUnivers(u)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  border: '1px solid #90caf9',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {getStatusIcon(u.status)} {u.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏔️ Territoires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {conceptsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>⚖️ Concepts / Lois :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {conceptsLinked.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedUnivers.tags && selectedUnivers.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedUnivers.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedUnivers.images && selectedUnivers.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedUnivers.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedUnivers.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
