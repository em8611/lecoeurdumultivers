import React from 'react';
import FicheConceptButton from '../../components/common/FicheConceptButton.jsx';

export default function ConceptDetails({
  selectedConcept,
  allConcepts,
  onSelectConcept
}) {
  const relatedEntries = (selectedConcept.relatedConcepts || [])
    .map(name => allConcepts.find(c => c.name.toLowerCase() === name.toLowerCase()))
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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>
            {selectedConcept.name}
          </h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedConcept.category}
          </div>
        </div>
        <FicheConceptButton concept={selectedConcept} />
      </div>

      {selectedConcept.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedConcept.description}
          </p>
        </div>
      )}

      {selectedConcept.mechanism && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Fonctionnement / Mécanisme :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedConcept.mechanism}
          </p>
        </div>
      )}

      {selectedConcept.scope && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Portée / Application :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedConcept.scope}
          </p>
        </div>
      )}

      {selectedConcept.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Origine / Historique :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedConcept.origin}
          </p>
        </div>
      )}

      {selectedConcept.exceptions && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--or)' }}>
          <strong style={{ color: 'var(--encre)' }}>Exceptions / Limites :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: 'var(--encre)' }}>
            {selectedConcept.exceptions}
          </p>
        </div>
      )}

      {selectedConcept.consequences && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--coeur)' }}>
          <strong style={{ color: 'var(--encre)' }}>Conséquences / Enjeux :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: 'var(--encre)' }}>
            {selectedConcept.consequences}
          </p>
        </div>
      )}

      {relatedEntries.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Concepts liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onSelectConcept(entry)}
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
                {entry.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedConcept.relatedConcepts && selectedConcept.relatedConcepts.length > relatedEntries.length && (
        <div style={{ marginBottom: 15, fontSize: 12, color: 'var(--encre-douce)', fontStyle: 'italic' }}>
          D'autres concepts liés référencés n'ont pas encore de fiche.
        </div>
      )}

      {selectedConcept.tags && selectedConcept.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedConcept.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'var(--or)',
                  color: 'var(--sur-or)',
                  borderRadius: 'var(--rayon-pilule)',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedConcept.images && selectedConcept.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedConcept.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${selectedConcept.name} ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
