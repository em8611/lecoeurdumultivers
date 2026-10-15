import React from 'react';

export default function FamilialRelationForm({ formData, setFormData }) {
  const isChild = formData.type === 'Enfant';
  const isAdoptif = formData.biologicalLink === 'Adoptif';

  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#eef4ff', borderRadius: 12, border: '1px solid #cbd9ff' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: '#364fc7' }}>🏠 Informations familiales détaillées</h4>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        {/* Lien biologique */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Lien biologique</label>
          <select
            value={formData.biologicalLink}
            onChange={(e) => setFormData({ ...formData, biologicalLink: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Biologique">Biologique</option>
            <option value="Adoptif">Adoptif</option>
            <option value="Recomposée">Famille recomposée</option>
            <option value="De coeur">De cœur</option>
          </select>
        </div>

        {/* Branche familiale */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Branche familiale</label>
          <input
            type="text"
            value={formData.familyBranch || ''}
            onChange={(e) => setFormData({ ...formData, familyBranch: e.target.value })}
            placeholder="Ex: Ligne maternelle, Clan X..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          />
        </div>

        {/* Statut dans la famille */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Statut familial</label>
          <select
            value={formData.familyStatus || ''}
            onChange={(e) => setFormData({ ...formData, familyStatus: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Aîné">Aîné</option>
            <option value="Cadet">Cadet</option>
            <option value="Benjamin">Benjamin</option>
            <option value="Unique">Enfant unique</option>
            <option value="Chef">Chef de famille</option>
            <option value="Parent gardien">Parent gardien</option>
          </select>
        </div>

        {/* Co-habitation */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Co-habitation</label>
          <select
            value={formData.cohabitation || ''}
            onChange={(e) => setFormData({ ...formData, cohabitation: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          >
            <option value="">Sélectionner...</option>
            <option value="Même foyer">Même foyer</option>
            <option value="Séparés">Séparés</option>
            <option value="Occasionnel">Occasionnel</option>
            <option value="À distance">À distance</option>
          </select>
        </div>

        {/* Tuteur légal */}
        {isChild && (
          <div>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Tuteur légal ?</label>
            <select
              value={formData.isLegalGuardian || ''}
              onChange={(e) => setFormData({ ...formData, isLegalGuardian: e.target.value })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
            >
              <option value="">Sélectionner...</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="Partiel">Partiel</option>
            </select>
          </div>
        )}

        {/* Garde (uniquement Enfant) */}
        {isChild && (
          <div>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Garde / Responsabilité</label>
            <select
              value={formData.custody || ''}
              onChange={(e) => setFormData({ ...formData, custody: e.target.value })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
            >
              <option value="">Sélectionner...</option>
              <option value="Principale">Principale</option>
              <option value="Partagée">Partagée</option>
              <option value="Occasionnelle">Occasionnelle</option>
              <option value="Émancipé">Émancipé</option>
            </select>
          </div>
        )}

        {/* Date d'adoption */}
        {isAdoptif && (
          <div>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Date d'adoption</label>
            <input
              type="date"
              value={formData.adoptionDate || ''}
              onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
            />
          </div>
        )}

        {/* Surnom utilisé dans la famille */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Surnom / Appellation</label>
          <input
            type="text"
            value={formData.surnameUsed || ''}
            onChange={(e) => setFormData({ ...formData, surnameUsed: e.target.value })}
            placeholder="Ex: 'Mamie', 'Papa', 'Sissi'..."
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14 }}
          />
        </div>

        {/* Niveau de proximité émotionnelle */}
        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Proximité émotionnelle: {formData.emotionalCloseness || 3}/5</label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.emotionalCloseness || 3}
            onChange={(e) => setFormData({ ...formData, emotionalCloseness: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {['Distant', 'Faible', 'Modéré', 'Proche', 'Fusionnel'][(formData.emotionalCloseness || 3) - 1]}
          </div>
        </div>
      </div>

      {/* Notes familiales */}
  <div style={{ marginTop: 20 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes / Dynamique familiale</label>
        <textarea
          rows={3}
          value={formData.familyNotes || ''}
          onChange={(e) => setFormData({ ...formData, familyNotes: e.target.value })}
          placeholder="Conflits, soutien, traditions, secrets..."
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ced4da', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
        />
      </div>
    </div>
  );
}
