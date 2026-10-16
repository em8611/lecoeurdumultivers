import React from 'react';

export default function IdolFanaticRelationForm({ formData, setFormData }) {
  const isIdol = formData.type === 'Idole';
  const isFanatic = formData.type === 'Fanatique';
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ marginBottom: 20, padding: 20, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)', borderLeft: isFanatic ? "3px solid var(--or)" : undefined }}>
      <h4 style={{ marginTop: 0, marginBottom: 14, color: 'var(--coeur)' }}>
        {isIdol && 'Relation d\'admiration (Idole)'}
        {isFanatic && 'Relation obsessionnelle (Fanatique)'}
      </h4>
      {isFanatic && (
        <div style={{ padding: 10, backgroundColor: 'var(--douceur)', border: '1px solid var(--trait)', borderLeft: '3px solid var(--or)', borderRadius: 'var(--rayon-carte)', marginBottom: 16, fontSize: 13, color: 'var(--encre)' }}>
          <strong>Avertissement :</strong> Cette relation peut impliquer des comportements risqués ou instables.
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 22 }}>
        {isIdol && (
          <>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Personna publique</label>
              <textarea
                rows={2}
                value={formData.idolPublicPersona || ''}
                onChange={(e) => handle('idolPublicPersona', e.target.value)}
                placeholder="Image projetée, réputation, rôle social..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Personna réelle connue</label>
              <textarea
                rows={2}
                value={formData.idolRealPersona || ''}
                onChange={(e) => handle('idolRealPersona', e.target.value)}
                placeholder="Traits privés, contradictions, comportement réel..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Distance perçue: {formData.idolDistanceLevel || 3}/5</label>
              <input
                type="range"
                min={1}
                max={5}
                value={formData.idolDistanceLevel || 3}
                onChange={(e) => handle('idolDistanceLevel', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: 12, marginTop: 4, color: 'var(--encre-douce)' }}>
                {['Très proche', 'Accessible', 'Modérée', 'Difficile', 'Inatteignable'][(formData.idolDistanceLevel || 3) - 1]}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Zones d'influence</label>
              <input
                type="text"
                value={formData.idolInfluenceAreas || ''}
                onChange={(e) => handle('idolInfluenceAreas', e.target.value)}
                placeholder="Art, politique, technologie..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Fréquence d'accès</label>
              <input
                type="text"
                value={formData.idolAccessFrequency || ''}
                onChange={(e) => handle('idolAccessFrequency', e.target.value)}
                placeholder="Rencontres, interactions, événements..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Perception des admirateurs</label>
              <textarea
                rows={2}
                value={formData.idolFanPerception || ''}
                onChange={(e) => handle('idolFanPerception', e.target.value)}
                placeholder="Comment les fans la/le voient, mythes, exagérations..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Contradictions notables</label>
              <textarea
                rows={2}
                value={formData.idolContradictions || ''}
                onChange={(e) => handle('idolContradictions', e.target.value)}
                placeholder="Écart entre image publique et réalité..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Limites / Frontières</label>
              <textarea
                rows={2}
                value={formData.idolBoundaries || ''}
                onChange={(e) => handle('idolBoundaries', e.target.value)}
                placeholder="Ce que l'idole refuse, zones protégées..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
          </>
        )}
        {isFanatic && (
          <>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Niveau de dévotion: {formData.fanaticDevotionLevel || 3}/5</label>
              <input
                type="range"
                min={1}
                max={5}
                value={formData.fanaticDevotionLevel || 3}
                onChange={(e) => handle('fanaticDevotionLevel', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: 12, marginTop: 4, color: 'var(--encre-douce)' }}>
                {['Intérêt ponctuel', 'Suiveur', 'Engagé', 'Dévoué', 'Fanatique extrême'][(formData.fanaticDevotionLevel || 3) - 1]}
              </div>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Système de croyances</label>
              <textarea
                rows={2}
                value={formData.fanaticBeliefSystem || ''}
                onChange={(e) => handle('fanaticBeliefSystem', e.target.value)}
                placeholder="Idéalisation, dogmes personnels..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Motivations principales</label>
              <textarea
                rows={2}
                value={formData.fanaticMotivations || ''}
                onChange={(e) => handle('fanaticMotivations', e.target.value)}
                placeholder="Reconnaissance, fusion, protection, contrôle..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Schémas comportementaux</label>
              <textarea
                rows={2}
                value={formData.fanaticBehaviorPatterns || ''}
                onChange={(e) => handle('fanaticBehaviorPatterns', e.target.value)}
                placeholder="Surveillance, collection, intrusion..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Risques</label>
              <input
                type="text"
                value={formData.fanaticRisks || ''}
                onChange={(e) => handle('fanaticRisks', e.target.value)}
                placeholder="Violence potentielle, exposition, menace..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Méthodes de contrôle</label>
              <input
                type="text"
                value={formData.fanaticControlMethods || ''}
                onChange={(e) => handle('fanaticControlMethods', e.target.value)}
                placeholder="Manipulation, intimidation, menaces..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Points de déclenchement</label>
              <input
                type="text"
                value={formData.fanaticTriggerPoints || ''}
                onChange={(e) => handle('fanaticTriggerPoints', e.target.value)}
                placeholder="Rejet, compétition, critique..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Signes d'escalade</label>
              <textarea
                rows={2}
                value={formData.fanaticEscalationSigns || ''}
                onChange={(e) => handle('fanaticEscalationSigns', e.target.value)}
                placeholder="Menaces croissantes, isolement, fixation..."
                style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
