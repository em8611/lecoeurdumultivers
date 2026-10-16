import React from 'react';
import { useFormProgress, FORM_FIELD_SETS } from '../../utils/useFormProgress.js';
import FormProgressBar from '../../components/common/FormProgressBar.jsx';

export default function PouvoirForm({ formData, setFormData, onSubmit, onCancel, isEditing = false }) {
  const { progress, filledCount, totalCount } = useFormProgress(formData, FORM_FIELD_SETS.power);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    fontFamily: 'inherit',
    resize: 'vertical'
  };

  return (
    <div style={{
      backgroundColor: 'var(--douceur)',
      padding: 24,
      borderRadius: 'var(--rayon-carte)',
      marginBottom: 24,
      border: '1px solid var(--trait)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 20, color: 'var(--encre)' }}>
        {isEditing ? 'Modifier le pouvoir/compétence' : 'Créer un nouveau pouvoir/compétence'}
      </h3>

      <FormProgressBar
        progress={progress}
        filledCount={filledCount}
        totalCount={totalCount}
        showDetails={true}
        position="top"
      />

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nom *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Boule de feu"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={inputStyle}
            >
              <option value="Pouvoir">Pouvoir</option>
              <option value="Compétence">Compétence</option>
              <option value="Technique">Technique</option>
              <option value="Sort">Sort</option>
              <option value="Capacité">Capacité</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Catégorie *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              <option value="Élémentaire">Élémentaire</option>
              <option value="Mental">Mental</option>
              <option value="Physique">Physique</option>
              <option value="Magique">Magique</option>
              <option value="Technologique">Technologique</option>
              <option value="Spirituel">Spirituel</option>
              <option value="Temporel">Temporel</option>
              <option value="Spatial">Spatial</option>
              <option value="Énergétique">Énergétique</option>
              <option value="Guérison">Guérison</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Niveau *</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              style={inputStyle}
            >
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
              <option value="Maître">Maître</option>
              <option value="Légendaire">Légendaire</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Description générale du pouvoir..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Effets</label>
            <textarea
              value={formData.effects}
              onChange={(e) => setFormData({ ...formData, effects: e.target.value })}
              rows={2}
              style={textareaStyle}
              placeholder="Effets et conséquences..."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Coût/Limitations</label>
            <textarea
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              rows={2}
              style={textareaStyle}
              placeholder="Coût énergétique, fatigue, limitations..."
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Prérequis</label>
          <input
            type="text"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            style={inputStyle}
            placeholder="Conditions pour utiliser ce pouvoir..."
          />
        </div>

        <h4 style={{ marginTop: 24, marginBottom: 18, color: 'var(--coeur)', fontSize: 16 }}>
          Caractéristiques avancées
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Portée</label>
            <input
              type="text"
              value={formData.range}
              onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 10 mètres"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Durée</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 5 minutes"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Temps de recharge</label>
            <input
              type="text"
              value={formData.cooldown}
              onChange={(e) => setFormData({ ...formData, cooldown: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 1 heure"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Dégâts/Puissance</label>
            <input
              type="text"
              value={formData.damage}
              onChange={(e) => setFormData({ ...formData, damage: e.target.value })}
              style={inputStyle}
              placeholder="Ex: 150 HP"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Élément</label>
            <input
              type="text"
              value={formData.element}
              onChange={(e) => setFormData({ ...formData, element: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Feu, Glace, Foudre"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Rareté</label>
            <select
              value={formData.rarity}
              onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
              style={inputStyle}
            >
              <option value="Commun">Commun</option>
              <option value="Peu commun">Peu commun</option>
              <option value="Rare">Rare</option>
              <option value="Épique">Épique</option>
              <option value="Légendaire">Légendaire</option>
              <option value="Mythique">Mythique</option>
              <option value="Unique">Unique</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Origine</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Ancienne magie elfique"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Méthode d'apprentissage</label>
            <input
              type="text"
              value={formData.learningMethod}
              onChange={(e) => setFormData({ ...formData, learningMethod: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Entraînement, hérédité"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Effet visuel</label>
            <input
              type="text"
              value={formData.visualEffect}
              onChange={(e) => setFormData({ ...formData, visualEffect: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Flammes bleues, aura dorée"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Effet sonore</label>
            <input
              type="text"
              value={formData.soundEffect}
              onChange={(e) => setFormData({ ...formData, soundEffect: e.target.value })}
              style={inputStyle}
              placeholder="Ex: Crépitement, rugissement"
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Évolution possible</label>
          <textarea
            value={formData.evolution}
            onChange={(e) => setFormData({ ...formData, evolution: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Formes évoluées ou améliorations possibles..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Points forts</label>
            <textarea
              value={formData.strengths}
              onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
              rows={2}
              style={textareaStyle}
              placeholder="Avantages, synergies..."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Points faibles</label>
            <textarea
              value={formData.weaknesses}
              onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
              rows={2}
              style={textareaStyle}
              placeholder="Faiblesses, contre-mesures..."
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Combinaisons possibles</label>
          <input
            type="text"
            value={formData.combinations}
            onChange={(e) => setFormData({ ...formData, combinations: e.target.value })}
            style={inputStyle}
            placeholder="Pouvoirs combinables, techniques dérivées..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Effets secondaires</label>
          <textarea
            value={formData.sideEffects}
            onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
            rows={2}
            style={textareaStyle}
            placeholder="Conséquences négatives, risques..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Tags (séparés par virgules)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            style={inputStyle}
            placeholder="Ex: Offensif, AOE, Buff, Débuff"
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Moments d'utilisation</label>
          <textarea
            value={formData.usageMoments || ''}
            onChange={(e) => setFormData({ ...formData, usageMoments: e.target.value })}
            rows={3}
            style={textareaStyle}
            placeholder="Décrivez les moments où ce pouvoir a été utilisé dans l'histoire..."
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--coeur)',
              color: 'var(--sur-coeur)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isEditing ? 'Mettre à jour' : 'Créer le pouvoir'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--fond-carte)',
              color: 'var(--encre)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
