import React from 'react';

export default function FriendlyRelationForm({ formData, setFormData }) {
  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: 'var(--coeur)' }}>Informations amicales</h4>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        {/* Confiance / proximité */}
        <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Alias d'Em lié</label>
        <input
          type="text"
          value={formData.friendlyEmAlias || ''}
          onChange={(e) => setFormData({ ...formData, friendlyEmAlias: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          placeholder="Alias d'Em..."
        />
      </div>
        {/* Archétype déroulant */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Archétype</label>
          <select
            value={formData.friendlyArchetype || ''}
            onChange={(e) => setFormData({ ...formData, friendlyArchetype: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Amical/e">Amical/e</option>
            <option value="Inventeur ingénieux/Inventrice ingénieuse">Inventeur ingénieux/Inventrice ingénieuse</option>
            <option value="L'observateur calculateur/L'observatrice calculatrice">L'observateur calculateur/L'observatrice calculatrice</option>
            <option value="Le conseiller/La conseillière">Le conseiller/La conseillière</option>
            <option value="Grand frère/Grande sœur">Grand frère/Grande sœur</option>
            <option value="L'admirateur/L'admiratrice">L'admirateur/L'admiratrice</option>
            <option value="Le Provocateur/provocatrice">Le Provocateur/provocatrice</option>
            <option value="La figure parentale">La figure parentale</option>
            <option value="Le rival/La rivale">Le rival/La rivale</option>
            <option value="Le mentor/La mentore">Le mentor/La mentore</option>
            <option value="La Garde du corps">La Garde du corps</option>
            <option value="L'enleveur raté">L'enleveur raté</option>
            <option value="Le scientifique/La scientifique">Le scientifique/La scientifique</option>
            <option value="Le méfiant/méfiante">Le méfiant/méfiante</option>
            <option value="L'infirmier/L'infirmière">L'infirmier/L'infirmière</option>
            {/* Ajouter ici les autres archétypes selon besoin */}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Niveau de confiance: {formData.friendlyTrustLevel || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.friendlyTrustLevel || 3}
            onChange={(e) => setFormData({ ...formData, friendlyTrustLevel: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
            {['Naissante', 'Sympathie', 'Solide', 'Forte', 'Indéfectible'][(formData.friendlyTrustLevel || 3) - 1]}
          </div>
        </div>
        {/* Fréquence de contact */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Fréquence de contact</label>
          <select
            value={formData.friendlyContactFrequency || ''}
            onChange={(e) => setFormData({ ...formData, friendlyContactFrequency: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Quotidien">Quotidien</option>
            <option value="Hebdomadaire">Hebdomadaire</option>
            <option value="Mensuel">Mensuel</option>
            <option value="Occasionnel">Occasionnel</option>
            <option value="Rare">Rare</option>
          </select>
        </div>
        {/* Canal de communication principal */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Canal principal</label>
          <select
            value={formData.friendlyPrimaryChannel || ''}
            onChange={(e) => setFormData({ ...formData, friendlyPrimaryChannel: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="En personne">En personne</option>
            <option value="Messages">Messages</option>
            <option value="Appels">Appels</option>
            <option value="En ligne">En ligne</option>
          </select>
        </div>
        {/* Groupe / cercle d'ami·es */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Cercle / Groupe</label>
          <input
            type="text"
            value={formData.friendlyGroup || ''}
            onChange={(e) => setFormData({ ...formData, friendlyGroup: e.target.value })}
            placeholder="Nom du groupe, promo, guilde..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        {/* Intérêts communs */}
  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Intérêts communs</label>
          <input
            type="text"
            value={formData.friendlySharedInterests || ''}
            onChange={(e) => setFormData({ ...formData, friendlySharedInterests: e.target.value })}
            placeholder="Ex: lecture, escalade, jeux, art..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        {/* Activités favorites */}
  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Activités favorites</label>
          <input
            type="text"
            value={formData.friendlyFavoriteActivities || ''}
            onChange={(e) => setFormData({ ...formData, friendlyFavoriteActivities: e.target.value })}
            placeholder="Sorties, sport, discussion, voyage..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        {/* Blagues privées / références */}
  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Blagues privées / Références</label>
          <textarea
            rows={2}
            value={formData.friendlyInsideJokes || ''}
            onChange={(e) => setFormData({ ...formData, friendlyInsideJokes: e.target.value })}
            placeholder="Private jokes, surnoms, codes..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        {/* Type de soutien */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Type de soutien</label>
          <input
            type="text"
            value={formData.friendlySupportType || ''}
            onChange={(e) => setFormData({ ...formData, friendlySupportType: e.target.value })}
            placeholder="Émotionnel, pratique, créatif, logistique..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        {/* Première rencontre */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Première rencontre (date)</label>
          <input
            type="date"
            value={formData.friendlyFirstMeetingDate || ''}
            onChange={(e) => setFormData({ ...formData, friendlyFirstMeetingDate: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Lieu de la première rencontre</label>
          <input
            type="text"
            value={formData.friendlyFirstMeetingPlace || ''}
            onChange={(e) => setFormData({ ...formData, friendlyFirstMeetingPlace: e.target.value })}
            placeholder="École, café, internet, aventure..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14 }}
          />
        </div>
        {/* Conflits / divergences */}
  <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Conflits / Divergences</label>
          <textarea
            rows={2}
            value={formData.friendlyConflictNotes || ''}
            onChange={(e) => setFormData({ ...formData, friendlyConflictNotes: e.target.value })}
            placeholder="Malentendus, désaccords, ruptures puis réconciliations..."
            style={{ width: '100%', padding: 8, borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
