import React from 'react';

export default function RivalryRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  const escalationLabel = ['Latente', 'Mineure', 'Active', 'Intense', 'Critique'][((formData.escalationLevel || 3) - 1)];
  const respectLabel = ['Aucun', 'Faible', 'Mitigé', 'Présent', 'Elevé'][((formData.respectLevel || 3) - 1)];

  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#f0f9ff', borderRadius: 12, border: '1px solid #bae6fd' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#0369a1' }}>⚔️ Rivalité – Détails</h4>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type de compétition</label>
          <select
            value={formData.competitionType || ''}
            onChange={(e) => handle('competitionType', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Statut">Statut</option>
            <option value="Pouvoir">Pouvoir</option>
            <option value="Ressources">Ressources</option>
            <option value="Influence">Influence</option>
            <option value="Performance">Performance</option>
            <option value="Survie">Survie</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Origine de la rivalité</label>
          <textarea
            rows={2}
            value={formData.rivalryOrigin || ''}
            onChange={(e) => handle('rivalryOrigin', e.target.value)}
            placeholder="Incident déclencheur, héritage, conflit idéologique..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau d'escalade: {formData.escalationLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.escalationLevel || 3}
            onChange={(e) => handle('escalationLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{escalationLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Respect mutuel: {formData.respectLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.respectLevel || 3}
            onChange={(e) => handle('respectLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{respectLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fair-play</label>
          <select
            value={formData.fairnessLevel || ''}
            onChange={(e) => handle('fairnessLevel', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Elevé">Élevé</option>
            <option value="Correct">Correct</option>
            <option value="Limité">Limité</option>
            <option value="Aucun">Aucun</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Score / Avantage actuel</label>
          <input
            type="text"
            value={formData.currentScore || ''}
            onChange={(e) => handle('currentScore', e.target.value)}
            placeholder="Ex: 3-2, Supériorité tactique..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Trêve / Pause</label>
          <select
            value={formData.truceStatus || ''}
            onChange={(e) => handle('truceStatus', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Aucune">Aucune</option>
            <option value="Temporaire">Temporaire</option>
            <option value="Fragile">Fragile</option>
            <option value="Stable">Stable</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Sabotage / Coup bas</label>
          <select
            value={formData.sabotageNotes || ''}
            onChange={(e) => handle('sabotageNotes', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Jamais">Jamais</option>
            <option value="Occasionnel">Occasionnel</option>
            <option value="Fréquent">Fréquent</option>
            <option value="Systématique">Systématique</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Perception publique</label>
          <select
            value={formData.publicPerception || ''}
            onChange={(e) => handle('publicPerception', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Méconnue">Méconnue</option>
            <option value="Locale">Locale</option>
            <option value="Réputée">Réputée</option>
            <option value="Célèbre">Célèbre</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Alliés impliqués</label>
          <input
            type="text"
            value={formData.alliesInvolved || ''}
            onChange={(e) => handle('alliesInvolved', e.target.value)}
            placeholder="Nom(s), factions, soutien externe..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Prochaine confrontation (date)</label>
          <input
            type="date"
            value={formData.nextConfrontationDate || ''}
            onChange={(e) => handle('nextConfrontationDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Affrontements notables</label>
          <textarea
            rows={2}
            value={formData.notableClashes || ''}
            onChange={(e) => handle('notableClashes', e.target.value)}
            placeholder="Moments marquants, retournements, humiliations..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Règles tacites / Engagement</label>
          <textarea
            rows={2}
            value={formData.rulesOfEngagement || ''}
            onChange={(e) => handle('rulesOfEngagement', e.target.value)}
            placeholder="Limites acceptées, code d'honneur..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Enjeux / Stakes</label>
          <textarea
            rows={2}
            value={formData.stakes || ''}
            onChange={(e) => handle('stakes', e.target.value)}
            placeholder="Ce qui est en jeu: réputation, territoire, pouvoir..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #7dd3fc', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
