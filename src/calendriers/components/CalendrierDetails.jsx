import React from 'react';
import FicheCalendrierButton from '../../components/common/FicheCalendrierButton.jsx';

export default function CalendrierDetails({ selectedCalendrier, getUniversById }) {
  const univers = selectedCalendrier.universId ? getUniversById(selectedCalendrier.universId) : null;

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
        <span style={{ fontSize: 32 }}>🗓️</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedCalendrier.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{univers?.name || 'Transversal'}</div>
        </div>
        <FicheCalendrierButton calendrier={selectedCalendrier} />
      </div>

      {selectedCalendrier.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedCalendrier.description}</p>
        </div>
      )}

      {selectedCalendrier.units && selectedCalendrier.units.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>⏱️ Unités de temps :</strong>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {selectedCalendrier.units.map((unit, idx) => (
              <React.Fragment key={idx}>
                <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                  {unit}
                </span>
                {idx < selectedCalendrier.units.length - 1 && <span style={{ color: '#999' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {selectedCalendrier.epoch && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>🎯 Point de départ / Année zéro :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedCalendrier.epoch}</p>
        </div>
      )}

      {selectedCalendrier.notes && (
        <div style={{ marginBottom: 15 }}>
          <strong>📝 Particularités :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedCalendrier.notes}</p>
        </div>
      )}

      {selectedCalendrier.tags && selectedCalendrier.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedCalendrier.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedCalendrier.images && selectedCalendrier.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedCalendrier.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedCalendrier.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
