import React from 'react';
import FicheLangueButton from '../../components/common/FicheLangueButton.jsx';

export default function LangueDetails({
  selectedLangue,
  getLangueById,
  getTerritoireById,
  getEquipeById,
  getCharacterById,
  onSelectLangue
}) {
  const relatedLangues = (selectedLangue.relatedLanguageIds || []).map(getLangueById).filter(Boolean);
  const territoires = (selectedLangue.territoireIds || []).map(getTerritoireById).filter(Boolean);
  const equipesLinked = (selectedLangue.equipeIds || []).map(getEquipeById).filter(Boolean);
  const characters = (selectedLangue.characterIds || []).map(getCharacterById).filter(Boolean);

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedLangue.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedLangue.family || 'Famille inconnue'}
          </div>
        </div>
        <FicheLangueButton langue={selectedLangue} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedLangue.status}
        </span>
        {selectedLangue.writingSystem && (
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            {selectedLangue.writingSystem}
          </span>
        )}
      </div>

      {selectedLangue.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedLangue.description}</p>
        </div>
      )}

      {selectedLangue.phonetics && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Phonétique / Prononciation :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedLangue.phonetics}</p>
        </div>
      )}

      {selectedLangue.grammar && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Grammaire :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedLangue.grammar}</p>
        </div>
      )}

      {selectedLangue.samplePhrases && selectedLangue.samplePhrases.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Phrases types :</strong>
          <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, color: 'var(--encre)', lineHeight: 1.6 }}>
            {selectedLangue.samplePhrases.map((phrase, idx) => (
              <li key={idx}>{phrase}</li>
            ))}
          </ul>
        </div>
      )}

      {relatedLangues.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Langues apparentées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedLangues.map(l => (
              <button
                key={l.id}
                onClick={() => onSelectLangue(l)}
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
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Territoires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipesLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Peuples / Équipes locuteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipesLinked.map(e => (
              <span key={e.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Personnages locuteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {characters.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedLangue.tags && selectedLangue.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedLangue.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedLangue.images && selectedLangue.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedLangue.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedLangue.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
