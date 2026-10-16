import React from 'react';
import FicheArtefactButton from '../../components/common/FicheArtefactButton.jsx';

export default function ArtefactDetails({
  selectedArtefact,
  getCategoryIcon,
  getStatusIcon,
  getCharacterById,
  getTerritoireById,
  getQueteById,
  getEvenementById
}) {
  const currentOwner = selectedArtefact.currentOwnerId ? getCharacterById(selectedArtefact.currentOwnerId) : null;
  const location = selectedArtefact.locationId ? getTerritoireById(selectedArtefact.locationId) : null;
  const previousOwners = (selectedArtefact.previousOwnerIds || []).map(getCharacterById).filter(Boolean);
  const quetesLinked = (selectedArtefact.relatedQuestIds || []).map(getQueteById).filter(Boolean);
  const evenementsLinked = (selectedArtefact.relatedEventIds || []).map(getEvenementById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedArtefact.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedArtefact.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedArtefact.category || 'Catégorie inconnue'}
            {selectedArtefact.creator && ` • Créé par ${selectedArtefact.creator}`}
          </div>
        </div>
        <FicheArtefactButton artefact={selectedArtefact} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {getStatusIcon(selectedArtefact.status)} {selectedArtefact.status}
        </span>
      </div>

      {selectedArtefact.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedArtefact.description}</p>
        </div>
      )}

      {selectedArtefact.powers && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>✨ Pouvoirs / Propriétés :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedArtefact.powers}</p>
        </div>
      )}

      {selectedArtefact.history && (
        <div style={{ marginBottom: 15 }}>
          <strong>📜 Histoire / Origine :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedArtefact.history}</p>
        </div>
      )}

      {(currentOwner || location) && (
        <div style={{ marginBottom: 15 }}>
          {currentOwner && (
            <div style={{ marginBottom: 6 }}>
              <strong>🧑 Propriétaire actuel :</strong>{' '}
              <span style={{ padding: '4px 10px', backgroundColor: '#ffe0b2', color: '#a15c00', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {currentOwner.name}
              </span>
            </div>
          )}
          {location && (
            <div>
              <strong>🏔️ Localisation actuelle :</strong>{' '}
              <span style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {location.name}
              </span>
            </div>
          )}
        </div>
      )}

      {previousOwners.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>👤 Propriétaires précédents :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {previousOwners.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {quetesLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🗺️ Quêtes liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {quetesLinked.map(q => (
              <span key={q.id} style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {q.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {evenementsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>📅 Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {evenementsLinked.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedArtefact.tags && selectedArtefact.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedArtefact.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedArtefact.images && selectedArtefact.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedArtefact.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedArtefact.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
