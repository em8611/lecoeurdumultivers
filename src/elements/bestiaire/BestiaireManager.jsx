import React, { useState, useEffect } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import FicheTechnique from '../../components/common/FicheTechnique.jsx';
import { ElementList } from '../common/ElementList.jsx';
import { ElementDetailsShell, InfoCard, Section } from '../common/ElementDetailsShell.jsx';
import { exportElement } from '../common/exportElement.js';
import { exportFicheBestiaire } from '../../utils/ficheExport.js';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import ElementRelationsEditor from '../common/ElementRelationsEditor.jsx';

// Types de créatures
const BESTIAIRE_TYPES = [
  'Dragon',
  'Démon',
  'Ange',
  'Esprit',
  'Bête magique',
  'Monstre',
  'Élémentaire',
  'Mort-vivant',
  'Fée',
  'Golem',
  'Chimère',
  'Créature aquatique',
  'Créature volante',
  'Humanoïde',
  'Alien',
  'Autre'
];

// Niveaux de dangerosité
const BESTIAIRE_NIVEAUX_DANGER = [
  'Inoffensif',
  'Faible',
  'Modéré',
  'Dangereux',
  'Très dangereux',
  'Mortel',
  'Légendaire'
];

// Habitats
const BESTIAIRE_HABITATS = [
  'Forêt',
  'Montagne',
  'Désert',
  'Océan',
  'Marais',
  'Grotte',
  'Ciel',
  'Enfer',
  'Paradis',
  'Dimension parallèle',
  'Ville',
  'Ruines',
  'Autre'
];

// Modèle par défaut pour une créature
const CREATURE_DEFAULT = {
  id: null,
  nom: '',
  type: 'Dragon',
  dangerLevel: 'Modéré',
  habitat: 'Forêt',
  taille: '',
  poids: '',
  apparence: '',
  comportement: '',
  capacites: [],
  faiblesses: [],
  origine: '',
  rarete: 'Commun',
  intelligence: 'Animale',
  alimentation: '',
  reproduction: '',
  dureeVie: '',
  notes: '',
  image: null,
};

export default function BestiaireManager() {
  const [creatures, setCreatures] = useState(() => {
    const saved = localStorage.getItem('creatures');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [notification, setNotification] = useState(null);

  // Import batch (créatures par noms)
  const createDefaultCreature = (name) => ({
    ...CREATURE_DEFAULT,
    id: Date.now() + Math.random(),
    nom: name
  });
  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (creature) => setCreatures(prev => [...prev, creature]),
    createDefaultCreature,
    setNotification
  );

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('creatures', JSON.stringify(creatures));
    // Sauvegarde aussi au serveur
    fetch('/api/manager/save/bestiaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: creatures })
    }).catch(err => console.warn('Sauvegarde fichier JSON échouée:', err));
  }, [creatures]);

  // Gestion des créatures
  const handleSaveCreature = (creature) => {
    if (creature.id) {
      setCreatures((prev) => prev.map((c) => (c.id === creature.id ? creature : c)));
    } else {
      creature.id = Date.now();
      setCreatures((prev) => [...prev, creature]);
    }
    setSelectedCreature(creature);
    setIsEditing(false);
  };

  const handleDeleteCreature = (id) => {
    if (window.confirm('Supprimer cette créature du bestiaire ?')) {
      setCreatures((prev) => prev.filter((c) => c.id !== id));
      setSelectedCreature(null);
    }
  };

  // Filtrage
  const filteredCreatures = creatures.filter((creature) => {
    const matchSearch = creature.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'Tous' || creature.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '12px 20px',
          color: 'white',
          backgroundColor:
            notification.type === 'success' ? '#2e7d4f' :
            notification.type === 'info' ? 'var(--coeur)' : '#a13d3d',
          borderRadius: 'var(--rayon-bouton)',
          boxShadow: 'var(--ombre-survol)'
        }}>
          {notification.message}
        </div>
      )}
      <header style={{ borderBottom: '1px solid var(--trait)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>Bestiaire</h2>
          <p style={{ color: 'var(--encre-douce)', marginTop: '0.5rem' }}>
            Gestion des créatures et espèces de votre univers
          </p>
        </div>
        <div>
          <button
            onClick={gotoFiches}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: 'var(--fond-carte)',
              color: 'var(--encre)',
              border: '1px solid var(--trait)',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Ouvrir le viewer des fiches"
          >
            Fiches
          </button>
        </div>
      </header>

      {/* Barre de recherche et filtres */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Rechercher une créature..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '0.75rem',
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            fontSize: '1rem',
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: 'var(--rayon-bouton)',
            border: '1px solid var(--trait)',
            fontSize: '1rem',
          }}
        >
          <option value="Tous">Tous les types</option>
          {BESTIAIRE_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Contenu principal */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Liste des créatures */}
        <div style={{ width: '320px' }}>
          <button
            onClick={() => {
              setSelectedCreature({ ...CREATURE_DEFAULT });
              setIsEditing(true);
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--coeur)',
              color: 'var(--sur-coeur)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            + Nouvelle créature
          </button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{
              width: '100%',
              padding: '0.65rem',
              backgroundColor: 'var(--or)',
              color: 'var(--sur-or)',
              border: 'none',
              borderRadius: 'var(--rayon-bouton)',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
            title="Importer plusieurs créatures par leurs noms (une par ligne)"
          >
            Import Batch
          </button>

          <ElementList
            items={filteredCreatures}
            selectedId={selectedCreature?.id}
            onSelect={(c) => { setSelectedCreature(c); setIsEditing(false); }}
            primaryKey="nom"
            secondary={(c) => `${c.type} • ${c.habitat}`}
            badge={(c) => ({ kind: 'danger', value: c.dangerLevel })}
            emptyLabel="Aucune créature trouvée"
          />
        </div>

        {/* Détails ou formulaire */}
        <div style={{ flexGrow: 1 }}>
          {isEditing ? (
            <CreatureForm
              creature={selectedCreature}
              onSave={handleSaveCreature}
              onCancel={() => setIsEditing(false)}
            />
          ) : selectedCreature ? (
            <CreatureDetails
              creature={selectedCreature}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDeleteCreature}
              onExport={async (c) => {
                const res = await exportElement({ ...c, type: 'creature', module: 'bestiaire' }, { module: 'bestiaire' });
                if (res.success) {
                  setNotification({ type: 'success', message: `Exporté ${res.fileName}. ${res.hint}` });
                } else {
                  setNotification({ type: 'error', message: `Erreur: ${res.error}` });
                }
                setTimeout(() => setNotification(null), 5000);
              }}
            />
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--encre-douce)',
              fontStyle: 'italic',
            }}>
              <p>Sélectionnez une créature ou créez-en une nouvelle</p>
            </div>
          )}
        </div>
      </div>
      {/* Modal Import Batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Créatures"
        placeholder={"Dragon rouge\nGolem de pierre\nEsprit sylvestre\nChimère abyssale\n..."}
        description="Entrez un nom de créature par ligne. Chaque créature est créée avec des valeurs par défaut (modifiable ensuite)."
      />
    </div>
  );
}

// Fonction utilitaire pour la couleur du niveau de danger
function getDangerColor(level) {
  const colors = {
    'Inoffensif': '#4CAF50',
    'Faible': '#8BC34A',
    'Modéré': '#FFC107',
    'Dangereux': '#FF9800',
    'Très dangereux': '#FF5722',
    'Mortel': '#F44336',
    'Légendaire': '#9C27B0',
  };
  return colors[level] || '#999';
}

// Formulaire de créature
function CreatureForm({ creature, onSave, onCancel }) {
  const [form, setForm] = useState(creature || CREATURE_DEFAULT);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const handleArrayChange = (field, value) => {
    setForm({ ...form, [field]: value.split('\n').filter(v => v.trim()) });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxHeight: '600px',
      overflowY: 'auto',
      padding: 24,
      backgroundColor: 'var(--douceur)',
      borderRadius: 'var(--rayon-carte)',
      border: '1px solid var(--trait)',
    }}>
      <h3 style={{ color: 'var(--coeur)', margin: 0, fontFamily: 'var(--police-affichage)' }}>
        {form.id ? 'Modifier' : 'Créer'} une créature
      </h3>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>
          Nom de la créature *
        </label>
        <input
          placeholder="Ex: Dragon de feu"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            {BESTIAIRE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Dangerosité</label>
          <select
            value={form.dangerLevel}
            onChange={(e) => setForm({ ...form, dangerLevel: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            {BESTIAIRE_NIVEAUX_DANGER.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Habitat</label>
          <select
            value={form.habitat}
            onChange={(e) => setForm({ ...form, habitat: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            {BESTIAIRE_HABITATS.map((habitat) => (
              <option key={habitat} value={habitat}>{habitat}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Rareté</label>
          <select
            value={form.rarete}
            onChange={(e) => setForm({ ...form, rarete: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            <option>Commun</option>
            <option>Peu commun</option>
            <option>Rare</option>
            <option>Très rare</option>
            <option>Légendaire</option>
            <option>Unique</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Taille</label>
          <input
            placeholder="Ex: 5m"
            value={form.taille}
            onChange={(e) => setForm({ ...form, taille: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Poids</label>
          <input
            placeholder="Ex: 2 tonnes"
            value={form.poids}
            onChange={(e) => setForm({ ...form, poids: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Intelligence</label>
          <select
            value={form.intelligence}
            onChange={(e) => setForm({ ...form, intelligence: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          >
            <option>Animale</option>
            <option>Primitive</option>
            <option>Moyenne</option>
            <option>Élevée</option>
            <option>Supérieure</option>
            <option>Divine</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Apparence</label>
        <textarea
          placeholder="Description physique de la créature..."
          value={form.apparence}
          onChange={(e) => setForm({ ...form, apparence: e.target.value })}
          rows={3}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Comportement</label>
        <textarea
          placeholder="Comportement général, tempérament..."
          value={form.comportement}
          onChange={(e) => setForm({ ...form, comportement: e.target.value })}
          rows={3}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>
          Capacités (une par ligne)
        </label>
        <textarea
          placeholder="Ex: Souffle de feu&#10;Vol&#10;Régénération"
          value={form.capacites.join('\n')}
          onChange={(e) => handleArrayChange('capacites', e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>
          Faiblesses (une par ligne)
        </label>
        <textarea
          placeholder="Ex: Eau&#10;Magie de glace"
          value={form.faiblesses.join('\n')}
          onChange={(e) => handleArrayChange('faiblesses', e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Alimentation</label>
          <input
            placeholder="Ex: Carnivore"
            value={form.alimentation}
            onChange={(e) => setForm({ ...form, alimentation: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Reproduction</label>
          <input
            placeholder="Ex: Ovipare"
            value={form.reproduction}
            onChange={(e) => setForm({ ...form, reproduction: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Durée de vie</label>
          <input
            placeholder="Ex: 500 ans"
            value={form.dureeVie}
            onChange={(e) => setForm({ ...form, dureeVie: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
          />
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Origine</label>
        <input
          placeholder="Univers, dimension, région d'origine..."
          value={form.origine}
          onChange={(e) => setForm({ ...form, origine: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Notes</label>
        <textarea
          placeholder="Informations supplémentaires..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--rayon-bouton)', border: '1px solid var(--trait)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--coeur)',
            color: 'var(--sur-coeur)',
            border: 'none',
            borderRadius: 'var(--rayon-bouton)',
            cursor: 'pointer',
            fontWeight: 'bold',
            flexGrow: 1,
          }}
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--fond-carte)',
            color: 'var(--encre)',
            border: '1px solid var(--trait)',
            borderRadius: 'var(--rayon-bouton)',
            cursor: 'pointer',
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

// Détails de la créature
function CreatureDetails({ creature, onEdit, onDelete, onExport }) {
  const [showFiche, setShowFiche] = useState(false);
  const ficheData = {
    title: creature.nom,
    icon: creature.icon || '',
    image: creature.image,
    description: creature.description || creature.apparence,
    metadata: [
      { label: 'Type', value: creature.type },
      { label: 'Dangerosité', value: creature.dangerLevel },
      { label: 'Habitat', value: creature.habitat },
      { label: 'Rareté', value: creature.rarete },
    ].filter(m => m.value),
    sections: [
      creature.apparence ? { titre: 'Apparence', contenu: creature.apparence } : null,
      creature.comportement ? { titre: 'Comportement', contenu: creature.comportement } : null,
      (creature.capacites && creature.capacites.length) ? { titre: 'Capacités', contenu: creature.capacites.join('\n') } : null,
      (creature.faiblesses && creature.faiblesses.length) ? { titre: 'Faiblesses', contenu: creature.faiblesses.join('\n') } : null,
      creature.origine ? { titre: 'Origine', contenu: creature.origine } : null,
      creature.notes ? { titre: 'Notes', contenu: creature.notes } : null,
    ].filter(Boolean)
  };
  const badges = [
    { label: 'Dangerosité', kind: 'danger', value: creature.dangerLevel },
    { label: 'Type', kind: 'type', value: creature.type },
    { label: 'Habitat', kind: 'habitat', value: creature.habitat },
    ...(creature.rarete ? [{ label: 'Rareté', kind: 'rarete', value: creature.rarete }] : [])
  ];
  const actions = (
    <>
      <button onClick={onEdit} style={btn('modifier')}>Modifier</button>
      <button onClick={() => exportFicheBestiaire(creature)} style={btn('secondary')} title="Exporter la fiche">Fiche</button>
      <button onClick={() => onExport && onExport(creature)} style={btn('secondary')} title="Exporter JSON">Exporter</button>
      <button onClick={() => onDelete(creature.id)} style={btn('danger')}>Supprimer</button>
    </>
  );
  return (
    <>
    <ElementDetailsShell title={creature.nom} badges={badges} actions={actions}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {creature.taille && <InfoCard label="Taille" value={creature.taille} />}
        {creature.poids && <InfoCard label="Poids" value={creature.poids} />}
        {creature.intelligence && <InfoCard label="Intelligence" value={creature.intelligence} />}
      </div>

      <Section title="Apparence" content={creature.apparence} />
      <Section title="Comportement" content={creature.comportement} />
      <Section title="Capacités" content={creature.capacites} />
      <Section title="Faiblesses" content={creature.faiblesses} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {creature.alimentation && <InfoCard label="Alimentation" value={creature.alimentation} />}
        {creature.reproduction && <InfoCard label="Reproduction" value={creature.reproduction} />}
        {creature.dureeVie && <InfoCard label="Durée de vie" value={creature.dureeVie} />}
      </div>

      <Section title="Origine" content={creature.origine} />
      <Section title="Notes" content={creature.notes} />

      {/* Liaisons inter-éléments (store global) */}
      <ElementRelationsEditor
        element={{ id: creature.id, category: 'bestiaire', name: creature.nom }}
      />
    </ElementDetailsShell>
    {/* Fiche export en JSON via bouton ci-dessus */}
    </>
  );
}

function btn(variant, grow) {
  if (variant === 'modifier') {
    return { padding: '0.75rem 1.25rem', backgroundColor: 'var(--or)', color: 'var(--sur-or)', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold', flexGrow: grow ? 1 : 0 };
  }
  if (variant === 'danger') {
    return { padding: '0.75rem 1.25rem', backgroundColor: '#a13d3d', color: 'white', border: 'none', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold', flexGrow: grow ? 1 : 0 };
  }
  return { padding: '0.75rem 1.25rem', backgroundColor: 'var(--fond-carte)', color: 'var(--encre)', border: '1px solid var(--trait)', borderRadius: 'var(--rayon-bouton)', cursor: 'pointer', fontWeight: 'bold', flexGrow: grow ? 1 : 0 };
}
