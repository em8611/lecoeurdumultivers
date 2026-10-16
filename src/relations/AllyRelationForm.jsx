import React from 'react';

export default function AllyRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ marginBottom: 15, padding: 15, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: 'var(--coeur)' }}>Alliance – Détails</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 15 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Portée de l'alliance</label>
          <select
            value={formData.allianceScope || ''}
            onChange={(e) => handle('allianceScope', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Opérationnelle">Opérationnelle</option>
            <option value="Stratégique">Stratégique</option>
            <option value="Long terme">Long terme</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Motivation principale</label>
          <select
            value={formData.allianceMotivation || ''}
            onChange={(e) => handle('allianceMotivation', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Ennemi commun">Ennemi commun</option>
            <option value="Bénéfices mutuels">Bénéfices mutuels</option>
            <option value="Idéologie">Idéologie</option>
            <option value="Dette">Dette</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Partage de ressources</label>
          <select
            value={formData.resourceSharing || ''}
            onChange={(e) => handle('resourceSharing', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="Conditionnel">Conditionnel</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Tolérance au risque</label>
          <select
            value={formData.riskTolerance || ''}
            onChange={(e) => handle('riskTolerance', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Faible">Faible</option>
            <option value="Moyen">Moyen</option>
            <option value="Élevé">Élevé</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de confiance</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.allianceTrustLevel || 3}
            onChange={(e) => handle('allianceTrustLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
            {['Fragile', 'Prudent', 'Solide', 'Élevé', 'Total'][((formData.allianceTrustLevel || 3) - 1)]}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fréquence de coordination</label>
          <select
            value={formData.coordinationFrequency || ''}
            onChange={(e) => handle('coordinationFrequency', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Quotidienne">Quotidienne</option>
            <option value="Hebdomadaire">Hebdomadaire</option>
            <option value="Mensuelle">Mensuelle</option>
            <option value="Ad hoc">Ad hoc</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de secret</label>
          <select
            value={formData.secrecyLevel || ''}
            onChange={(e) => handle('secrecyLevel', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Ouverte">Ouverte</option>
            <option value="Discrète">Discrète</option>
            <option value="Secrète">Secrète</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Types de soutien</label>
          <input
            type="text"
            value={formData.supportTypes || ''}
            onChange={(e) => handle('supportTypes', e.target.value)}
            placeholder="Renseignements, logistique, militaire, financier... (séparer par des virgules)"
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Termes / Conditions</label>
          <textarea
            rows={2}
            value={formData.allianceTerms || ''}
            onChange={(e) => handle('allianceTerms', e.target.value)}
            placeholder="Ce que chacun s'engage à faire, limites, clauses..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Nom du pacte</label>
          <input
            type="text"
            value={formData.pactName || ''}
            onChange={(e) => handle('pactName', e.target.value)}
            placeholder="Nom ou référence symbolique"
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Symbole</label>
          <input
            type="text"
            value={formData.pactSymbol || ''}
            onChange={(e) => handle('pactSymbol', e.target.value)}
            placeholder="Sceau, insigne, couleur..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Début d'alliance</label>
          <input
            type="date"
            value={formData.allianceStartDate || ''}
            onChange={(e) => handle('allianceStartDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fin d'alliance</label>
          <input
            type="date"
            value={formData.allianceEndDate || ''}
            onChange={(e) => handle('allianceEndDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes</label>
          <textarea
            rows={2}
            value={formData.allianceNotes || ''}
            onChange={(e) => handle('allianceNotes', e.target.value)}
            placeholder="Historique, incidents, conditions spéciales, personnes clés..."
            style={{ width: '100%', padding: 8, border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
