import React from 'react';
import FicheTerritoireButton from '../../components/common/FicheTerritoireButton.jsx';

export default function TerritoireDetails({ selectedTerritoire, territoires, cartes, onSelectTerritoire }) {
  const parent = selectedTerritoire.parentId
    ? territoires.find(t => t.id === selectedTerritoire.parentId)
    : null;
  const children = territoires.filter(t => t.parentId === selectedTerritoire.id);
  const linkedCartes = cartes.filter(c => c.territoireId === selectedTerritoire.id);

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
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedTerritoire.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>{selectedTerritoire.type}</div>
        </div>
        <FicheTerritoireButton territoire={selectedTerritoire} />
      </div>

      {parent && (
        <div style={{ marginBottom: 12, fontSize: 13 }}>
          <strong style={{ color: 'var(--encre)' }}>Appartient à :</strong>{' '}
          <button
            onClick={() => onSelectTerritoire(parent)}
            style={{ padding: '3px 10px', backgroundColor: 'var(--douceur)', color: 'var(--coeur)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, cursor: 'pointer' }}
          >
            {parent.name}
          </button>
        </div>
      )}

      {selectedTerritoire.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedTerritoire.description}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 15, fontSize: 14, color: 'var(--encre)' }}>
        {selectedTerritoire.climate && <div><strong>Climat :</strong> {selectedTerritoire.climate}</div>}
        {selectedTerritoire.population && <div><strong>Population :</strong> {selectedTerritoire.population}</div>}
      </div>

      {children.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Sous-territoires ({children.length}) :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => onSelectTerritoire(child)}
                style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}
              >
                {child.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {linkedCartes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Cartes associées ({linkedCartes.length}) :</strong>
          <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, fontSize: 13, color: 'var(--encre)' }}>
            {linkedCartes.map(c => <li key={c.id}>{c.name}</li>)}
          </ul>
        </div>
      )}

      {selectedTerritoire.tags && selectedTerritoire.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTerritoire.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTerritoire.images && selectedTerritoire.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTerritoire.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedTerritoire.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
