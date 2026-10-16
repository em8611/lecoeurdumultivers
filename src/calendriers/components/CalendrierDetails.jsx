import React from 'react';
import FicheCalendrierButton from '../../components/common/FicheCalendrierButton.jsx';

export default function CalendrierDetails({ selectedCalendrier, getUniversById }) {
  const univers = selectedCalendrier.universId ? getUniversById(selectedCalendrier.universId) : null;

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedCalendrier.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{univers?.name || 'Transversal'}</div>
        </div>
        <FicheCalendrierButton calendrier={selectedCalendrier} />
      </div>

      {selectedCalendrier.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedCalendrier.description}</p>
        </div>
      )}

      {selectedCalendrier.units && selectedCalendrier.units.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Unités de temps :</strong>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {selectedCalendrier.units.map((unit, idx) => (
              <React.Fragment key={idx}>
                <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                  {unit}
                </span>
                {idx < selectedCalendrier.units.length - 1 && <span style={{ color: 'var(--encre-douce)' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {selectedCalendrier.epoch && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Point de départ / Année zéro :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedCalendrier.epoch}</p>
        </div>
      )}

      {selectedCalendrier.notes && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Particularités :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedCalendrier.notes}</p>
        </div>
      )}

      {selectedCalendrier.tags && selectedCalendrier.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedCalendrier.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedCalendrier.images && selectedCalendrier.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedCalendrier.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedCalendrier.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
