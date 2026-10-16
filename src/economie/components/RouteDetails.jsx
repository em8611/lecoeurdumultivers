import React from 'react';
import FicheRouteButton from '../../components/common/FicheRouteButton.jsx';

export default function RouteDetails({
  selectedRoute,
  getStatusIcon,
  getTerritoireById,
  getRessourceById,
  getEquipeById
}) {
  const from = selectedRoute.fromTerritoireId ? getTerritoireById(selectedRoute.fromTerritoireId) : null;
  const to = selectedRoute.toTerritoireId ? getTerritoireById(selectedRoute.toTerritoireId) : null;
  const ressources = (selectedRoute.ressourceIds || []).map(getRessourceById).filter(Boolean);
  const equipes = (selectedRoute.equipeIds || []).map(getEquipeById).filter(Boolean);

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
        <span style={{ fontSize: 32 }}>{getStatusIcon(selectedRoute.status)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>{selectedRoute.name}</h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {from?.name || 'Départ inconnu'} → {to?.name || 'Arrivée inconnue'}
          </div>
        </div>
        <FicheRouteButton route={selectedRoute} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
          {selectedRoute.status}
        </span>
      </div>

      {selectedRoute.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>📘 Description :</strong>
          <p style={{ margin: '4px 0', color: '#555', lineHeight: 1.5 }}>{selectedRoute.description}</p>
        </div>
      )}

      {selectedRoute.dangers && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <strong style={{ color: '#2196f3' }}>⚠️ Dangers :</strong>
          <p style={{ margin: '8px 0 0 0', color: '#555', lineHeight: 1.5 }}>{selectedRoute.dangers}</p>
        </div>
      )}

      {ressources.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>💰 Ressources échangées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ressources.map(r => (
              <span key={r.id} style={{ padding: '4px 10px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {r.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏴 Guildes / Équipes gestionnaires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipes.map(e => (
              <span key={e.id} style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', color: '#6a1b9a', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedRoute.tags && selectedRoute.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedRoute.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fce4ec', color: '#ad1457', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedRoute.images && selectedRoute.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🖼️ Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedRoute.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedRoute.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
