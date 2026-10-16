import React from 'react';
import FicheDiplomatieButton from '../../components/common/FicheDiplomatieButton.jsx';

const intensityLabels = { 1: 'Très faible', 2: 'Faible', 3: 'Modérée', 4: 'Forte', 5: 'Extrême' };

export default function DiplomatieDetails({ selectedRelation, getEntityById, evenements }) {
  const fromEntity = getEntityById(selectedRelation.fromType, selectedRelation.fromId);
  const toEntity = getEntityById(selectedRelation.toType, selectedRelation.toId);
  const linkedEvents = (selectedRelation.relatedEventIds || [])
    .map(id => evenements.find(ev => ev.id === id))
    .filter(Boolean);

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span>{fromEntity?.name || '—'}</span>
            <span style={{ color: 'var(--encre-douce)', fontFamily: 'var(--police-texte)' }}>↔</span>
            <span>{toEntity?.name || '—'}</span>
          </h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedRelation.status} • {intensityLabels[selectedRelation.intensity] || selectedRelation.intensity}
          </div>
        </div>
        <FicheDiplomatieButton relation={selectedRelation} fromName={fromEntity?.name} toName={toEntity?.name} />
      </div>

      {selectedRelation.startDate && (
        <div style={{ marginBottom: 15, fontSize: 14, color: 'var(--encre)' }}>
          <strong>Depuis :</strong> {selectedRelation.startDate}
        </div>
      )}

      {selectedRelation.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description / Historique :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedRelation.description}</p>
        </div>
      )}

      {linkedEvents.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {linkedEvents.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedRelation.tags && selectedRelation.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedRelation.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
