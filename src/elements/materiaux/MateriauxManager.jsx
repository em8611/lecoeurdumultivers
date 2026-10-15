import React, { useState, useEffect } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import { ElementList } from '../common/ElementList.jsx';
import { ElementDetailsShell, InfoCard, Section } from '../common/ElementDetailsShell.jsx';
import { exportElement } from '../common/exportElement.js';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import { exportFicheMateriau } from '../../utils/ficheExport.js';

// Types de matériaux
const MATERIAUX_TYPES = [
  'Métal', 'Pierre', 'Cristal', 'Bois', 'Tissu', 'Cuir', 'Os', 'Gemme',
  'Minerai', 'Essence magique', 'Composant alchimique', 'Technologie',
  'Organique', 'Élémentaire', 'Dimensionnel', 'Autre'
];

// Raretés
const MATERIAUX_RARETES = [
  'Abondant', 'Commun', 'Peu commun', 'Rare', 'Très rare',
  'Épique', 'Légendaire', 'Mythique', 'Unique'
];

// États physiques
const MATERIAUX_ETATS = [
  'Solide', 'Liquide', 'Gazeux', 'Plasma', 'Cristallin', 'Poudre', 'Éthéré', 'Variable'
];

// Modèle par défaut pour un matériau
const MATERIAU_DEFAULT = {
  id: null,
  nom: '',
  type: 'Métal',
  rarete: 'Commun',
  etat: 'Solide',
  origine: '',
  description: '',
  apparence: '',
  proprietes: [],
  utilisations: [],
  valeur: '',
  poids: '',
  durete: '',
  pointFusion: '',
  conductivite: '',
  effetsMagiques: '',
  dangereux: false,
  precautions: '',
  extraction: '',
  transformation: '',
  notes: '',
  image: null,
};

export default function MateriauxManager() {
  const [materiaux, setMateriaux] = useState(() => {
    const saved = localStorage.getItem('materiaux');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMateriau, setSelectedMateriau] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterRarete, setFilterRarete] = useState('Tous');
  const [notification, setNotification] = useState(null);

  // Hook import batch matériaux
  const createDefaultMateriau = (name) => ({
    ...MATERIAU_DEFAULT,
    id: Date.now() + Math.random(),
    nom: name
  });
  const { showBatchImport, setShowBatchImport, handleBatchImport } = useBatchImport(
    (materiau) => setMateriaux(prev => [...prev, materiau]),
    createDefaultMateriau,
    setNotification
  );

  useEffect(() => {
    localStorage.setItem('materiaux', JSON.stringify(materiaux));
    // Sauvegarde aussi au serveur
    fetch('/api/manager/save/materiaux', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: materiaux })
    }).catch(err => console.warn('Sauvegarde fichier JSON échouée:', err));
  }, [materiaux]);

  const handleSaveMateriau = (materiau) => {
    if (materiau.id) {
      setMateriaux(prev => prev.map(m => m.id === materiau.id ? materiau : m));
    } else {
      materiau.id = Date.now();
      setMateriaux(prev => [...prev, materiau]);
    }
    setSelectedMateriau(materiau);
    setIsEditing(false);
  };

  const handleDeleteMateriau = (id) => {
    if (window.confirm('Supprimer ce matériau ?')) {
      setMateriaux(prev => prev.filter(m => m.id !== id));
      setSelectedMateriau(null);
    }
  };

  const filteredMateriaux = materiaux.filter(m => {
    const matchSearch = m.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'Tous' || m.type === filterType;
    const matchRarete = filterRarete === 'Tous' || m.rarete === filterRarete;
    return matchSearch && matchType && matchRarete;
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {notification && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, padding: '12px 20px', borderRadius: 6, color: 'white', backgroundColor: notification.type === 'success' ? '#28a745' : notification.type === 'error' ? '#dc3545' : '#17a2b8', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          {notification.message}
        </div>
      )}
      <header style={{ borderBottom: '3px solid #9C27B0', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: '#9C27B0', margin: 0 }}>💎 Matériaux</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Gestion des ressources, matériaux et composants de votre univers</p>
        </div>
        <div>
          <button
            onClick={gotoFiches}
            style={{
              padding: '0.6rem 1rem',
              background: '#3949ab',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Ouvrir le viewer des fiches"
          >
            📄 Fiches
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un matériau..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, minWidth: '250px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}>
          <option value="Tous">Tous les types</option>
          {MATERIAUX_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select value={filterRarete} onChange={(e) => setFilterRarete(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}>
          <option value="Tous">Toutes raretés</option>
          {MATERIAUX_RARETES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <StatCard label="Total matériaux" value={materiaux.length} color="#9C27B0" icon="💎" />
        <StatCard label="Légendaires" value={materiaux.filter(m => m.rarete === 'Légendaire' || m.rarete === 'Mythique').length} color="#FF9800" icon="⭐" />
        <StatCard label="Dangereux" value={materiaux.filter(m => m.dangereux).length} color="#F44336" icon="⚠️" />
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button onClick={() => { setSelectedMateriau({ ...MATERIAU_DEFAULT }); setIsEditing(true); }} style={{ width: '100%', padding: '0.75rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Nouveau matériau</button>
          <button
            onClick={() => setShowBatchImport(true)}
            style={{ width: '100%', padding: '0.65rem', background: '#6f42c1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            title="Importer plusieurs matériaux par leurs noms (une ligne = un matériau)"
          >
            📝 Import Batch
          </button>
          <ElementList
            items={filteredMateriaux}
            selectedId={selectedMateriau?.id}
            onSelect={(m) => { setSelectedMateriau(m); setIsEditing(false); }}
            primaryKey="nom"
            secondary={(m) => `${m.type} • ${m.etat}${m.dangereux ? ' ⚠️' : ''}`}
            badge={(m) => ({ kind: 'rarete', value: m.rarete })}
            emptyLabel="Aucun matériau"
            renderActions={(m) => (
              <button
                onClick={(e) => { e.stopPropagation(); exportFicheMateriau(m); }}
                style={{ padding: '4px 8px', border: '1px solid #ddd', background: '#fff', borderRadius: 3, cursor: 'pointer', fontSize: 12 }}
                title="Exporter la fiche technique"
              >
                📄
              </button>
            )}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          {isEditing ? (
            <MateriauForm materiau={selectedMateriau} onSave={handleSaveMateriau} onCancel={() => setIsEditing(false)} />
          ) : selectedMateriau ? (
            <MateriauDetails
              materiau={selectedMateriau}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDeleteMateriau}
              onExport={async (m) => {
                const res = await exportElement({ ...m, type: 'materiau', module: 'materiaux' }, { module: 'materiaux' });
                if (res.success) {
                  setNotification({ type: 'success', message: `Exporté ${res.fileName}. ${res.hint}` });
                } else {
                  setNotification({ type: 'error', message: `Erreur: ${res.error}` });
                }
                setTimeout(() => setNotification(null), 5000);
              }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999', fontStyle: 'italic' }}>
              <p style={{ fontSize: '3rem', margin: 0 }}>💎</p>
              <p>Sélectionnez un matériau ou créez-en un nouveau</p>
            </div>
          )}
        </div>
      </div>
      {/* Modal Import Batch */}
      <BatchImportModal
        isOpen={showBatchImport}
        onClose={() => setShowBatchImport(false)}
        onImport={handleBatchImport}
        title="Import Batch - Matériaux"
        placeholder={"Mithril\nAdamantium\nBois ancien\nEssence arcanique\n..."}
        description="Entrez un nom de matériau par ligne. Chaque matériau sera créé avec des valeurs par défaut (modifiable ensuite)."
      />
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: `2px solid ${color}30`, textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>{label}</div>
    </div>
  );
}

function MateriauForm({ materiau, onSave, onCancel }) {
  const [form, setForm] = useState(materiau || MATERIAU_DEFAULT);
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  const handleArrayChange = (field, value) => { setForm({ ...form, [field]: value.split('\n').filter(v => v.trim()) }); };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto', padding: '1rem', background: '#fafafa', borderRadius: '12px' }}>
      <h3 style={{ color: '#9C27B0', margin: 0 }}>✏️ {form.id ? 'Modifier' : 'Créer'} un matériau</h3>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Nom du matériau *</label>
        <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required placeholder="Ex: Mithril" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>{MATERIAUX_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select>
        </div>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Rareté</label>
          <select value={form.rarete} onChange={e => setForm({ ...form, rarete: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>{MATERIAUX_RARETES.map(r => <option key={r} value={r}>{r}</option>)}</select>
        </div>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>État</label>
          <select value={form.etat} onChange={e => setForm({ ...form, etat: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>{MATERIAUX_ETATS.map(ea => <option key={ea} value={ea}>{ea}</option>)}</select>
        </div>
      </div>
      <Textarea label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} rows={3} placeholder="Description générale..." />
      <Textarea label="Apparence" value={form.apparence} onChange={v => setForm({ ...form, apparence: v })} rows={2} placeholder="Couleur, texture..." />
      <Textarea label="Propriétés (une par ligne)" value={form.proprietes.join('\n')} onChange={v => handleArrayChange('proprietes', v)} rows={4} placeholder="Ex: Résistant à la chaleur" />
      <Textarea label="Utilisations (une par ligne)" value={form.utilisations.join('\n')} onChange={v => handleArrayChange('utilisations', v)} rows={4} placeholder="Ex: Fabrication d'armes" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <Input label="Valeur" value={form.valeur} onChange={v => setForm({ ...form, valeur: v })} placeholder="Ex: 100 pièces d'or/kg" />
        <Input label="Poids" value={form.poids} onChange={v => setForm({ ...form, poids: v })} placeholder="Ex: Léger" />
        <Input label="Dureté" value={form.durete} onChange={v => setForm({ ...form, durete: v })} placeholder="Ex: 9/10" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input label="Point de fusion" value={form.pointFusion} onChange={v => setForm({ ...form, pointFusion: v })} placeholder="Ex: 1500°C" />
        <Input label="Conductivité" value={form.conductivite} onChange={v => setForm({ ...form, conductivite: v })} placeholder="Ex: Électrique" />
      </div>
      <Textarea label="Effets magiques" value={form.effetsMagiques} onChange={v => setForm({ ...form, effetsMagiques: v })} rows={3} placeholder="Propriétés magiques..." />
      <div style={{ padding: '1rem', background: form.dangereux ? '#FFEBEE' : '#E8F5E9', borderRadius: '8px', border: `2px solid ${form.dangereux ? '#F44336' : '#4CAF50'}` }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.dangereux} onChange={e => setForm({ ...form, dangereux: e.target.checked })} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
          <span style={{ fontWeight: 'bold', color: form.dangereux ? '#F44336' : '#4CAF50' }}>{form.dangereux ? '⚠️ Matériau dangereux' : '✅ Matériau sûr'}</span>
        </label>
        {form.dangereux && (
          <Textarea label="Précautions" value={form.precautions} onChange={v => setForm({ ...form, precautions: v })} rows={3} placeholder="Dangers, équipements..." />
        )}
      </div>
      <Textarea label="Extraction" value={form.extraction} onChange={v => setForm({ ...form, extraction: v })} rows={3} placeholder="Comment obtenir..." />
      <Textarea label="Transformation" value={form.transformation} onChange={v => setForm({ ...form, transformation: v })} rows={3} placeholder="Processus de raffinage..." />
      <Textarea label="Origine" value={form.origine} onChange={v => setForm({ ...form, origine: v })} rows={2} placeholder="Univers, dimension..." />
      <Textarea label="Notes" value={form.notes} onChange={v => setForm({ ...form, notes: v })} rows={3} placeholder="Informations supplémentaires..." />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" style={btn('#4CAF50', true)}>💾 Enregistrer</button>
        <button type="button" onClick={onCancel} style={btn('#ccc')}>Annuler</button>
      </div>
    </form>
  );
}

function MateriauDetails({ materiau, onEdit, onDelete, onExport }) {
  const badges = [
    { label: 'Rareté', kind: 'rarete', value: materiau.rarete },
    { label: 'Type', kind: 'type', value: materiau.type },
    { label: 'État', kind: 'etat', value: materiau.etat },
    ...(materiau.dangereux ? [{ label: 'Danger', kind: 'danger', value: 'Dangereux' }] : [])
  ];
  const actions = (
    <>
      <button onClick={onEdit} style={btn('#2196F3')}>✏️ Modifier</button>
      <button onClick={() => onExport && onExport(materiau)} style={btn('#6c757d')} title="Exporter JSON">📂 Exporter</button>
      <button onClick={() => onDelete(materiau.id)} style={btn('#f44336')}>🗑️ Supprimer</button>
    </>
  );
  return (
    <ElementDetailsShell title={materiau.nom} badges={badges} actions={actions}>
      <Section title="Description" icon="📋" content={materiau.description} />
      <Section title="Apparence" icon="👁️" content={materiau.apparence} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem' }}>
        <InfoCard label="Valeur" value={materiau.valeur} icon="💰" />
        <InfoCard label="Poids" value={materiau.poids} icon="⚖️" />
        <InfoCard label="Dureté" value={materiau.durete} icon="💪" />
        <InfoCard label="Point de fusion" value={materiau.pointFusion} icon="🔥" />
        <InfoCard label="Conductivité" value={materiau.conductivite} icon="⚡" />
      </div>
      <Section title="Propriétés" icon="✨" content={materiau.proprietes} />
      <Section title="Utilisations" icon="🔨" content={materiau.utilisations} />
      <Section title="Effets magiques" icon="🔮" content={materiau.effetsMagiques} />
      {materiau.dangereux && (
        <div style={{ padding: '1rem', background: '#FFEBEE', borderRadius: '8px', border: '2px solid #F44336' }}>
          <h4 style={{ color: '#F44336', marginBottom: '0.5rem' }}>⚠️ Précautions</h4>
          <p style={{ margin: 0, lineHeight: '1.6', color: '#333' }}>{materiau.precautions}</p>
        </div>
      )}
      <Section title="Extraction" icon="⛏️" content={materiau.extraction} />
      <Section title="Transformation" icon="🔧" content={materiau.transformation} />
      <Section title="Origine" icon="🌍" content={materiau.origine} />
      <Section title="Notes" icon="📝" content={materiau.notes} />
    </ElementDetailsShell>
  );
}

function Textarea({ label, value, onChange, rows, placeholder }) {
  return (
    <div>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
    </div>
  );
}

function btn(color, grow) {
  return (
    {
      padding: '0.75rem 1.25rem',
      background: color,
      color: color === '#ccc' ? '#333' : 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      flexGrow: grow ? 1 : 0
    }
  );
}
