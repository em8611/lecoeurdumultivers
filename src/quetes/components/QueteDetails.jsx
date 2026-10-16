import React from 'react';
import FicheQueteButton from '../../components/common/FicheQueteButton.jsx';

export default function QueteDetails({
  selectedQuete,
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
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedQuete.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{selectedQuete.category}</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onEdit(selectedQuete)}
            style={{ padding: '6px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(selectedQuete.id)}
            style={{ padding: '6px 10px', backgroundColor: '#a13d3d', color: 'white', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontSize: 12 }}
          >
            Supprimer
          </button>
          <FicheQueteButton quete={selectedQuete} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedQuete.status}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${selectedQuete.advancement ?? 0}%`, backgroundColor: 'var(--coeur)' }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--encre-douce)', marginTop: 2 }}>{selectedQuete.advancement ?? 0}% d'avancement</div>
        </div>
      </div>

      {selectedQuete.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedQuete.description}</p>
        </div>
      )}

      {selectedQuete.objectives && selectedQuete.objectives.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Objectifs / Étapes :</strong>
          <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, fontSize: 14, color: 'var(--encre)' }}>
            {selectedQuete.objectives.map((obj, idx) => <li key={idx}>{obj}</li>)}
          </ul>
        </div>
      )}

      {selectedQuete.stakes && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--or)' }}>
          <strong style={{ color: 'var(--encre)' }}>Enjeux :</strong>
          <p style={{ margin: '4px 0', fontSize: 14, color: 'var(--encre)' }}>{selectedQuete.stakes}</p>
        </div>
      )}

      {selectedQuete.resolution && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Résolution :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--encre)', whiteSpace: 'pre-wrap' }}>{selectedQuete.resolution}</p>
        </div>
      )}

      {protagonists.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Protagonistes :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {protagonists.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {antagonists.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Antagonistes :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {antagonists.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: '#a13d3d', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Équipes impliquées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipes.map(eq => (
              <span key={eq.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {eq.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Lieux concernés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {locations.map(l => (
              <span key={l.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {l.name}
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

      {relatedQuetes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Quêtes liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedQuetes.map(q => (
              <button
                key={q.id}
                onClick={() => onSelectQuete(q)}
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
                {q.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedQuete.tags && selectedQuete.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedQuete.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedQuete.images && selectedQuete.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedQuete.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedQuete.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
