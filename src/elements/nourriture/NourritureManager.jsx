import React, { useState, useEffect } from 'react';
import { gotoFiches } from '../../utils/nav.js';
import { ElementList } from '../common/ElementList.jsx';
import { ElementDetailsShell, InfoCard, Section } from '../common/ElementDetailsShell.jsx';
import { exportElement } from '../common/exportElement.js';
import { useBatchImport } from '../../utils/useBatchImport.js';
import BatchImportModal from '../../components/common/BatchImportModal.jsx';
import { exportFicheAliment, exportFicheRecette } from '../../utils/ficheExport.js';

// Catégories d'aliments
const NOURRITURE_CATEGORIES = [
  'Viandes',
  'Poissons',
  'Légumes',
  'Fruits',
  'Céréales',
  'Épices',
  'Boissons',
  'Desserts',
  'Plats préparés',
  'Aliments magiques',
  'Autre'
];

// Modèle par défaut pour un aliment
const ALIMENT_DEFAULT = {
  id: null,
  nom: '',
  categorie: 'Viandes',
  origine: '',
  description: '',
  effets: '',
  rarete: 'Commun',
  image: null,
};

// Modèle par défaut pour une recette
const RECETTE_DEFAULT = {
  id: null,
  nom: '',
  ingredients: [],
  preparation: '',
  temps: '',
  difficulte: 'Facile',
  effets: '',
  origine: '',
};

export default function NourritureManager() {
  const [view, setView] = useState('aliments'); // 'aliments' ou 'recettes'
  const [aliments, setAliments] = useState(() => {
    const saved = localStorage.getItem('aliments');
    return saved ? JSON.parse(saved) : [];
  });
  const [recettes, setRecettes] = useState(() => {
    const saved = localStorage.getItem('recettes');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Export global (aliments + recettes)
  const handleGlobalExport = () => {
    try {
      const payload = {
        type: 'nourriture_bundle',
        exportedAt: new Date().toISOString(),
        aliments,
        recettes
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const fileName = `nourriture_export_${Date.now()}.json`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification({ type: 'success', message: `Export global créé: ${fileName}` });
      setTimeout(() => setNotification(null), 4000);
    } catch (e) {
      setNotification({ type: 'error', message: `Erreur export: ${e.message}` });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Import global (fichier JSON contenant aliments/recettes)
  const handleGlobalImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const data = JSON.parse(text);
        let importedAliments = 0;
        let importedRecettes = 0;
        if (Array.isArray(data.aliments)) {
          const base = Date.now();
            const nouveaux = data.aliments.map((a, idx) => ({
              ...ALIMENT_DEFAULT,
              ...a,
              id: a.id || base + idx + Math.random()
            }));
            setAliments(prev => [...prev, ...nouveaux]);
            importedAliments = nouveaux.length;
        }
        if (Array.isArray(data.recettes)) {
          const base2 = Date.now() + 1000;
            const nouvelles = data.recettes.map((r, idx) => ({
              ...RECETTE_DEFAULT,
              ...r,
              id: r.id || base2 + idx + Math.random()
            }));
            setRecettes(prev => [...prev, ...nouvelles]);
            importedRecettes = nouvelles.length;
        }
        if (importedAliments === 0 && importedRecettes === 0) {
          setNotification({ type: 'error', message: 'Aucune donnée reconnue (aliments/recettes)' });
        } else {
          setNotification({ type: 'success', message: `Import: ${importedAliments} aliment(s), ${importedRecettes} recette(s)` });
        }
        setTimeout(() => setNotification(null), 5000);
      } catch (err) {
        setNotification({ type: 'error', message: `Erreur parsing: ${err.message}` });
        setTimeout(() => setNotification(null), 5000);
      }
    };
    reader.readAsText(file);
  };

  // Import batch aliments
  const createDefaultAliment = (name) => ({
    ...ALIMENT_DEFAULT,
    id: Date.now() + Math.random(),
    nom: name,
  });
  const {
    showBatchImport: showBatchImportAliments,
    setShowBatchImport: setShowBatchImportAliments,
    handleBatchImport: handleBatchImportAliments
  } = useBatchImport(
    (aliment) => {
      setAliments((prev) => [...prev, aliment]);
    },
    createDefaultAliment,
    setNotification
  );

  // Import batch recettes
  const createDefaultRecette = (name) => ({
    ...RECETTE_DEFAULT,
    id: Date.now() + Math.random(),
    nom: name,
  });
  const {
    showBatchImport: showBatchImportRecettes,
    setShowBatchImport: setShowBatchImportRecettes,
    handleBatchImport: handleBatchImportRecettes
  } = useBatchImport(
    (recette) => {
      setRecettes((prev) => [...prev, recette]);
    },
    createDefaultRecette,
    setNotification
  );

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('aliments', JSON.stringify(aliments));
    // Sauvegarde aussi au serveur
    fetch('/api/manager/save/nourriture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { aliments, recettes } })
    }).catch(err => console.warn('Sauvegarde fichier JSON échouée:', err));
  }, [aliments, recettes]);

  useEffect(() => {
    localStorage.setItem('recettes', JSON.stringify(recettes));
  }, [recettes]);

  // Gestion des aliments
  const handleSaveAliment = (aliment) => {
    if (aliment.id) {
      setAliments((prev) => prev.map((a) => (a.id === aliment.id ? aliment : a)));
    } else {
      aliment.id = Date.now();
      setAliments((prev) => [...prev, aliment]);
    }
    setSelectedItem(aliment);
    setIsEditing(false);
  };

  const handleDeleteAliment = (id) => {
    if (window.confirm('Supprimer cet aliment ?')) {
      setAliments((prev) => prev.filter((a) => a.id !== id));
      setSelectedItem(null);
    }
  };

  // Gestion des recettes
  const handleSaveRecette = (recette) => {
    if (recette.id) {
      setRecettes((prev) => prev.map((r) => (r.id === recette.id ? recette : r)));
    } else {
      recette.id = Date.now();
      setRecettes((prev) => [...prev, recette]);
    }
    setSelectedItem(recette);
    setIsEditing(false);
  };

  const handleDeleteRecette = (id) => {
    if (window.confirm('Supprimer cette recette ?')) {
      setRecettes((prev) => prev.filter((r) => r.id !== id));
      setSelectedItem(null);
    }
  };

  // Export séparé aliments
  const handleExportAliments = () => {
    try {
      const blob = new Blob([JSON.stringify({ type: 'aliments_list', exportedAt: new Date().toISOString(), aliments }, null, 2)], { type: 'application/json' });
      const fileName = `aliments_${Date.now()}.json`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setNotification({ type: 'success', message: `Export aliments: ${fileName}` });
      setTimeout(() => setNotification(null), 4000);
    } catch (e) {
      setNotification({ type: 'error', message: `Erreur export aliments: ${e.message}` });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Export séparé recettes
  const handleExportRecettes = () => {
    try {
      const blob = new Blob([JSON.stringify({ type: 'recettes_list', exportedAt: new Date().toISOString(), recettes }, null, 2)], { type: 'application/json' });
      const fileName = `recettes_${Date.now()}.json`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setNotification({ type: 'success', message: `Export recettes: ${fileName}` });
      setTimeout(() => setNotification(null), 4000);
    } catch (e) {
      setNotification({ type: 'error', message: `Erreur export recettes: ${e.message}` });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Import séparé aliments
  const handleImportAliments = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const list = Array.isArray(data) ? data : (Array.isArray(data.aliments) ? data.aliments : []);
        if (!list.length) {
          setNotification({ type: 'error', message: 'Aucun aliment trouvé dans le fichier' });
          setTimeout(() => setNotification(null), 4000);
          return;
        }
        const base = Date.now();
        const ajout = list.map((a, idx) => ({ ...ALIMENT_DEFAULT, ...a, id: a.id || base + idx + Math.random() }));
        setAliments(prev => [...prev, ...ajout]);
        setNotification({ type: 'success', message: `${ajout.length} aliment(s) importé(s)` });
        setTimeout(() => setNotification(null), 4000);
      } catch (err) {
        setNotification({ type: 'error', message: `Erreur import aliments: ${err.message}` });
        setTimeout(() => setNotification(null), 5000);
      }
    };
    reader.readAsText(file);
  };

  // Import séparé recettes
  const handleImportRecettes = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const list = Array.isArray(data) ? data : (Array.isArray(data.recettes) ? data.recettes : []);
        if (!list.length) {
          setNotification({ type: 'error', message: 'Aucune recette trouvée dans le fichier' });
          setTimeout(() => setNotification(null), 4000);
          return;
        }
        const base = Date.now();
        const ajout = list.map((r, idx) => ({ ...RECETTE_DEFAULT, ...r, id: r.id || base + idx + Math.random() }));
        setRecettes(prev => [...prev, ...ajout]);
        setNotification({ type: 'success', message: `${ajout.length} recette(s) importée(s)` });
        setTimeout(() => setNotification(null), 4000);
      } catch (err) {
        setNotification({ type: 'error', message: `Erreur import recettes: ${err.message}` });
        setTimeout(() => setNotification(null), 5000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: 6,
          color: 'white',
          backgroundColor:
            notification.type === 'success' ? '#28a745' :
            notification.type === 'error' ? '#dc3545' : '#17a2b8',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          {notification.message}
        </div>
      )}
      <header style={{ borderBottom: '3px solid #FF6B35', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#FF6B35', margin: 0 }}>🍖 Nourriture</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Gestion des aliments, recettes et cuisine de votre univers
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <button
            onClick={gotoFiches}
            style={{
              padding: '0.5rem 1rem',
              background: '#3949ab',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Ouvrir le viewer des fiches"
          >
            📄 Fiches
          </button>
          <button
            onClick={handleGlobalExport}
            style={{
              padding: '0.5rem 1rem',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Exporter tous les aliments et recettes dans un seul fichier JSON"
          >
            📤 Export global
          </button>
          <label
            style={{
              padding: '0.5rem 1rem',
              background: '#17a2b8',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            title="Importer un fichier JSON contenant aliments et/ou recettes"
          >
            📥 Import global
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files[0]) handleGlobalImport(e.target.files[0]); e.target.value=''; }}
            />
          </label>
        </div>
      </header>

      {/* Barre de recherche */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => { setView('aliments'); setSelectedItem(null); setIsEditing(false); }}
          style={{
            padding: '0.5rem 1.5rem',
            background: view === 'aliments' ? '#FF6B35' : '#f0f0f0',
            color: view === 'aliments' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🥩 Aliments
        </button>
        <button
          onClick={() => { setView('recettes'); setSelectedItem(null); setIsEditing(false); }}
          style={{
            padding: '0.5rem 1.5rem',
            background: view === 'recettes' ? '#FF6B35' : '#f0f0f0',
            color: view === 'recettes' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📖 Recettes
        </button>
      </div>

      {/* Contenu selon l'onglet */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Liste */}
        <div style={{ width: '300px' }}>
          <button
            onClick={() => {
              setSelectedItem(view === 'aliments' ? { ...ALIMENT_DEFAULT } : { ...RECETTE_DEFAULT });
              setIsEditing(true);
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            + Nouveau {view === 'aliments' ? 'aliment' : 'recette'}
          </button>
          {/* Boutons export/import selon vue */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {view === 'aliments' ? (
              <>
                <button
                  onClick={handleExportAliments}
                  style={{ padding: '0.55rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  title="Exporter uniquement les aliments"
                >
                  ⬇️ Export Aliments
                </button>
                <label
                  style={{ padding: '0.55rem', background: '#17a2b8', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}
                  title="Importer un fichier JSON contenant une liste d'aliments"
                >
                  ⬆️ Import Aliments
                  <input type="file" accept=".json" style={{ display: 'none' }} onChange={(e) => { if (e.target.files[0]) handleImportAliments(e.target.files[0]); e.target.value=''; }} />
                </label>
              </>
            ) : (
              <>
                <button
                  onClick={handleExportRecettes}
                  style={{ padding: '0.55rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  title="Exporter uniquement les recettes"
                >
                  ⬇️ Export Recettes
                </button>
                <label
                  style={{ padding: '0.55rem', background: '#17a2b8', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}
                  title="Importer un fichier JSON contenant une liste de recettes"
                >
                  ⬆️ Import Recettes
                  <input type="file" accept=".json" style={{ display: 'none' }} onChange={(e) => { if (e.target.files[0]) handleImportRecettes(e.target.files[0]); e.target.value=''; }} />
                </label>
              </>
            )}
          </div>
          <button
            onClick={() => (view === 'aliments' ? setShowBatchImportAliments(true) : setShowBatchImportRecettes(true))}
            style={{
              width: '100%',
              padding: '0.6rem',
              background: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
            title={`Importer plusieurs ${view === 'aliments' ? 'aliments' : 'recettes'} par leurs noms`}
          >
            📝 Import Batch {view === 'aliments' ? 'Aliments' : 'Recettes'}
          </button>

          {view === 'aliments' ? (
            <ElementList
              items={aliments.filter(a => a.nom.toLowerCase().includes(searchTerm.toLowerCase()))}
              selectedId={selectedItem?.id}
              onSelect={(a) => { setSelectedItem(a); setIsEditing(false); }}
              primaryKey="nom"
              secondary={(a) => a.categorie}
              badge={(a) => ({ kind: 'rarete', value: a.rarete })}
              emptyLabel="Aucun aliment"
              renderActions={(a) => (
                <button
                  onClick={(e) => { e.stopPropagation(); exportFicheAliment(a); }}
                  style={{ padding: '4px 8px', border: '1px solid #ddd', background: '#fff', borderRadius: 3, cursor: 'pointer', fontSize: 12 }}
                  title="Exporter la fiche technique"
                >
                  📄
                </button>
              )}
            />
          ) : (
            <ElementList
              items={recettes.filter(r => r.nom.toLowerCase().includes(searchTerm.toLowerCase()))}
              selectedId={selectedItem?.id}
              onSelect={(r) => { setSelectedItem(r); setIsEditing(false); }}
              primaryKey="nom"
              secondary={(r) => r.difficulte}
              badge={(r) => ({ kind: 'difficulte', value: r.difficulte })}
              emptyLabel="Aucune recette"
              renderActions={(r) => (
                <button
                  onClick={(e) => { e.stopPropagation(); exportFicheRecette(r); }}
                  style={{ padding: '4px 8px', border: '1px solid #ddd', background: '#fff', borderRadius: 3, cursor: 'pointer', fontSize: 12 }}
                  title="Exporter la fiche technique"
                >
                  📄
                </button>
              )}
            />
          )}
        </div>

        {/* Détails ou formulaire */}
        <div style={{ flexGrow: 1 }}>
          {isEditing ? (
            view === 'aliments' ? (
              <AlimentForm aliment={selectedItem} onSave={handleSaveAliment} onCancel={() => setIsEditing(false)} />
            ) : (
              <RecetteForm recette={selectedItem} onSave={handleSaveRecette} onCancel={() => setIsEditing(false)} aliments={aliments} />
            )
          ) : selectedItem ? (
            view === 'aliments' ? (
              <AlimentDetails
                aliment={selectedItem}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDeleteAliment}
                onExport={async (a) => {
                  const res = await exportElement({ ...a, type: 'aliment', module: 'nourriture' }, { module: 'nourriture' });
                  if (res.success) {
                    setNotification({ type: 'success', message: `Exporté ${res.fileName}. ${res.hint}` });
                  } else {
                    setNotification({ type: 'error', message: `Erreur: ${res.error}` });
                  }
                  setTimeout(() => setNotification(null), 5000);
                }}
              />
            ) : (
              <RecetteDetails
                recette={selectedItem}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDeleteRecette}
                onExport={async (r) => {
                  const res = await exportElement({ ...r, type: 'recette', module: 'nourriture' }, { module: 'nourriture' });
                  if (res.success) {
                    setNotification({ type: 'success', message: `Exporté ${res.fileName}. ${res.hint}` });
                  } else {
                    setNotification({ type: 'error', message: `Erreur: ${res.error}` });
                  }
                  setTimeout(() => setNotification(null), 5000);
                }}
              />
            )
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              Sélectionnez ou créez un {view === 'aliments' ? 'aliment' : 'recette'}
            </p>
          )}
        </div>
      </div>
      {/* Modals Import Batch */}
      <BatchImportModal
        isOpen={showBatchImportAliments}
        onClose={() => setShowBatchImportAliments(false)}
        onImport={handleBatchImportAliments}
        title="Import Batch - Aliments"
        placeholder={"Steak\nPomme\nPain\nPotion de vigueur\n..."}
        description="Entrez un nom d'aliment par ligne. Chaque aliment sera créé avec des valeurs par défaut (modifiable ensuite)."
      />
      <BatchImportModal
        isOpen={showBatchImportRecettes}
        onClose={() => setShowBatchImportRecettes(false)}
        onImport={handleBatchImportRecettes}
        title="Import Batch - Recettes"
        placeholder={"Soupe de légumes\nTarte aux pommes\nPotion revigorante\n..."}
        description="Entrez un nom de recette par ligne. Chaque recette sera créée avec des valeurs par défaut (modifiable ensuite)."
      />
    </div>
  );
}

// Formulaire Aliment
function AlimentForm({ aliment, onSave, onCancel }) {
  const [form, setForm] = useState(aliment || ALIMENT_DEFAULT);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>✏️ {form.id ? 'Modifier' : 'Créer'} un aliment</h3>
      <input
        placeholder="Nom de l'aliment"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={form.categorie}
        onChange={(e) => setForm({ ...form, categorie: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {NOURRITURE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        placeholder="Origine (univers, région...)"
        value={form.origine}
        onChange={(e) => setForm({ ...form, origine: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={4}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        placeholder="Effets (guérison, énergie, poison...)"
        value={form.effets}
        onChange={(e) => setForm({ ...form, effets: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={form.rarete}
        onChange={(e) => setForm({ ...form, rarete: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option>Commun</option>
        <option>Peu commun</option>
        <option>Rare</option>
        <option>Légendaire</option>
      </select>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" style={{ padding: '0.75rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Enregistrer
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '0.75rem', background: '#ccc', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Annuler
        </button>
      </div>
    </form>
  );
}

// Détails Aliment
function AlimentDetails({ aliment, onEdit, onDelete, onExport }) {
  const badges = [
    { label: 'Catégorie', kind: 'categorie', value: aliment.categorie },
    { label: 'Rareté', kind: 'rarete', value: aliment.rarete }
  ];
  const actions = (
    <>
      <button onClick={onEdit} style={btn('#2196F3')}>✏️ Modifier</button>
      <button onClick={() => onExport && onExport(aliment)} style={btn('#6c757d')} title="Exporter JSON">📂 Exporter</button>
      <button onClick={() => onDelete(aliment.id)} style={btn('#f44336')}>🗑️ Supprimer</button>
    </>
  );
  return (
    <ElementDetailsShell title={aliment.nom} badges={badges} actions={actions}>
      <Section title="Description" icon="📋" content={aliment.description} />
      <Section title="Origine" icon="🌍" content={aliment.origine} />
      <Section title="Effets" icon="✨" content={aliment.effets} />
    </ElementDetailsShell>
  );
}

// Formulaire Recette
function RecetteForm({ recette, onSave, onCancel, aliments }) {
  const [form, setForm] = useState(recette || RECETTE_DEFAULT);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>✏️ {form.id ? 'Modifier' : 'Créer'} une recette</h3>
      <input
        placeholder="Nom de la recette"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Ingrédients (un par ligne)"
        value={form.ingredients.join('\n')}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value.split('\n') })}
        rows={4}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Préparation"
        value={form.preparation}
        onChange={(e) => setForm({ ...form, preparation: e.target.value })}
        rows={6}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        placeholder="Temps de préparation"
        value={form.temps}
        onChange={(e) => setForm({ ...form, temps: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={form.difficulte}
        onChange={(e) => setForm({ ...form, difficulte: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option>Facile</option>
        <option>Moyen</option>
        <option>Difficile</option>
        <option>Expert</option>
      </select>
      <input
        placeholder="Effets (bonus, guérison...)"
        value={form.effets}
        onChange={(e) => setForm({ ...form, effets: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        placeholder="Origine (culture, région...)"
        value={form.origine}
        onChange={(e) => setForm({ ...form, origine: e.target.value })}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" style={{ padding: '0.75rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Enregistrer
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '0.75rem', background: '#ccc', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Annuler
        </button>
      </div>
    </form>
  );
}

// Détails Recette
function RecetteDetails({ recette, onEdit, onDelete, onExport }) {
  const badges = [
    { label: 'Difficulté', kind: 'difficulte', value: recette.difficulte }
  ];
  const actions = (
    <>
      <button onClick={onEdit} style={btn('#2196F3')}>✏️ Modifier</button>
      <button onClick={() => onExport && onExport(recette)} style={btn('#6c757d')} title="Exporter JSON">📂 Exporter</button>
      <button onClick={() => onDelete(recette.id)} style={btn('#f44336')}>🗑️ Supprimer</button>
    </>
  );
  return (
    <ElementDetailsShell title={recette.nom} badges={badges} actions={actions}>
      <Section title="Ingrédients" icon="🥕" content={recette.ingredients} />
      <Section title="Préparation" icon="🍳" content={recette.preparation} />
      {recette.temps && <InfoCard label="Temps" value={recette.temps} icon="⏱️" />}
      <Section title="Effets" icon="✨" content={recette.effets} />
      <Section title="Origine" icon="🌍" content={recette.origine} />
    </ElementDetailsShell>
  );
}

function btn(color, grow) {
  return {
    padding: '0.75rem 1.25rem',
    background: color,
    color: color === '#ccc' ? '#333' : 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flexGrow: grow ? 1 : 0
  };
}
