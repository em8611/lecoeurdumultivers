import React from 'react';
import FicheQueteButton from '../../components/common/FicheQueteButton.jsx';

export default function QueteDetails({
  selectedQuete,
  getCategoryIcon,
  getStatusIcon,
  getCharacterById,
  getEquipeById,
  getLocationById,
  getEvenementById,
  getQueteById,
  onSelectQuete,
  onEdit,
  onDelete
}) {
  const protagonists = (selectedQuete.protagonistIds || []).map(getCharacterById).filter(Boolean);
  const antagonists = (selectedQuete.antagonistIds || []).map(getCharacterById).filter(Boolean);
  const equipes = (selectedQuete.equipeIds || []).map(getEquipeById).filter(Boolean);
  const locations = (selectedQuete.locationIds || []).map(getLocationById).filter(Boolean);
  const events = (selectedQuete.relatedEventIds || []).map(getEvenementById).filter(Boolean);
  const relatedQuetes = (selectedQuete.relatedQuestIds || []).map(getQueteById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedQuete.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedQuete.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{selectedQuete.category}</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onEdit(selectedQuete)}
            style={{ padding: '6px 10px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}
          >
            ✏️ Modifier
          </button>
          <button
            onClick={() => onDelete(selectedQuete.id)}
            style={{ padding: '6px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
          >
            ✕ Supprimer
          </button>
          <FicheQueteButton quete={selectedQuete} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {getStatusIcon(selectedQuete.status)} {selectedQuete.status}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, borderRadius: 4, backgroundColor: '#e9ecef', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${selectedQuete.advancement ?? 0}%`, backgroundColor: '#28a745' }} />
          </div>
          <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{selectedQuete.advancement ?? 0}% d'avancement</div>
        </div>
      </div>

      {selectedQuete.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedQuete.description}</p>
        </div>
      )}

      {selectedQuete.objectives && selectedQuete.objectives.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🎯 Objectifs / Étapes :</strong>
          <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, fontSize: 14, color: '#555' }}>
            {selectedQuete.objectives.map((obj, idx) => <li key={idx}>{obj}</li>)}
          </ul>
        </div>
      )}

      {selectedQuete.stakes && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#fff3cd', borderRadius: 6, border: '1px solid #ffc107' }}>
          <strong style={{ color: '#856404' }}>⚠️ Enjeux :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: '#856404' }}>{selectedQuete.stakes}</p>
        </div>
      )}

      {selectedQuete.resolution && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>🏁 Résolution :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap' }}>{selectedQuete.resolution}</p>
        </div>
      )}

      {protagonists.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🦸 Protagonistes :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {protagonists.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#e7f3ff', color: '#0c5460', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {antagonists.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🦹 Antagonistes :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {antagonists.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>👥 Équipes impliquées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipes.map(eq => (
              <span key={eq.id} style={{ padding: '4px 10px', backgroundColor: '#fff3e0', color: '#e65100', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {eq.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🗺️ Lieux concernés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {locations.map(l => (
              <span key={l.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🕰️ Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {events.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {relatedQuetes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Quêtes liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedQuetes.map(q => (
              <button
                key={q.id}
                onClick={() => onSelectQuete(q)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#f3e5f5',
                  color: '#6a1b9a',
                  border: '1px solid #ce93d8',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {getCategoryIcon(q.category)} {q.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedQuete.tags && selectedQuete.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedQuete.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedQuete.images && selectedQuete.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedQuete.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedQuete.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
