import React from 'react';
import FicheEvenementButton from '../../components/common/FicheEvenementButton.jsx';

export default function EvenementDetails({
  selectedEvenement,
  getCategoryIcon,
  getCharacterById,
  getLocationById,
  getEquipeById,
  getEvenementById,
  onSelectEvenement,
  onEdit,
  onDelete
}) {
  const relatedCharacters = (selectedEvenement.characterIds || []).map(getCharacterById).filter(Boolean);
  const relatedLocations = (selectedEvenement.locationIds || []).map(getLocationById).filter(Boolean);
  const relatedEquipes = (selectedEvenement.equipeIds || []).map(getEquipeById).filter(Boolean);
  const relatedEvenements = (selectedEvenement.relatedEventIds || []).map(getEvenementById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedEvenement.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>
            {selectedEvenement.name}
          </h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedEvenement.category}
            {selectedEvenement.date && ` • ${selectedEvenement.date}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onEdit(selectedEvenement)}
            style={{ padding: '6px 10px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}
          >
            ✏️ Modifier
          </button>
          <button
            onClick={() => onDelete(selectedEvenement.id)}
            style={{ padding: '6px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
          >
            ✕ Supprimer
          </button>
          <FicheEvenementButton evenement={selectedEvenement} />
        </div>
      </div>

      {selectedEvenement.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>
            {selectedEvenement.description}
          </p>
        </div>
      )}

      {selectedEvenement.consequences && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>💥 Conséquences / Impact :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap' }}>
            {selectedEvenement.consequences}
          </p>
        </div>
      )}

      {relatedCharacters.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Personnages impliqués :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedCharacters.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#e7f3ff', color: '#0c5460', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {relatedLocations.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🗺️ Lieux concernés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedLocations.map(l => (
              <span key={l.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {relatedEquipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>👥 Équipes impliquées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEquipes.map(eq => (
              <span key={eq.id} style={{ padding: '4px 10px', backgroundColor: '#fff3e0', color: '#e65100', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {eq.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {relatedEvenements.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedEvenements.map(ev => (
              <button
                key={ev.id}
                onClick={() => onSelectEvenement(ev)}
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
                {getCategoryIcon(ev.category)} {ev.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedEvenement.tags && selectedEvenement.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedEvenement.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#f3e5f5',
                  color: '#6a1b9a',
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

      {selectedEvenement.images && selectedEvenement.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedEvenement.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${selectedEvenement.name} ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
