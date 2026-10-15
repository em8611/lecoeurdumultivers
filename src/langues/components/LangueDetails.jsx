import React from 'react';
import FicheLangueButton from '../../components/common/FicheLangueButton.jsx';

export default function LangueDetails({
  selectedLangue,
  getStatusIcon,
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
      border: '1px solid #ddd',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#ffffff',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <span style={{ fontSize: 32 }}>{getStatusIcon(selectedLangue.status)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedLangue.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedLangue.family || 'Famille inconnue'}
          </div>
        </div>
        <FicheLangueButton langue={selectedLangue} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {selectedLangue.status}
        </span>
        {selectedLangue.writingSystem && (
          <span style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
            ✍️ {selectedLangue.writingSystem}
          </span>
        )}
      </div>

      {selectedLangue.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedLangue.description}</p>
        </div>
      )}

      {selectedLangue.phonetics && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>🔊 Phonétique / Prononciation :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedLangue.phonetics}</p>
        </div>
      )}

      {selectedLangue.grammar && (
        <div style={{ marginBottom: 15 }}>
          <strong>📐 Grammaire :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedLangue.grammar}</p>
        </div>
      )}

      {selectedLangue.samplePhrases && selectedLangue.samplePhrases.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>💬 Phrases types :</strong>
          <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, color: '#555', lineHeight: 1.6 }}>
            {selectedLangue.samplePhrases.map((phrase, idx) => (
              <li key={idx}>{phrase}</li>
            ))}
          </ul>
        </div>
      )}

      {relatedLangues.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Langues apparentées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedLangues.map(l => (
              <button
                key={l.id}
                onClick={() => onSelectLangue(l)}
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
                {getStatusIcon(l.status)} {l.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏔️ Territoires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipesLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>👥 Peuples / Équipes locuteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipesLinked.map(e => (
              <span key={e.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🧑 Personnages locuteurs :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {characters.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: '#ffe0b2', color: '#a15c00', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedLangue.tags && selectedLangue.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedLangue.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedLangue.images && selectedLangue.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedLangue.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedLangue.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
