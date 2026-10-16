import React from 'react';
import FicheTermeButton from '../../components/common/FicheTermeButton.jsx';

export default function DictionnaireDetails({
  selectedTerme,
  allTermes,
  onSelectTerme
}) {
  const relatedEntries = (selectedTerme.relatedTerms || [])
    .map(name => allTermes.find(t => t.term.toLowerCase() === name.toLowerCase()))
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
            {selectedTerme.term}
          </h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedTerme.category}
            {selectedTerme.pronunciation && ` • ${selectedTerme.pronunciation}`}
          </div>
        </div>
        <FicheTermeButton terme={selectedTerme} />
      </div>

      {selectedTerme.definition && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Définition :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedTerme.definition}
          </p>
        </div>
      )}

      {selectedTerme.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Origine / Étymologie :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>
            {selectedTerme.origin}
          </p>
        </div>
      )}

      {selectedTerme.examples && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Exemples d'usage :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--encre)', whiteSpace: 'pre-wrap' }}>
            {selectedTerme.examples}
          </p>
        </div>
      )}

      {relatedEntries.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Termes liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onSelectTerme(entry)}
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
                {entry.term}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTerme.relatedTerms && selectedTerme.relatedTerms.length > relatedEntries.length && (
        <div style={{ marginBottom: 15, fontSize: 12, color: 'var(--encre-douce)', fontStyle: 'italic' }}>
          D'autres termes liés référencés n'ont pas encore de fiche dans le dictionnaire.
        </div>
      )}

      {selectedTerme.tags && selectedTerme.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTerme.tags.map((tag, idx) => (
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

      {selectedTerme.images && selectedTerme.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTerme.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${selectedTerme.term} ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
