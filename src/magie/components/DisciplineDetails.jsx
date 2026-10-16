import React from 'react';
import FicheDisciplineButton from '../../components/common/FicheDisciplineButton.jsx';

export default function DisciplineDetails({ selectedItem, getCharacterById, family }) {
  const practitioners = (selectedItem.practitionerIds || []).map(getCharacterById).filter(Boolean);

  return (
    <div style={{
      flex: 1,
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedItem.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{selectedItem.category}</div>
        </div>
        <FicheDisciplineButton discipline={selectedItem} family={family} />
      </div>

      {selectedItem.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedItem.description}</p>
        </div>
      )}

      {selectedItem.mechanism && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Règles / Mécanique :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedItem.mechanism}</p>
        </div>
      )}

      {selectedItem.energySource && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Source d'énergie / Prérequis :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedItem.energySource}</p>
        </div>
      )}

      {selectedItem.masteryLevels && selectedItem.masteryLevels.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Niveaux de maîtrise :</strong>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {selectedItem.masteryLevels.map((level, idx) => (
              <React.Fragment key={idx}>
                <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                  {level}
                </span>
                {idx < selectedItem.masteryLevels.length - 1 && <span style={{ color: 'var(--encre-douce)' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {selectedItem.limitations && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--coeur)' }}>
          <strong style={{ color: 'var(--encre)' }}>Limites / Dangers / Contre-mesures :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: 'var(--encre)' }}>{selectedItem.limitations}</p>
        </div>
      )}

      {practitioners.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Praticiens ({practitioners.length}) :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {practitioners.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedItem.tags && selectedItem.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedItem.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedItem.images && selectedItem.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedItem.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedItem.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
