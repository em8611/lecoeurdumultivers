import React from 'react';
import FicheTransportButton from '../../components/common/FicheTransportButton.jsx';

export default function TransportDetails({
  selectedTransport,
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
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedTransport.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{selectedTransport.category || 'Catégorie inconnue'}</div>
        </div>
        <FicheTransportButton transport={selectedTransport} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedTransport.status}
        </span>
        {selectedTransport.speed && (
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            {selectedTransport.speed}
          </span>
        )}
        {selectedTransport.capacity && (
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            {selectedTransport.capacity}
          </span>
        )}
      </div>

      {selectedTransport.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedTransport.description}</p>
        </div>
      )}

      {selectedTransport.origin && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Origine / Fabricant :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedTransport.origin}</p>
        </div>
      )}

      {pilotes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Pilotes / Conducteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {pilotes.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Territoires desservis :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {universList.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Univers accessibles :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {universList.map(u => (
              <span key={u.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {u.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTransport.tags && selectedTransport.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTransport.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTransport.images && selectedTransport.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTransport.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedTransport.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
