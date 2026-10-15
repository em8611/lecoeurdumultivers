import React from 'react';
import FicheConceptButton from '../../components/common/FicheConceptButton.jsx';

export default function ConceptDetails({
  selectedConcept,
  allConcepts,
  getCategoryIcon,
  onSelectConcept
}) {
  const relatedEntries = (selectedConcept.relatedConcepts || [])
    .map(name => allConcepts.find(c => c.name.toLowerCase() === name.toLowerCase()))
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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedConcept.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>
            {selectedConcept.name}
          </h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedConcept.category}
          </div>
        </div>
        <FicheConceptButton concept={selectedConcept} />
      </div>

      {selectedConcept.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedConcept.description}
          </p>
        </div>
      )}

      {selectedConcept.mechanism && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>⚙️ Fonctionnement / Mécanisme :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>
            {selectedConcept.mechanism}
          </p>
        </div>
      )}

      {selectedConcept.scope && (
        <div style={{ marginBottom: 15 }}>
          <strong>🎯 Portée / Application :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedConcept.scope}
          </p>
        </div>
      )}

      {selectedConcept.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌍 Origine / Historique :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedConcept.origin}
          </p>
        </div>
      )}

      {selectedConcept.exceptions && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#fff3cd', borderRadius: 6, border: '1px solid #ffc107' }}>
          <strong style={{ color: '#856404' }}>⚠️ Exceptions / Limites :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: '#856404' }}>
            {selectedConcept.exceptions}
          </p>
        </div>
      )}

      {selectedConcept.consequences && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8d7da', borderRadius: 6, border: '1px solid #dc3545' }}>
          <strong style={{ color: '#721c24' }}>💥 Conséquences / Enjeux :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: '#721c24' }}>
            {selectedConcept.consequences}
          </p>
        </div>
      )}

      {relatedEntries.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Concepts liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onSelectConcept(entry)}
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
                {getCategoryIcon(entry.category)} {entry.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedConcept.relatedConcepts && selectedConcept.relatedConcepts.length > relatedEntries.length && (
        <div style={{ marginBottom: 15, fontSize: 12, color: '#999', fontStyle: 'italic' }}>
          D'autres concepts liés référencés n'ont pas encore de fiche.
        </div>
      )}

      {selectedConcept.tags && selectedConcept.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedConcept.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#e7f3ff',
                  color: '#0c5460',
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

      {selectedConcept.images && selectedConcept.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedConcept.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${selectedConcept.name} ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
