import React, { useState } from 'react';
import FormField from '../../../components/common/FormField.jsx';

function EquipeSection({ formData, onInputChange }) {
  const teams = Array.isArray(formData.teams) ? formData.teams : [];
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');

  const addTeam = () => {
    const name = teamName.trim();
    const role = teamRole.trim();
    if (!name) return;

    const newTeams = [...teams, { name, role: role || '' }];
    onInputChange('teams', newTeams);
    setTeamName('');
    setTeamRole('');
  };

  const removeTeam = (index) => {
    const newTeams = teams.filter((_, i) => i !== index);
    onInputChange('teams', newTeams);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTeam();
    }
  };

  return (
    <div className="form-section-card form-grid">
      <div className="form-full">
        <label className="form-label">Ajouter une équipe</label>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <input
              className="form-input"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nom de l'équipe..."
            />
          </div>
          <div>
            <input
              className="form-input"
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Fonction / Rôle..."
            />
          </div>
          <button type="button" className="btn-secondary" onClick={addTeam}>Ajouter</button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="form-full">
          <label className="form-label">Équipes du personnage</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {teams.map((team, idx) => (
              <div
                key={`${team.name}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 12px',
                  background: 'var(--douceur)',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-bouton)'
                }}
              >
                <span style={{ flex: 1, fontWeight: 'bold', color: 'var(--encre)' }}>{team.name}</span>
                {team.role && (
                  <span style={{ flex: 1, color: 'var(--encre-douce)', fontSize: '0.9em' }}>
                    ({team.role})
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeTeam(idx)}
                  style={{
                    background: '#a13d3d',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--rayon-bouton)',
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

export default EquipeSection;
