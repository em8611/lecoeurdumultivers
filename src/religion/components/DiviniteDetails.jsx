import React from 'react';
import FicheDiviniteButton from '../../components/common/FicheDiviniteButton.jsx';

export default function DiviniteDetails({ selectedDivinite, getStatusIcon, getCharacterById, getConceptById }) {
  const avatars = (selectedDivinite.avatarCharacterIds || []).map(getCharacterById).filter(Boolean);
  const conceptsLinked = (selectedDivinite.conceptIds || []).map(getConceptById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getStatusIcon(selectedDivinite.status)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedDivinite.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedDivinite.pantheon || 'Panthéon inconnu'}
          </div>
        </div>
        <FicheDiviniteButton divinite={selectedDivinite} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {selectedDivinite.status}
        </span>
        {selectedDivinite.alignment && (
          <span style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            {selectedDivinite.alignment}
          </span>
        )}
      </div>

      {selectedDivinite.domains && selectedDivinite.domains.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌐 Domaines d'influence :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.domains.map((d, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedDivinite.description}</p>
        </div>
      )}

      {selectedDivinite.origin && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>✨ Origine / Mythe de naissance :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap' }}>{selectedDivinite.origin}</p>
        </div>
      )}

      {selectedDivinite.symbols && selectedDivinite.symbols.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔯 Symboles :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.symbols.map((s, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.followers && (
        <div style={{ marginBottom: 15 }}>
          <strong>🙏 Fidèles / Culte :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedDivinite.followers}</p>
        </div>
      )}

      {avatars.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Avatars / Incarnations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {avatars.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#e7f3ff', color: '#0c5460', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {conceptsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>⚖️ Concepts / Lois divines :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {conceptsLinked.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.tags && selectedDivinite.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.images && selectedDivinite.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedDivinite.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedDivinite.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
