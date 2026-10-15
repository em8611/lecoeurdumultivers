import React from 'react';
import FicheTermeButton from '../../components/common/FicheTermeButton.jsx';

export default function DictionnaireDetails({
  selectedTerme,
  allTermes,
  getCategoryIcon,
  onSelectTerme
}) {
  const relatedEntries = (selectedTerme.relatedTerms || [])
    .map(name => allTermes.find(t => t.term.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedTerme.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>
            {selectedTerme.term}
          </h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedTerme.category}
            {selectedTerme.pronunciation && ` • ${selectedTerme.pronunciation}`}
          </div>
        </div>
        <FicheTermeButton terme={selectedTerme} />
      </div>

      {selectedTerme.definition && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Définition :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedTerme.definition}
          </p>
        </div>
      )}

      {selectedTerme.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌍 Origine / Étymologie :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedTerme.origin}
          </p>
        </div>
      )}

      {selectedTerme.examples && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>💬 Exemples d'usage :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap' }}>
            {selectedTerme.examples}
          </p>
        </div>
      )}

      {relatedEntries.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Termes liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onSelectTerme(entry)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  border: '1px solid #90caf9',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {getCategoryIcon(entry.category)} {entry.term}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTerme.relatedTerms && selectedTerme.relatedTerms.length > relatedEntries.length && (
        <div style={{ marginBottom: 15, fontSize: 12, color: '#999', fontStyle: 'italic' }}>
          D'autres termes liés référencés n'ont pas encore de fiche dans le dictionnaire.
        </div>
      )}

      {selectedTerme.tags && selectedTerme.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTerme.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#fff3cd',
                  color: '#856404',
                  borderRadius: 12,
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
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTerme.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${selectedTerme.term} ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
