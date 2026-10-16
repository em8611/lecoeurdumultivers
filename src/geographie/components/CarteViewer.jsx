import React, { useRef, useState } from 'react';
import FicheCarteButton from '../../components/common/FicheCarteButton.jsx';

function MapPin({ active, pending }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        backgroundColor: pending ? 'var(--brume)' : 'var(--or)',
        border: `2px solid ${active ? 'var(--coeur)' : 'var(--sur-or)'}`,
        boxSizing: 'border-box'
      }}
    />
  );
}

export default function CarteViewer({ carte, onUpdatePoints, locations, territoires, getLocationById, getTerritoireById }) {
  const imageRef = useRef(null);
  const [addMode, setAddMode] = useState(false);
  const [pendingPoint, setPendingPoint] = useState(null); // { x, y }
  const [editingPointId, setEditingPointId] = useState(null);
  const [pointForm, setPointForm] = useState({ label: '', description: '', linkType: 'none', linkId: '' });
  const [activePointId, setActivePointId] = useState(null);

  const points = carte.points || [];

  const resetPointForm = () => {
    setPointForm({ label: '', description: '', linkType: 'none', linkId: '' });
    setPendingPoint(null);
    setEditingPointId(null);
  };

  const handleImageClick = (e) => {
    if (!addMode || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPendingPoint({ x, y });
    setPointForm({ label: '', description: '', linkType: 'none', linkId: '' });
    setEditingPointId(null);
  };

  const handleSavePoint = (e) => {
    e.preventDefault();
    if (editingPointId) {
      const updated = points.map(p => p.id === editingPointId ? { ...p, ...pointForm } : p);
      onUpdatePoints(updated);
    } else if (pendingPoint) {
      const newPoint = {
        id: Date.now(),
        x: pendingPoint.x,
        y: pendingPoint.y,
        ...pointForm
      };
      onUpdatePoints([...points, newPoint]);
    }
    resetPointForm();
    setAddMode(false);
  };

  const handleEditPoint = (point) => {
    setEditingPointId(point.id);
    setPendingPoint(null);
    setPointForm({
      label: point.label || '',
      description: point.description || '',
      linkType: point.linkType || 'none',
      linkId: point.linkId || ''
    });
  };

  const handleDeletePoint = (pointId) => {
    if (!window.confirm('Supprimer ce point ?')) return;
    onUpdatePoints(points.filter(p => p.id !== pointId));
    if (activePointId === pointId) setActivePointId(null);
    if (editingPointId === pointId) resetPointForm();
  };

  const resolveLink = (point) => {
    if (point.linkType === 'location' && point.linkId) return getLocationById(point.linkId);
    if (point.linkType === 'territoire' && point.linkId) return getTerritoireById(point.linkId);
    return null;
  };

  return (
    <div style={{ border: '1px solid var(--trait)', borderRadius: 'var(--rayon-carte)', padding: 16, backgroundColor: 'var(--fond-carte)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{carte.name}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => { setAddMode(!addMode); resetPointForm(); }}
            style={{
              padding: '6px 12px',
              backgroundColor: addMode ? '#a13d3d' : 'var(--or)',
              color: addMode ? 'white' : 'var(--sur-or)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            {addMode ? 'Annuler ajout' : 'Ajouter un point'}
          </button>
          <FicheCarteButton carte={carte} />
        </div>
      </div>

      {carte.description && (
        <p style={{ fontSize: 13, color: 'var(--encre-douce)', marginTop: 0 }}>{carte.description}</p>
      )}

      {addMode && (
        <div style={{ fontSize: 12, color: 'var(--coeur)', marginBottom: 8, fontStyle: 'italic' }}>
          Cliquez sur la carte pour placer un nouveau point.
        </div>
      )}

      {carte.image ? (
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          <img
            ref={imageRef}
            src={carte.image}
            alt={carte.name}
            onClick={handleImageClick}
            style={{ maxWidth: '100%', display: 'block', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)', cursor: addMode ? 'crosshair' : 'default' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {points.map(point => (
            <div
              key={point.id}
              onClick={(e) => { e.stopPropagation(); setActivePointId(activePointId === point.id ? null : point.id); }}
              title={point.label}
              style={{
                position: 'absolute',
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -100%)',
                cursor: 'pointer',
                filter: activePointId === point.id ? 'drop-shadow(0 0 4px var(--coeur))' : 'none'
              }}
            >
              <MapPin active={activePointId === point.id} />
            </div>
          ))}
          {pendingPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${pendingPoint.x}%`,
                top: `${pendingPoint.y}%`,
                transform: 'translate(-50%, -100%)',
                opacity: 0.6
              }}
            >
              <MapPin pending />
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic' }}>Aucune image pour cette carte.</p>
      )}

      {activePointId && !pendingPoint && !editingPointId && (() => {
        const point = points.find(p => p.id === activePointId);
        if (!point) return null;
        const linked = resolveLink(point);
        return (
          <div style={{ marginTop: 12, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <strong style={{ color: 'var(--encre)' }}>{point.label || linked?.name || 'Point sans nom'}</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => handleEditPoint(point)} style={{ padding: '3px 8px', fontSize: 11, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', background: 'var(--fond-carte)', color: 'var(--encre)', cursor: 'pointer' }}>Modifier</button>
                <button onClick={() => handleDeletePoint(point.id)} style={{ padding: '3px 8px', fontSize: 11, border: 'none', borderRadius: 'var(--rayon-bouton)', background: '#a13d3d', color: 'white', cursor: 'pointer' }}>Supprimer</button>
              </div>
            </div>
            {point.description && <p style={{ margin: '6px 0 0 0', fontSize: 13, color: 'var(--encre)' }}>{point.description}</p>}
            {linked && (
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--coeur)' }}>
                {point.linkType === 'location' ? 'Lieu lié : ' : 'Territoire lié : '}{linked.name}
              </div>
            )}
          </div>
        );
      })()}

      {(pendingPoint || editingPointId) && (
        <form onSubmit={handleSavePoint} style={{ marginTop: 12, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
          <h4 style={{ marginTop: 0, marginBottom: 10, color: 'var(--encre)' }}>{editingPointId ? 'Modifier le point' : 'Nouveau point'}</h4>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Nom du point</label>
            <input
              type="text"
              value={pointForm.label}
              onChange={(e) => setPointForm({ ...pointForm, label: e.target.value })}
              style={{ width: '100%', padding: 6, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', boxSizing: 'border-box' }}
              placeholder="Ex: La Tour de Cristal"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Description</label>
            <textarea
              value={pointForm.description}
              onChange={(e) => setPointForm({ ...pointForm, description: e.target.value })}
              rows={2}
              style={{ width: '100%', padding: 6, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>Lien</label>
              <select
                value={pointForm.linkType}
                onChange={(e) => setPointForm({ ...pointForm, linkType: e.target.value, linkId: '' })}
                style={{ width: '100%', padding: 6, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
              >
                <option value="none">Aucun</option>
                <option value="location">Lieu (Éléments)</option>
                <option value="territoire">Territoire</option>
              </select>
            </div>
            {pointForm.linkType !== 'none' && (
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold', color: 'var(--encre)' }}>
                  {pointForm.linkType === 'location' ? 'Lieu' : 'Territoire'}
                </label>
                <select
                  value={pointForm.linkId}
                  onChange={(e) => setPointForm({ ...pointForm, linkId: e.target.value })}
                  style={{ width: '100%', padding: 6, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
                >
                  <option value="">— Choisir —</option>
                  {(pointForm.linkType === 'location' ? locations : territoires).map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" style={{ padding: '6px 14px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
              Enregistrer
            </button>
            <button type="button" onClick={() => { resetPointForm(); setAddMode(false); }} style={{ padding: '6px 14px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontSize: 13 }}>
              Annuler
            </button>
          </div>
        </form>
      )}

      {points.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong style={{ fontSize: 13, color: 'var(--encre)' }}>Points de cette carte ({points.length}) :</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {points.map(point => (
              <button
                key={point.id}
                onClick={() => setActivePointId(activePointId === point.id ? null : point.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--rayon-pilule)',
                  fontSize: 12,
                  border: activePointId === point.id ? '1px solid var(--coeur)' : '1px solid var(--trait)',
                  backgroundColor: activePointId === point.id ? 'var(--douceur)' : 'var(--fond-carte)',
                  color: activePointId === point.id ? 'var(--coeur)' : 'var(--encre)',
                  cursor: 'pointer'
                }}
              >
                {point.label || resolveLink(point)?.name || 'Sans nom'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
