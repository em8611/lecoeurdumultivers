import React from 'react';
import FicheTraditionButton from '../../components/common/FicheTraditionButton.jsx';

export default function TraditionDetails({
  selectedTradition,
  getCategoryIcon,
  getEquipeById,
  getTerritoireById
}) {
  const equipes = (selectedTradition.equipeIds || []).map(getEquipeById).filter(Boolean);
  const territoires = (selectedTradition.territoireIds || []).map(getTerritoireById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedTradition.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedTradition.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>{selectedTradition.category || 'Catégorie inconnue'}</div>
        </div>
        <FicheTraditionButton tradition={selectedTradition} />
      </div>

      {selectedTradition.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedTradition.description}</p>
        </div>
      )}

      {selectedTradition.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong>📜 Origine / Histoire :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedTradition.origin}</p>
        </div>
      )}

      {selectedTradition.practice && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>🎭 Déroulement / Pratique :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedTradition.practice}</p>
        </div>
      )}

      {selectedTradition.significance && (
        <div style={{ marginBottom: 15 }}>
          <strong>✨ Signification / Symbolique :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedTradition.significance}</p>
        </div>
      )}

      {equipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>👥 Peuples / Équipes pratiquants :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipes.map(e => (
              <span key={e.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {territoires.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏔️ Territoires associés :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {territoires.map(t => (
              <span key={t.id} style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTradition.tags && selectedTradition.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedTradition.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedTradition.images && selectedTradition.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedTradition.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedTradition.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
