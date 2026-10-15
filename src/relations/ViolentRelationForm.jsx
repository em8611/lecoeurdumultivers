import React from 'react';

export default function ViolentRelationForm({ formData, setFormData }) {
  const handle = (field, value) => setFormData({ ...formData, [field]: value });

  const isMurderer = formData.type === 'Meurtrier';
  const isAbuser = formData.type === 'Abuseur';
  const isVictim = formData.type === 'Victime';

  return (
    <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#fff5f5', borderRadius: 12, border: '2px solid #fc8181' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#c53030' }}>
        ⚠️ {formData.type} – Relation traumatique
      </h4>
      <div style={{ padding: 12, backgroundColor: '#ffe5e5', border: '1px solid #fc8181', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#c53030' }}>
        <strong>Avertissement:</strong> Contenu sensible. Ces informations doivent être traitées avec précaution et respect.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>

        {/* Type de violence */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type de violence</label>
          <select
            value={formData.violenceType || ''}
            onChange={(e) => handle('violenceType', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Physique">Physique</option>
            <option value="Psychologique">Psychologique</option>
            <option value="Émotionnelle">Émotionnelle</option>
            <option value="Sexuelle">Sexuelle</option>
            <option value="Financière">Financière</option>
            <option value="Négligence">Négligence</option>
            <option value="Multiple">Multiple</option>
          </select>
        </div>

        {/* Date de l'événement */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Date de l'événement</label>
          <input
            type="date"
            value={formData.violenceDate || ''}
            onChange={(e) => handle('violenceDate', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
          />
        </div>

        {/* Durée */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Durée</label>
          <input
            type="text"
            value={formData.violenceDuration || ''}
            onChange={(e) => handle('violenceDuration', e.target.value)}
            placeholder="Ex: Incident unique, 6 mois, 2 ans..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
          />
        </div>

        {/* Fréquence */}
        {!isMurderer && (
          <div>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fréquence</label>
            <select
              value={formData.violenceFrequency || ''}
              onChange={(e) => handle('violenceFrequency', e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
            >
              <option value="">Sélectionner...</option>
              <option value="Unique">Incident unique</option>
              <option value="Rare">Rare</option>
              <option value="Occasionnelle">Occasionnelle</option>
              <option value="Fréquente">Fréquente</option>
              <option value="Quotidienne">Quotidienne</option>
              <option value="Continue">Continue</option>
            </select>
          </div>
        )}

        {/* Sévérité de la violence */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Sévérité: {formData.violenceSeverity || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.violenceSeverity || 3}
            onChange={(e) => handle('violenceSeverity', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {['Mineure', 'Modérée', 'Sérieuse', 'Grave', 'Extrême'][((formData.violenceSeverity || 3) - 1)]}
          </div>
        </div>

        {/* Niveau de trauma */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Impact traumatique: {formData.traumaLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.traumaLevel || 3}
            onChange={(e) => handle('traumaLevel', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {['Léger', 'Modéré', 'Important', 'Sévère', 'Dévastateur'][((formData.traumaLevel || 3) - 1)]}
          </div>
        </div>

        {/* Champs spécifiques Meurtrier */}
        {isMurderer && (
          <>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Circonstances du meurtre</label>
              <textarea
                rows={3}
                value={formData.murderCircumstances || ''}
                onChange={(e) => handle('murderCircumstances', e.target.value)}
                placeholder="Contexte, lieu, moment, conditions..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Méthode</label>
              <input
                type="text"
                value={formData.murderMethod || ''}
                onChange={(e) => handle('murderMethod', e.target.value)}
                placeholder="Arme, poison, accident..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Motif</label>
              <input
                type="text"
                value={formData.murderMotive || ''}
                onChange={(e) => handle('murderMotive', e.target.value)}
                placeholder="Vengeance, gain, passion..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Préméditation</label>
              <select
                value={formData.murderPremeditation || ''}
                onChange={(e) => handle('murderPremeditation', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              >
                <option value="">Sélectionner...</option>
                <option value="Aucune - Accident">Aucune - Accident</option>
                <option value="Impulsif">Impulsif</option>
                <option value="Partiellement planifié">Partiellement planifié</option>
                <option value="Totalement prémédité">Totalement prémédité</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Découverte du corps</label>
              <textarea
                rows={2}
                value={formData.bodyDiscovery || ''}
                onChange={(e) => handle('bodyDiscovery', e.target.value)}
                placeholder="Par qui, quand, où..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Enquête</label>
              <textarea
                rows={2}
                value={formData.investigation || ''}
                onChange={(e) => handle('investigation', e.target.value)}
                placeholder="Statut, suspects, preuves..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de suspicion</label>
              <select
                value={formData.suspicionLevel || ''}
                onChange={(e) => handle('suspicionLevel', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              >
                <option value="">Sélectionner...</option>
                <option value="Aucune">Aucune</option>
                <option value="Faible">Faible</option>
                <option value="Modérée">Modérée</option>
                <option value="Forte">Forte</option>
                <option value="Confirmée">Confirmée</option>
              </select>
            </div>
          </>
        )}

        {/* Champs spécifiques Abuseur */}
        {isAbuser && (
          <>
            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type d'abus principal</label>
              <input
                type="text"
                value={formData.abuseType || ''}
                onChange={(e) => handle('abuseType', e.target.value)}
                placeholder="Contrôle, manipulation, violence..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Dynamique de pouvoir</label>
              <textarea
                rows={2}
                value={formData.powerDynamics || ''}
                onChange={(e) => handle('powerDynamics', e.target.value)}
                placeholder="Position d'autorité, dépendance économique, isolement..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Tactiques de manipulation</label>
              <textarea
                rows={2}
                value={formData.manipulationTactics || ''}
                onChange={(e) => handle('manipulationTactics', e.target.value)}
                placeholder="Gaslighting, isolement, menaces, chantage affectif..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </>
        )}

        {/* Champs spécifiques Victime */}
        {isVictim && (
          <>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Tentatives d'échappement</label>
              <textarea
                rows={2}
                value={formData.escapeAttempts || ''}
                onChange={(e) => handle('escapeAttempts', e.target.value)}
                placeholder="Nombre, nature, succès/échec, conséquences..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Soutien reçu</label>
              <input
                type="text"
                value={formData.supportReceived || ''}
                onChange={(e) => handle('supportReceived', e.target.value)}
                placeholder="Thérapie, amis, famille, refuge..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Statut de récupération</label>
              <select
                value={formData.recoveryStatus || ''}
                onChange={(e) => handle('recoveryStatus', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
              >
                <option value="">Sélectionner...</option>
                <option value="Début du processus">Début du processus</option>
                <option value="En cours">En cours</option>
                <option value="Progrès significatifs">Progrès significatifs</option>
                <option value="Guérison avancée">Guérison avancée</option>
                <option value="Toujours en danger">Toujours en danger</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Mesures de protection</label>
              <textarea
                rows={2}
                value={formData.protectionMeasures || ''}
                onChange={(e) => handle('protectionMeasures', e.target.value)}
                placeholder="Ordonnance restrictive, changement d'identité, refuge..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </>
        )}

        {/* Champs communs */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Circonstances détaillées</label>
          <textarea
            rows={3}
            value={formData.violenceCircumstances || ''}
            onChange={(e) => handle('violenceCircumstances', e.target.value)}
            placeholder="Contexte complet, déclencheurs, escalade..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Témoins impliqués</label>
          <input
            type="text"
            value={formData.witnessesInvolved || ''}
            onChange={(e) => handle('witnessesInvolved', e.target.value)}
            placeholder="Noms, rôles..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Conséquences légales</label>
          <input
            type="text"
            value={formData.legalConsequences || ''}
            onChange={(e) => handle('legalConsequences', e.target.value)}
            placeholder="Plainte, procès, jugement..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14 }}
          />
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Avertissements de contenu</label>
          <textarea
            rows={2}
            value={formData.triggerWarnings || ''}
            onChange={(e) => handle('triggerWarnings', e.target.value)}
            placeholder="Triggers spécifiques à noter pour les lecteurs..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes additionnelles</label>
          <textarea
            rows={2}
            value={formData.violenceNotes || ''}
            onChange={(e) => handle('violenceNotes', e.target.value)}
            placeholder="Informations complémentaires, évolution, contexte narratif..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #fc8181', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>

      </div>
    </div>
  );
}
