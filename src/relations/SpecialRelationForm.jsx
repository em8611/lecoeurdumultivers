import React from 'react';
import { archetypeGroups } from './archetypes';
import ListInput from '../components/common/ListInput';

// Composant pour les champs de relation spéciale (version enrichie)
export default function SpecialRelationForm({ formData, setFormData }) {
  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#fef3c7', borderRadius: 12, border: '1px solid #fbbf24' }}>
      {/* Alias d'Em en premier */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Alias d'Em lié</label>
        <input
          type="text"
          value={formData.emAlias || ''}
          onChange={(e) => setFormData({ ...formData, emAlias: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          placeholder="Alias d'Em..."
        />
      </div>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#78350f' }}>✨ Nature de la relation spéciale</h4>

        {/* Archétype déroulant */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Archétype</label>
          <select
            value={formData.specialArchetype || ''}
            onChange={(e) => setFormData({ ...formData, specialArchetype: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            {archetypeGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

      {/* Origine de la relation */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Origine de la relation</label>
        <textarea
          rows={4}
          value={formData.specialOrigin || ''}
          onChange={(e) => setFormData({ ...formData, specialOrigin: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Comment cette relation spéciale est-elle née ?"
        />
      </div>


      {/* Évolution de la relation */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Évolution de la relation</label>
        <textarea
          rows={4}
          value={formData.specialEvolution || ''}
          onChange={(e) => setFormData({ ...formData, specialEvolution: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="L'évolution de la relation..."
        />
      </div>

      {/* Premier contact */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Premier contact</label>
        <input
          type="text"
          value={formData.firstContact || ''}
          onChange={(e) => setFormData({ ...formData, firstContact: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          placeholder="Les circonstances du premier contact..."
        />
      </div>

      {/* Première impression */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Première impression</label>
        <textarea
          rows={4}
          value={formData.specialFirstImpression || ''}
          onChange={(e) => setFormData({ ...formData, specialFirstImpression: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="De l'un et l'autre..."
        />
      </div>

      {/* Premier baiser */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Premier baiser</label>
        <input
          type="text"
          value={formData.firstKiss || ''}
          onChange={(e) => setFormData({ ...formData, firstKiss: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          placeholder="Les circonstances du premier baiser..."
        />
      </div>
      {/* Première fois */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Première fois</label>
        <input
          type="text"
          value={formData.firstTime || ''}
          onChange={(e) => setFormData({ ...formData, firstTime: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          placeholder="Les circonstances de la première fois..."
        />
      </div>

      {/* Il est qui  pour Em ? */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Qui est-il pour Em ?</label>
        <textarea
          rows={4}
          value={formData.WhoEm || ''}
          onChange={(e) => setFormData({ ...formData, WhoEm: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="De l'un et l'autre..."
        />
      </div>

      {/* Ce qu'ils ont apportés à l'un et l'autre */}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Ce qu'ils ont apportés à l'un et l'autre</label>
        <textarea
          rows={6}
          value={formData.specialOther || ''}
          onChange={(e) => setFormData({ ...formData, specialOther: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="De l'un et l'autre..."
        />
      </div>

    {/* Attitude envers l'autre en public*/}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Attitude envers l'autre en public</label>
        <textarea
          rows={4}
          value={formData.specialAttitudePublic || ''}
          onChange={(e) => setFormData({ ...formData, specialAttitudePublic: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Comment ils se comportent en public..."
        />
      </div>

      {/* Attitude envers l'autre en mission*/}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Attitude envers l'autre en mission</label>
        <textarea
          rows={4}
          value={formData.specialAttitudeMission || ''}
          onChange={(e) => setFormData({ ...formData, specialAttitudeMission: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Comment ils se comportent en mission..."
        />
      </div>

      {/* Attitude envers l'autre en privé*/}
  <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Attitude envers l'autre en privé</label>
        <textarea
          rows={4}
          value={formData.specialAttitudePrivate || ''}
          onChange={(e) => setFormData({ ...formData, specialAttitudePrivate: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Comment ils se comportent en privé..."
        />
      </div>

      {/* Autres moments marquants (liste) */}
      <div style={{ marginBottom: 18 }}>
        <ListInput
          id="specialKeyMoments"
          label="Autres moments marquants"
          values={Array.isArray(formData.specialKeyMoments) ? formData.specialKeyMoments : (formData.specialHistory ? [formData.specialHistory] : [])}
          onChange={(arr) => setFormData({ ...formData, specialKeyMoments: arr })}
          placeholder="Ajouter un moment marquant (Entrée pour valider)"
        />
      </div>

      {/* Enfants (liste) */}
      <div style={{ marginBottom: 18 }}>
        <ListInput
          id="specialChildren"
          label="Enfants"
          values={Array.isArray(formData.specialChildren) ? formData.specialChildren : []}
          onChange={(arr) => setFormData({ ...formData, specialChildren: arr })}
          placeholder="Ajouter un enfant (Entrée pour valider)"
        />
      </div>

      {/* Réactions selon comportements / situations (liste dynamique) */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Réactions selon comportements / situations</label>
        {(formData.specialReactions || []).map((entry, idx) => (
          <div key={idx} style={{ marginBottom: 12, padding: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Situation / Comportement</label>
                <textarea
                  rows={3}
                  value={entry.situation || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialReactions || [])];
                    list[idx] = { ...list[idx], situation: e.target.value };
                    setFormData({ ...formData, specialReactions: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Sous pression en mission, en danger, moment tendre..."
                />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Réaction associée</label>
                <textarea
                  rows={3}
                  value={entry.reaction || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialReactions || [])];
                    list[idx] = { ...list[idx], reaction: e.target.value };
                    setFormData({ ...formData, specialReactions: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Se referme, devient protecteur, plaisante pour dédramatiser..."
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#92400e' }}>Entrée #{idx + 1}</small>
              <button
                type="button"
                onClick={() => {
                  const list = [...(formData.specialReactions || [])];
                  list.splice(idx, 1);
                  setFormData({ ...formData, specialReactions: list });
                }}
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
              >Supprimer</button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const list = [...(formData.specialReactions || [])];
            list.push({ situation: '', reaction: '' });
            setFormData({ ...formData, specialReactions: list });
          }}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >Ajouter une situation / réaction</button>
        {(!formData.specialReactions || formData.specialReactions.length === 0) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>Aucune entrée pour l'instant. Commencez avec le bouton.</div>
        )}
      </div>

      {/* Surnom entre eux  */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Surnoms entre eux</label>
        {(formData.specialSurnom || []).map((entry, idx) => (
          <div key={idx} style={{ marginBottom: 12, padding: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Surnom</label>
                <textarea
                  rows={3}
                  value={entry.surnom || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialSurnom || [])];
                    list[idx] = { ...list[idx], surnom: e.target.value };
                    setFormData({ ...formData, specialSurnom: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Foxienne égarée, son protecteur le plus endormi..."
                />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Raison associée</label>
                <textarea
                  rows={3}
                  value={entry.raison || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialSurnom || [])];
                    list[idx] = { ...list[idx], raison: e.target.value };
                    setFormData({ ...formData, specialSurnom: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Il s'endort tout le temps..."
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#92400e' }}>Entrée #{idx + 1}</small>
              <button
                type="button"
                onClick={() => {
                  const list = [...(formData.specialSurnom || [])];
                  list.splice(idx, 1);
                  setFormData({ ...formData, specialSurnom: list });
                }}
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
              >Supprimer</button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const list = [...(formData.specialSurnom || [])];
            list.push({ surnom: '', raison: '' });
            setFormData({ ...formData, specialSurnom: list });
          }}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >Ajouter un surnom / raison</button>
        {(!formData.specialSurnom || formData.specialSurnom.length === 0) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>Aucune entrée pour l'instant. Commencez avec le bouton.</div>
        )}
      </div>

      {/* Leur rituel */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Leur rituel</label>
        {(formData.specialRituel || []).map((entry, idx) => (
          <div key={idx} style={{ marginBottom: 12, padding: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Rituel / Description</label>
                <textarea
                  rows={3}
                  value={entry.rituel || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialRituel || [])];
                    list[idx] = { ...list[idx], rituel: e.target.value };
                    setFormData({ ...formData, specialRituel: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Sous pression en mission, en danger, moment tendre..."
                />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Description</label>
                <textarea
                  rows={3}
                  value={entry.description || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialRituel || [])];
                    list[idx] = { ...list[idx], description: e.target.value };
                    setFormData({ ...formData, specialRituel: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Se referme, devient protecteur, plaisante pour dédramatiser..."
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#92400e' }}>Entrée #{idx + 1}</small>
              <button
                type="button"
                onClick={() => {
                  const list = [...(formData.specialRituel || [])];
                  list.splice(idx, 1);
                  setFormData({ ...formData, specialRituel: list });
                }}
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
              >Supprimer</button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const list = [...(formData.specialRituel || [])];
            list.push({ rituel: '', description: '' });
            setFormData({ ...formData, specialRituel: list });
          }}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >Ajouter un rituel / description</button>
        {(!formData.specialRituel || formData.specialRituel.length === 0) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>Aucune entrée pour l'instant. Commencez avec le bouton.</div>
        )}
      </div>

      {/* Leurs attaques */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Leur attaques</label>
        {(formData.specialAttacks || []).map((entry, idx) => (
          <div key={idx} style={{ marginBottom: 12, padding: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Attaques / Description</label>
                <textarea
                  rows={3}
                  value={entry.specialAttacks || ''}
                  onChange={(e) => {
                    const list = [...(formData.specialAttacks || [])];
                    list[idx] = { ...list[idx], specialAttacks: e.target.value };
                    setFormData({ ...formData, specialAttacks: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Sous pression en mission, en danger, moment tendre..."
                />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Description</label>
                <textarea
                  rows={3}
                  value={entry.description|| ''}
                  onChange={(e) => {
                    const list = [...(formData.specialAttacks || [])];
                    list[idx] = { ...list[idx], description: e.target.value };
                    setFormData({ ...formData, specialAttacks: list });
                  }}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
                  placeholder="Ex: Se referme, devient protecteur, plaisante pour dédramatiser..."
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#92400e' }}>Entrée #{idx + 1}</small>
              <button
                type="button"
                onClick={() => {
                  const list = [...(formData.specialAttacks || [])];
                  list.splice(idx, 1);
                  setFormData({ ...formData, specialAttacks: list });
                }}
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
              >Supprimer</button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const list = [...(formData.specialAttacks || [])];
            list.push({ attacks: '', description: '' });
            setFormData({ ...formData, specialAttacks: list });
          }}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >Ajouter une attaque / description</button>
        {(!formData.specialAttacks || formData.specialAttacks.length === 0) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>Aucune entrée pour l'instant. Commencez avec le bouton.</div>
        )}
      </div>

{/* Cadeaux */}
      <div style={{ marginBottom: 18 }}>
        <ListInput
          id="specialGifts"
          label="Cadeaux"
          values={Array.isArray(formData.specialGifts) ? formData.specialGifts : []}
          onChange={(arr) => setFormData({ ...formData, specialGifts: arr })}
          placeholder="Ajouter un cadeau (Entrée pour valider)"
        />
      </div>

    </div>
  );
}
