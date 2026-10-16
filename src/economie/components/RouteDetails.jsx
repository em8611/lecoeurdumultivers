import React from 'react';
import FicheRouteButton from '../../components/common/FicheRouteButton.jsx';

export default function RouteDetails({
  selectedRoute,
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
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{selectedRoute.name}</h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {from?.name || 'Départ inconnu'} → {to?.name || 'Arrivée inconnue'}
          </div>
        </div>
        <FicheRouteButton route={selectedRoute} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        <span style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
          {selectedRoute.status}
        </span>
      </div>

      {selectedRoute.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description :</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedRoute.description}</p>
        </div>
      )}

      {selectedRoute.dangers && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--or)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Dangers :</strong>
          <p style={{ margin: '8px 0 0 0', color: 'var(--encre)', lineHeight: 1.5 }}>{selectedRoute.dangers}</p>
        </div>
      )}

      {ressources.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Ressources échangées :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ressources.map(r => (
              <span key={r.id} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {r.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {equipes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Guildes / Équipes gestionnaires :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {equipes.map(e => (
              <span key={e.id} style={{ padding: '4px 10px', backgroundColor: 'var(--douceur)', color: 'var(--encre)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedRoute.tags && selectedRoute.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedRoute.tags.map((tag, idx) => (
              <span key={idx} style={{ padding: '4px 10px', backgroundColor: 'var(--or)', color: 'var(--sur-or)', borderRadius: 'var(--rayon-pilule)', fontSize: 12, fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedRoute.images && selectedRoute.images.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Illustrations :</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedRoute.images.map((src, idx) => (
              <img key={idx} src={src} alt={`${selectedRoute.name} ${idx + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
