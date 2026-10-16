import React from 'react';

export default function NeutralRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ marginBottom: 20, padding: 20, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: 'var(--coeur)' }}>Relation Neutre – Détails</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>

        {/* Nature de la neutralité */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Nature de la neutralité</label>
          <select
            value={formData.neutralNature || ''}
            onChange={(e) => handle('neutralNature', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Indifférence mutuelle">Indifférence mutuelle</option>
            <option value="Connaissance superficielle">Connaissance superficielle</option>
            <option value="Contexte professionnel distant">Contexte professionnel distant</option>
            <option value="Sans opinion">Sans opinion</option>
            <option value="Politesse formelle">Politesse formelle</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Fréquence de contact */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fréquence de contact</label>
          <select
            value={formData.neutralContactFrequency || ''}
            onChange={(e) => handle('neutralContactFrequency', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Jamais">Jamais</option>
            <option value="Très rare">Très rare</option>
            <option value="Occasionnel">Occasionnel</option>
            <option value="Régulier mais distant">Régulier mais distant</option>
          </select>
        </div>

        {/* Contexte de rencontre */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Contexte habituel</label>
          <input
            type="text"
            value={formData.neutralContext || ''}
            onChange={(e) => handle('neutralContext', e.target.value)}
            placeholder="Lieu, situation, cadre..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>

        {/* Niveau d'intérêt */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau d'intérêt: {formData.neutralInterestLevel || 1}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.neutralInterestLevel || 1}
            onChange={(e) => handle('neutralInterestLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
            {['Aucun', 'Très faible', 'Minime', 'Léger', 'Modéré'][((formData.neutralInterestLevel || 1) - 1)]}
          </div>
        </div>

        {/* Potentiel d'évolution */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Potentiel d'évolution</label>
          <select
            value={formData.neutralEvolutionPotential || ''}
            onChange={(e) => handle('neutralEvolutionPotential', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Aucun">Aucun</option>
            <option value="Faible">Faible</option>
            <option value="Possible">Possible</option>
            <option value="Probable">Probable</option>
          </select>
        </div>

        {/* Raison de la neutralité */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Raison de la neutralité</label>
          <textarea
            rows={2}
            value={formData.neutralReason || ''}
            onChange={(e) => handle('neutralReason', e.target.value)}
            placeholder="Pourquoi cette relation reste-t-elle neutre? Manque d'opportunité, choix délibéré, circonstances..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

        {/* Barrières potentielles */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Barrières / Obstacles</label>
          <textarea
            rows={2}
            value={formData.neutralBarriers || ''}
            onChange={(e) => handle('neutralBarriers', e.target.value)}
            placeholder="Différences culturelles, manque d'intérêts communs, distance géographique..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

        {/* Notes additionnelles */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes</label>
          <textarea
            rows={2}
            value={formData.neutralNotes || ''}
            onChange={(e) => handle('neutralNotes', e.target.value)}
            placeholder="Observations, impressions, contexte particulier..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

      </div>
    </div>
  );
}
