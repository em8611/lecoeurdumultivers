import React from 'react';

export default function PouvoirFilters({ filterType, setFilterType, filterLevel, setFilterLevel }) {
  return (
    <div style={{
      display: 'flex',
      gap: 15,
      marginBottom: 20,
      padding: 12,
      backgroundColor: '#f8f9fa',
      borderRadius: 6
    }}>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>
          Type
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            width: '100%',
            padding: 6,
            borderRadius: 4,
            border: '1px solid #ced4da',
            fontSize: 14
          }}
        >
          <option value="Tous">Tous</option>
          <option value="Pouvoir">Pouvoir</option>
          <option value="Compétence">Compétence</option>
          <option value="Technique">Technique</option>
          <option value="Sort">Sort</option>
          <option value="Capacité">Capacité</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: 5, fontSize: 12, fontWeight: 'bold' }}>
          Niveau
        </label>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            width: '100%',
            padding: 6,
            borderRadius: 4,
            border: '1px solid #ced4da',
            fontSize: 14
          }}
        >
          <option value="Tous">Tous</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
          <option value="Expert">Expert</option>
          <option value="Maître">Maître</option>
          <option value="Légendaire">Légendaire</option>
        </select>
      </div>
    </div>
  );
}
