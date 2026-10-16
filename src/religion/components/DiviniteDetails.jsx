import React from 'react';
import FicheDiviniteButton from '../../components/common/FicheDiviniteButton.jsx';

export default function DiviniteDetails({ selectedDivinite, getCharacterById, getConceptById }) {
  const avatars = (selectedDivinite.avatarCharacterIds || []).map(getCharacterById).filter(Boolean);
  const conceptsLinked = (selectedDivinite.conceptIds || []).map(getConceptById).filter(Boolean);

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedDivinite.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedDivinite.pantheon || 'Panthéon inconnu'}
          </div>
        </div>
        <FicheDiviniteButton divinite={selectedDivinite} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedDivinite.status}
        </span>
        {selectedDivinite.alignment && (
          <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
            {selectedDivinite.alignment}
          </span>
        )}
      </div>

      {selectedDivinite.domains && selectedDivinite.domains.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Domaines d'influence :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.domains.map((d, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedDivinite.description}</p>
        </div>
      )}

      {selectedDivinite.origin && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Origine / Mythe de naissance :</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--encre)', whiteSpace: 'pre-wrap' }}>{selectedDivinite.origin}</p>
        </div>
      )}

      {selectedDivinite.symbols && selectedDivinite.symbols.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Symboles :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.symbols.map((s, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.followers && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Fidèles / Culte :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedDivinite.followers}</p>
        </div>
      )}

      {avatars.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Avatars / Incarnations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {avatars.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {conceptsLinked.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Concepts / Lois divines :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {conceptsLinked.map(c => (
              <span key={c.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.tags && selectedDivinite.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedDivinite.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedDivinite.images && selectedDivinite.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedDivinite.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedDivinite.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
