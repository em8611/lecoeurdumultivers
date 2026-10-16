import React from 'react';

function ElementExporter({ elements }) {
  const handleExport = () => {
    const payload = { timestamp: new Date().toISOString(), ...elements };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `elements-export-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>📤 Export</h2>
      <p style={{ color: '#666' }}>Télécharge tous les éléments de l'univers sous forme d'un fichier JSON unique.</p>
      <button
        onClick={handleExport}
        style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
      >
        Télécharger le JSON
      </button>
    </div>
  );
}

export default ElementExporter;
