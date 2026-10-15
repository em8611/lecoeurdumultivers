import React from 'react';

function FormProgressBar({ progress = 0, filledCount = 0, totalCount = 0, showDetails = false }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ height: 8, borderRadius: 4, backgroundColor: '#e9ecef', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: progress >= 100 ? '#28a745' : '#007bff',
          transition: 'width 0.2s ease'
        }} />
      </div>
      {showDetails && (
        <div style={{ fontSize: 12, color: '#6c757d', marginTop: 4 }}>
          {filledCount}/{totalCount} champs remplis ({progress}%)
        </div>
      )}
    </div>
  );
}

export default FormProgressBar;
