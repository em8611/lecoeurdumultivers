import React from 'react';
import ListInput from '../../components/common/ListInput.jsx';

export default function CarteForm({ formData, setFormData, onSubmit, onCancel, territoires, isEditing = false }) {
  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 'var(--rayon-bouton)',
    border: '1px solid var(--trait)',
    fontSize: 14,
    boxSizing: 'border-box'
  };

  const textareaStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical' };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFormData({ ...formData, image: ev.target.result });
    reader.readAsDataURL(file);
    e.target.value = '';
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
        {isEditing ? 'Modifier la carte' : 'Créer une nouvelle carte'}
      </h3>

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Nom *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="Ex: Carte du Royaume d'Aube"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Territoire représenté</label>
            <select
              value={formData.territoireId}
              onChange={(e) => setFormData({ ...formData, territoireId: e.target.value })}
              style={inputStyle}
            >
              <option value="">— Aucun —</option>
              {territoires.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
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
            placeholder="Présentation de la carte, ce qu'elle couvre..."
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Image de la carte</label>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--encre-douce)' }}>Upload un fichier</label>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--encre-douce)' }}>Ou URL externe</label>
              <input
                type="text"
                value={formData.image && formData.image.startsWith('data:') ? '' : formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>
          </div>
          {formData.image && (
            <div style={{ marginTop: 10 }}>
              <img
                src={formData.image}
                alt="Aperçu de la carte"
                style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <ListInput
            id="tags"
            label="Tags"
            values={formData.tags}
            onChange={(values) => setFormData({ ...formData, tags: values })}
            placeholder="Ajouter un tag et appuyer sur Entrée"
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: 'var(--coeur)', color: 'var(--sur-coeur)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isEditing ? 'Mettre à jour' : 'Créer la carte'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer' }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
