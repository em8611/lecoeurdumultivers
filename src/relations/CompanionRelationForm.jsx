import React, { useMemo } from 'react';

export default function CompanionRelationForm({ formData, setFormData }) {
  const bondLabel = ['Faible', 'Naissant', 'Solide', 'Fort', 'Fusionnel'][((formData.bondLevel || 3) - 1)];
  const autonomyLabel = ['Totalement dépendant', 'Dépendant', 'Semi-autonome', 'Autonome', 'Indépendant'][((formData.autonomyLevel || 3) - 1)];
  const trainingLabel = ['Non entraîné', 'Début', 'Basique', 'Avancé', 'Expert'][((formData.trainingLevel || 3) - 1)];

  const needsPlaceholder = 'Alimentation, énergie, entretien, particularités biologiques...';
  const abilitiesPlaceholder = 'Capacités spéciales, compétences, pouvoirs...';

  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#fffbea', borderRadius: 12, border: '2px solid #fde68a' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#92400e' }}>🐾 Compagnon – Détails enrichis</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type de compagnon</label>
          <select
            value={formData.companionType || ''}
            onChange={(e) => handle('companionType', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Animal">Animal</option>
            <option value="Créature magique">Créature magique</option>
            <option value="Robot">Robot</option>
            <option value="Esprit">Esprit</option>
            <option value="Symbiote">Symbiote</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Espèce / Modèle</label>
          <input
            type="text"
            value={formData.companionSpecies || ''}
            onChange={(e) => handle('companionSpecies', e.target.value)}
            placeholder="Espèce, série, classification..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Origine</label>
          <input
            type="text"
            value={formData.companionOrigin || ''}
            onChange={(e) => handle('companionOrigin', e.target.value)}
            placeholder="Lieu, créateur, circonstances..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Capacités / Pouvoirs</label>
          <textarea
            rows={2}
            value={formData.companionAbilities || ''}
            onChange={(e) => handle('companionAbilities', e.target.value)}
            placeholder={abilitiesPlaceholder}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Besoins / Entretien</label>
          <textarea
            rows={2}
            value={formData.companionNeeds || ''}
            onChange={(e) => handle('companionNeeds', e.target.value)}
            placeholder={needsPlaceholder}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        {/* Niveaux relationnels */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Lien affectif: {formData.bondLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.bondLevel || 3}
            onChange={(e) => handle('bondLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{bondLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Autonomie: {formData.autonomyLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.autonomyLevel || 3}
            onChange={(e) => handle('autonomyLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{autonomyLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau d'entraînement: {formData.trainingLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.trainingLevel || 3}
            onChange={(e) => handle('trainingLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{trainingLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Responsable des soins</label>
          <input
            type="text"
            value={formData.careResponsibility || ''}
            onChange={(e) => handle('careResponsibility', e.target.value)}
            placeholder="Qui s'en occupe principalement?"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Voyagent ensemble?</label>
          <select
            value={formData.travelTogether || ''}
            onChange={(e) => handle('travelTogether', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Toujours">Toujours</option>
            <option value="Souvent">Souvent</option>
            <option value="Parfois">Parfois</option>
            <option value="Rarement">Rarement</option>
            <option value="Jamais">Jamais</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Première rencontre (date)</label>
          <input
            type="date"
            value={formData.firstEncounterDate || ''}
            onChange={(e) => handle('firstEncounterDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Activités favorites ensemble</label>
          <input
            type="text"
            value={formData.favoriteActivities || ''}
            onChange={(e) => handle('favoriteActivities', e.target.value)}
            placeholder="Course, chasse, méditation..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Durée de vie estimée</label>
          <input
            type="text"
            value={formData.expectedLifespan || ''}
            onChange={(e) => handle('expectedLifespan', e.target.value)}
            placeholder="Ex: 12 ans, cycle énergétique illimité..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes santé / risques</label>
          <textarea
            rows={2}
            value={formData.healthNotes || ''}
            onChange={(e) => handle('healthNotes', e.target.value)}
            placeholder="Fragilités, pathologies, maintenance spéciale, évolution possible..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d6bcfa', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
