import React from 'react';
import FicheArtefactButton from '../../components/common/FicheArtefactButton.jsx';

export default function ArtefactDetails({
  selectedArtefact,
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
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedArtefact.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedArtefact.category || 'Catégorie inconnue'}
            {selectedArtefact.creator && ` • Créé par ${selectedArtefact.creator}`}
          </div>
        </div>
        <FicheArtefactButton artefact={selectedArtefact} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedArtefact.status}
        </span>
      </div>

      {selectedArtefact.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedArtefact.description}</p>
        </div>
      )}

      {selectedArtefact.powers && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Pouvoirs / Propriétés :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedArtefact.powers}</p>
        </div>
      )}

      {selectedArtefact.history && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Histoire / Origine :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedArtefact.history}</p>
        </div>
      )}

      {(currentOwner || location) && (
        <div style={{ marginBottom: 15 }}>
          {currentOwner && (
            <div style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--encre)' }}>Propriétaire actuel :</strong>{' '}
              <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {currentOwner.name}
              </span>
            </div>
          )}
          {location && (
            <div>
              <strong style={{ color: 'var(--encre)' }}>Localisation actuelle :</strong>{' '}
              <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {location.name}
              </span>
            </div>
          )}
        </div>
      )}

      {previousOwners.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Propriétaires précédents :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {previousOwners.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {quetesLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Quêtes liées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {quetesLinked.map(q => (
              <span key={q.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {q.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {evenementsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Événements liés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {evenementsLinked.map(ev => (
              <span key={ev.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {ev.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedArtefact.tags && selectedArtefact.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedArtefact.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedArtefact.images && selectedArtefact.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedArtefact.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedArtefact.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
