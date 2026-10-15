import React, { useState } from 'react';
import FormField from '../../../components/common/FormField.jsx';

const ANIMATION_TYPES = [
  'Idle',
  'Combat',
  'Posture',
  'Danse',
  'Déplacement',
  'Réaction',
  'Émotion',
  'Compétence',
  'Cinématique'
];

function AnimationSection({ formData, onInputChange }) {
  const animations = Array.isArray(formData.animations) ? formData.animations : [];
  const [animationType, setAnimationType] = useState('Idle');
  const [animationDescription, setAnimationDescription] = useState('');

  const addAnimation = () => {
    const description = animationDescription.trim();
    if (!description) return;

    const newAnimations = [...animations, { type: animationType, description }];
    onInputChange('animations', newAnimations);
    setAnimationDescription('');
  };

  const removeAnimation = (index) => {
    const newAnimations = animations.filter((_, i) => i !== index);
    onInputChange('animations', newAnimations);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      addAnimation();
    }
  };

  return (
    <div className="form-section-card form-grid">
      <div className="form-full">
        <label className="form-label">Ajouter une animation</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <select
              className="form-input"
              value={animationType}
              onChange={(e) => setAnimationType(e.target.value)}
            >
              {ANIMATION_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="form-input"
              value={animationDescription}
              onChange={(e) => setAnimationDescription(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Description de l'animation..."
            />
          </div>
          <button type="button" className="btn-secondary" onClick={addAnimation}>Ajouter</button>
        </div>
      </div>

      {animations.length > 0 && (
        <div className="form-full">
          <label className="form-label">Animations du personnage</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {animations.map((anim, idx) => (
              <div
                key={`${anim.type}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              >
                <span
                  style={{
                    padding: '4px 8px',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.85em',
                    fontWeight: 'bold',
                    minWidth: '80px',
                    textAlign: 'center'
                  }}
                >
                  {anim.type}
                </span>
                <span style={{ flex: 1, color: '#374151' }}>{anim.description}</span>
                <button
                  type="button"
                  onClick={() => removeAnimation(idx)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.85em'
                  }}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimationSection;
