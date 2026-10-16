import React from 'react';
import FicheUniversButton from '../../components/common/FicheUniversButton.jsx';

export default function UniversDetails({
  selectedUnivers,
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
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedUnivers.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedUnivers.franchise || 'Franchise inconnue'}
            {selectedUnivers.group && ` • ${selectedUnivers.group}`}
          </div>
        </div>
        <FicheUniversButton univers={selectedUnivers} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedUnivers.status}
        </span>
        {selectedUnivers.dangerLevel && (
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            {selectedUnivers.dangerLevel}
          </span>
        )}
      </div>

      {selectedUnivers.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedUnivers.description}</p>
        </div>
      )}

      {selectedUnivers.rules && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Règles spécifiques :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedUnivers.rules}</p>
        </div>
      )}

      {selectedUnivers.accessPoints && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Points d'accès / Portails :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedUnivers.accessPoints}</p>
        </div>
      )}

      {connectedUnivers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Univers connectés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {connectedUnivers.map(u => (
              <button
                key={u.id}
                onClick={() => onSelectUnivers(u)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'var(--douceur)',
                  color: 'var(--coeur)',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-pilule)',
                  fontSize: 12,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {u.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Territoires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {conceptsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Concepts / Lois :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {conceptsLinked.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedUnivers.tags && selectedUnivers.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedUnivers.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedUnivers.images && selectedUnivers.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedUnivers.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedUnivers.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
