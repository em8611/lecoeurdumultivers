import React from 'react';
import FicheDisciplineButton from '../../components/common/FicheDisciplineButton.jsx';

export default function DisciplineDetails({ selectedItem, icon, getCharacterById, family }) {
  const practitioners = (selectedItem.practitionerIds || []).map(getCharacterById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedItem.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{selectedItem.category}</div>
        </div>
        <FicheDisciplineButton discipline={selectedItem} family={family} />
      </div>

      {selectedItem.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedItem.description}</p>
        </div>
      )}

      {selectedItem.mechanism && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>⚙️ Principes / Fonctionnement :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedItem.mechanism}</p>
        </div>
      )}

      {selectedItem.energySource && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧰 Ressources / Prérequis :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedItem.energySource}</p>
        </div>
      )}

      {selectedItem.masteryLevels && selectedItem.masteryLevels.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>📈 Niveaux de maîtrise :</strong>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {selectedItem.masteryLevels.map((level, idx) => (
              <React.Fragment key={idx}>
                <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                  {level}
                </span>
                {idx < selectedItem.masteryLevels.length - 1 && <span style={{ color: '#999' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {selectedItem.limitations && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8d7da', borderRadius: 6, border: '1px solid #dc3545' }}>
          <strong style={{ color: '#721c24' }}>⚠️ Limites / Risques :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: '#721c24' }}>{selectedItem.limitations}</p>
        </div>
      )}

      {practitioners.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Praticiens ({practitioners.length}) :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {practitioners.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#e7f3ff', color: '#0c5460', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedItem.tags && selectedItem.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedItem.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedItem.images && selectedItem.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedItem.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedItem.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
