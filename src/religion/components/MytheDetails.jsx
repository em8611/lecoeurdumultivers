import React from 'react';
import FicheMytheButton from '../../components/common/FicheMytheButton.jsx';

export default function MytheDetails({ selectedMythe, getDiviniteById, getCharacterById, getEvenementById }) {
  const deities = (selectedMythe.deityIds || []).map(getDiviniteById).filter(Boolean);
  const characters = (selectedMythe.characterIds || []).map(getCharacterById).filter(Boolean);
  const events = (selectedMythe.eventIds || []).map(getEvenementById).filter(Boolean);

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedMythe.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{selectedMythe.category}</div>
        </div>
        <FicheMytheButton mythe={selectedMythe} />
      </div>

      {selectedMythe.truthStatus && (
        <div style={{ marginBottom: 15 }}>
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            Véracité : {selectedMythe.truthStatus}
          </span>
        </div>
      )}

      {selectedMythe.description && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Récit :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--encre)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{selectedMythe.description}</p>
        </div>
      )}

      {selectedMythe.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Origine :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedMythe.origin}</p>
        </div>
      )}

      {selectedMythe.signification && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Signification / Morale :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedMythe.signification}</p>
        </div>
      )}

      {deities.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Divinités liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {deities.map(d => (
              <span key={d.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {d.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Personnages liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {characters.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {events.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedMythe.tags && selectedMythe.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedMythe.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedMythe.images && selectedMythe.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedMythe.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedMythe.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
