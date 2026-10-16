import React from 'react';
import FicheEreButton from '../../components/common/FicheEreButton.jsx';

export default function EreDetails({ selectedEre, getStatusIcon, getCalendrierById, getEvenementById }) {
  const calendrier = selectedEre.calendrierId ? getCalendrierById(selectedEre.calendrierId) : null;
  const evenements = (selectedEre.majorEventIds || []).map(getEvenementById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getStatusIcon(selectedEre.status)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedEre.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedEre.startDate || '?'} — {selectedEre.endDate || '?'}
            {calendrier && ` • ${calendrier.name}`}
          </div>
        </div>
        <FicheEreButton ere={selectedEre} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {selectedEre.status}
        </span>
      </div>

      {selectedEre.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedEre.description}</p>
        </div>
      )}

      {evenements.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>📅 Événements marquants :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {evenements.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedEre.tags && selectedEre.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedEre.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedEre.images && selectedEre.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedEre.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedEre.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
