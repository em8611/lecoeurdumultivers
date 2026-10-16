import React from 'react';

function FormProgressBar({ progress = 0, filledCount = 0, totalCount = 0, showDetails = false }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ height: 8, borderRadius: 'var(--rayon-pilule)', backgroundColor: 'var(--douceur)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: progress >= 100 ? 'var(--or)' : 'var(--coeur)',
          transition: 'width 0.2s ease'
        }} />
      </div>
      {showDetails && (
        <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
          {filledCount}/{totalCount} champs remplis ({progress}%)
        </div>
      )}
    </div>
  );
}

export default FormProgressBar;
