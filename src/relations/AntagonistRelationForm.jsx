import React from 'react';

export default function AntagonistRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  const threatLabel = ['Minime', 'Faible', 'Modérée', 'Élevée', 'Extrême'][((formData.threatLevel || 3) - 1)];

  return (
    <div style={{ marginBottom: 15, padding: 15, backgroundColor: '#fff7ed', borderRadius: 8, border: '2px solid #fed7aa' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#9a3412' }}>⚠️ Antagoniste – Détails</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 15 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type d'antagonisme</label>
          <select
            value={formData.antagonismType || ''}
            onChange={(e) => handle('antagonismType', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Idéologique">Idéologique</option>
            <option value="Personnel">Personnel</option>
            <option value="Territorial">Territorial</option>
            <option value="Pouvoir">Pouvoir</option>
            <option value="Ressources">Ressources</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Intention</label>
          <select
            value={formData.intentLevel || ''}
            onChange={(e) => handle('intentLevel', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Opposition">Opposition</option>
            <option value="Nuire">Nuire</option>
            <option value="Détruire">Détruire</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de menace: {formData.threatLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.threatLevel || 3}
            onChange={(e) => handle('threatLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{threatLabel}</div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Origine de l'inimitié</label>
          <textarea
            rows={2}
            value={formData.enmityOrigin || ''}
            onChange={(e) => handle('enmityOrigin', e.target.value)}
            placeholder="Trahison, rivalité ancienne, prophétie, accident..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Méthodes</label>
          <input
            type="text"
            value={formData.methods || ''}
            onChange={(e) => handle('methods', e.target.value)}
            placeholder="Manipulation, chantage, violence, subterfuge, magie..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Ressources / Réseaux</label>
          <input
            type="text"
            value={formData.resources || ''}
            onChange={(e) => handle('resources', e.target.value)}
            placeholder="Alliés, organisations, artefacts, finances..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Territoire / Zone d'influence</label>
          <input
            type="text"
            value={formData.territory || ''}
            onChange={(e) => handle('territory', e.target.value)}
            placeholder="Quartier, royaume, dimension..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Dernière confrontation</label>
          <input
            type="date"
            value={formData.lastEncounterDate || ''}
            onChange={(e) => handle('lastEncounterDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Prochain coup / Plan</label>
          <input
            type="text"
            value={formData.nextMove || ''}
            onChange={(e) => handle('nextMove', e.target.value)}
            placeholder="Ce que l'antagoniste prépare..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Points faibles</label>
          <input
            type="text"
            value={formData.weakPoints || ''}
            onChange={(e) => handle('weakPoints', e.target.value)}
            placeholder="Failles émotionnelles, techniques, politiques..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Limites morales</label>
          <select
            value={formData.moralLimits || ''}
            onChange={(e) => handle('moralLimits', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Aucune">Aucune</option>
            <option value="Faibles">Faibles</option>
            <option value="Moyennes">Moyennes</option>
            <option value="Fortes">Fortes</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de menace public</label>
          <select
            value={formData.publicThreatLevel || ''}
            onChange={(e) => handle('publicThreatLevel', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Méconnue">Méconnue</option>
            <option value="Locale">Locale</option>
            <option value="Réputée">Réputée</option>
            <option value="Mondiale">Mondiale</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Cessez-le-feu / Status</label>
          <select
            value={formData.ceasefireStatus || ''}
            onChange={(e) => handle('ceasefireStatus', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Aucun">Aucun</option>
            <option value="Temporaire">Temporaire</option>
            <option value="Fragile">Fragile</option>
            <option value="Stable">Stable</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Guerre psychologique / Notes</label>
          <textarea
            rows={2}
            value={formData.psychologicalWarfare || ''}
            onChange={(e) => handle('psychologicalWarfare', e.target.value)}
            placeholder="Menaces, rumeurs, manipulation de l'opinion, intimidation..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Levier / Moyen de pression</label>
          <input
            type="text"
            value={formData.leverage || ''}
            onChange={(e) => handle('leverage', e.target.value)}
            placeholder="Secret, otage, dette, preuve..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fcd34d', fontSize: 14 }}
          />
        </div>
      </div>
    </div>
  );
}
