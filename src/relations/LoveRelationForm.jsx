import React from 'react';

export default function LoveRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  const levelLabel = ['Naissant', 'Tendre', 'Équilibré', 'Fort', 'Total'][((formData.commitmentLevel || 3) - 1)];
  const jealousyLabel = ['Aucune', 'Légère', 'Modérée', 'Forte', 'Toxique'][((formData.jealousyLevel || 2) - 1)];

  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#fff1f2', borderRadius: 12, border: '1px solid #fecdd3' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#be123c' }}>❤️ Relation amoureuse – Détails</h4>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Statut romantique</label>
          <select
            value={formData.romanticStatus || ''}
            onChange={(e) => handle('romanticStatus', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Naissante">Naissante</option>
            <option value="En couple">En couple</option>
            <option value="Complicité">Complicité</option>
            <option value="Union">Union</option>
            <option value="Compliqué">Compliqué</option>
            <option value="Séparés">Séparés</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Engagement: {formData.commitmentLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.commitmentLevel || 3}
            onChange={(e) => handle('commitmentLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{levelLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Jalousie: {formData.jealousyLevel || 2}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.jealousyLevel || 2}
            onChange={(e) => handle('jealousyLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{jealousyLabel}</div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Co-habitation</label>
          <select
            value={formData.cohabitationStatus || ''}
            onChange={(e) => handle('cohabitationStatus', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Non">Non</option>
            <option value="Parfois">Parfois</option>
            <option value="Oui">Oui</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Langages de l'amour</label>
          <input
            type="text"
            value={formData.loveLanguages || ''}
            onChange={(e) => handle('loveLanguages', e.target.value)}
            placeholder="Mots, temps, cadeaux, services, contact..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Relation secrète ?</label>
          <select
            value={formData.secretRelationship || ''}
            onChange={(e) => handle('secretRelationship', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Non">Non</option>
            <option value="Oui">Oui</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Approbation familiale</label>
          <select
            value={formData.familyApproval || ''}
            onChange={(e) => handle('familyApproval', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="Partiel">Partiel</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Anniversaire</label>
          <input
            type="date"
            value={formData.anniversaryDate || ''}
            onChange={(e) => handle('anniversaryDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Histoire de la rencontre</label>
          <textarea
            rows={2}
            value={formData.firstMeetingStory || ''}
            onChange={(e) => handle('firstMeetingStory', e.target.value)}
            placeholder="Rencontre, déclic, contexte..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Rituels / Habitudes</label>
          <input
            type="text"
            value={formData.sharedRituals || ''}
            onChange={(e) => handle('sharedRituals', e.target.value)}
            placeholder="Rendez-vous, codes, traditions..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Lignes rouges / Incompatibilités</label>
          <input
            type="text"
            value={formData.dealBreakers || ''}
            onChange={(e) => handle('dealBreakers', e.target.value)}
            placeholder="Valeurs, comportements, limites..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14 }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Intimité / Notes</label>
          <textarea
            rows={2}
            value={formData.intimacyNotes || ''}
            onChange={(e) => handle('intimacyNotes', e.target.value)}
            placeholder="Confiance, vulnérabilités, respect du consentement..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fda4af', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
