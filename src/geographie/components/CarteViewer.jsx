import React, { useRef, useState } from 'react';
import FicheCarteButton from '../../components/common/FicheCarteButton.jsx';

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
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>{carte.name}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => { setAddMode(!addMode); resetPointForm(); }}
            style={{
              padding: '6px 12px',
              backgroundColor: addMode ? '#dc3545' : '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            {addMode ? '✕ Annuler ajout' : '📍 Ajouter un point'}
          </button>
          <FicheCarteButton carte={carte} />
        </div>
      </div>

      {carte.description && (
        <p style={{ fontSize: 13, color: '#666', marginTop: 0 }}>{carte.description}</p>
      )}

      {addMode && (
        <div style={{ fontSize: 12, color: '#17a2b8', marginBottom: 8, fontStyle: 'italic' }}>
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
            style={{ maxWidth: '100%', display: 'block', borderRadius: 6, border: '1px solid #ddd', cursor: addMode ? 'crosshair' : 'default' }}
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
                fontSize: 22,
                filter: activePointId === point.id ? 'drop-shadow(0 0 4px #2196f3)' : 'none'
              }}
            >
              📍
            </div>
          ))}
          {pendingPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${pendingPoint.x}%`,
                top: `${pendingPoint.y}%`,
                transform: 'translate(-50%, -100%)',
                fontSize: 22,
                opacity: 0.6
              }}
            >
              📍
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>Aucune image pour cette carte.</p>
      )}

      {activePointId && !pendingPoint && !editingPointId && (() => {
        const point = points.find(p => p.id === activePointId);
        if (!point) return null;
        const linked = resolveLink(point);
        return (
          <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #90caf9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <strong>📍 {point.label || linked?.name || 'Point sans nom'}</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => handleEditPoint(point)} style={{ padding: '3px 8px', fontSize: 11, border: '1px solid #ccc', borderRadius: 4, background: 'white', cursor: 'pointer' }}>✏️</button>
                <button onClick={() => handleDeletePoint(point.id)} style={{ padding: '3px 8px', fontSize: 11, border: 'none', borderRadius: 4, background: '#dc3545', color: 'white', cursor: 'pointer' }}>✕</button>
              </div>
            </div>
            {point.description && <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#555' }}>{point.description}</p>}
            {linked && (
              <div style={{ marginTop: 6, fontSize: 12, color: '#1976d2' }}>
                {point.linkType === 'location' ? '🗺️ Lieu lié : ' : '🏔️ Territoire lié : '}{linked.name}
              </div>
            )}
          </div>
        );
      })()}

      {(pendingPoint || editingPointId) && (
        <form onSubmit={handleSavePoint} style={{ marginTop: 12, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6, border: '1px solid #dee2e6' }}>
          <h4 style={{ marginTop: 0, marginBottom: 10 }}>{editingPointId ? 'Modifier le point' : 'Nouveau point'}</h4>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold' }}>Nom du point</label>
            <input
              type="text"
              value={pointForm.label}
              onChange={(e) => setPointForm({ ...pointForm, label: e.target.value })}
              style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da', boxSizing: 'border-box' }}
              placeholder="Ex: La Tour de Cristal"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold' }}>Description</label>
            <textarea
              value={pointForm.description}
              onChange={(e) => setPointForm({ ...pointForm, description: e.target.value })}
              rows={2}
              style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold' }}>Lien</label>
              <select
                value={pointForm.linkType}
                onChange={(e) => setPointForm({ ...pointForm, linkType: e.target.value, linkId: '' })}
                style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da' }}
              >
                <option value="none">Aucun</option>
                <option value="location">Lieu (Éléments)</option>
                <option value="territoire">Territoire</option>
              </select>
            </div>
            {pointForm.linkType !== 'none' && (
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 'bold' }}>
                  {pointForm.linkType === 'location' ? 'Lieu' : 'Territoire'}
                </label>
                <select
                  value={pointForm.linkId}
                  onChange={(e) => setPointForm({ ...pointForm, linkId: e.target.value })}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ced4da' }}
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
            <button type="submit" style={{ padding: '6px 14px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}>
              ✓ Enregistrer
            </button>
            <button type="button" onClick={() => { resetPointForm(); setAddMode(false); }} style={{ padding: '6px 14px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
              ✕ Annuler
            </button>
          </div>
        </form>
      )}

      {points.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong style={{ fontSize: 13 }}>Points de cette carte ({points.length}) :</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {points.map(point => (
              <button
                key={point.id}
                onClick={() => setActivePointId(activePointId === point.id ? null : point.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 12,
                  fontSize: 12,
                  border: activePointId === point.id ? '1px solid #2196f3' : '1px solid #ced4da',
                  backgroundColor: activePointId === point.id ? '#e3f2fd' : 'white',
                  color: activePointId === point.id ? '#1976d2' : '#555',
                  cursor: 'pointer'
                }}
              >
                📍 {point.label || resolveLink(point)?.name || 'Sans nom'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
