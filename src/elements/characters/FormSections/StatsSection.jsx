import React, { useCallback } from 'react';
import FormField from '../../../components/common/FormField.jsx';
import { CHARACTER_STATS } from '../constants';

// Sous-composant: gestion des matériaux d'évolution
function EvolutionMaterialsSection({ data, targets, onTargetsChange, onChange, starRating, level }) {
  const categories = [
    { key: 'ennemis', label: 'Matériaux (Ennemis)' },
    { key: 'donjonsReguliers', label: 'Matériaux (Donjons réguliers)' },
    { key: 'donjonsHebdomadaires', label: 'Matériaux (Donjons hebdomadaires)' },
    { key: 'bossRegulieres', label: 'Matériaux (Boss réguliers)' },
    { key: 'bossHebdomadaires', label: 'Matériaux (Boss hebdomadaires)' },
    { key: 'speciaux', label: 'Matériaux spéciaux' }
  ];

  const addMaterial = (cat) => {
    const next = { ...data, [cat]: [...(data[cat] || []), { id: Date.now() + Math.random(), nom: '', quantite: 1, palier: 1, note: '' }] };
    onChange(next);
  };
  const updateMaterial = (cat, id, field, value) => {
    const next = {
      ...data,
      [cat]: (data[cat] || []).map(m => m.id === id ? { ...m, [field]: value } : m)
    };
    onChange(next);
  };
  const removeMaterial = (cat, id) => {
    const next = {
      ...data,
      [cat]: (data[cat] || []).filter(m => m.id !== id)
    };
    onChange(next);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1em', fontWeight: 'bold' }}>Évolution & Matériaux</h4>
      {categories.map(c => (
        <div key={c.key} style={{ marginBottom: '1.25rem', border: '1px solid var(--trait)', borderRadius: '6px', padding: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>{c.label}</span>
            <button type="button" className="btn-small" onClick={() => addMaterial(c.key)}>Ajouter matériau</button>
          </div>
          {(data[c.key] && data[c.key].length) ? (
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {data[c.key].map(mat => {
                const maxPalier = Math.max(1, (starRating || 1) + Math.floor((level || 1) / 10) + 2); // règle simple
                const palierInvalid = (mat.palier || 1) > maxPalier;
                return (
                <div key={mat.id} style={{ display: 'grid', gridTemplateColumns: '2fr 0.7fr 0.8fr 2fr auto', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nom"
                    value={mat.nom}
                    onChange={(e) => updateMaterial(c.key, mat.id, 'nom', e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-input"
                    min={1}
                    value={mat.quantite}
                    onChange={(e) => updateMaterial(c.key, mat.id, 'quantite', parseInt(e.target.value) || 1)}
                    placeholder="Qté"
                  />
                  <input
                    type="number"
                    className={`form-input${palierInvalid ? ' is-error' : ''}`}
                    min={1}
                    max={10}
                    value={mat.palier || 1}
                    onChange={(e) => updateMaterial(c.key, mat.id, 'palier', parseInt(e.target.value) || 1)}
                    placeholder="Palier"
                    title={`Palier / niveau d'évolution (max conseillé: ${maxPalier})`}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Note / effet"
                    value={mat.note}
                    onChange={(e) => updateMaterial(c.key, mat.id, 'note', e.target.value)}
                  />
                  <button type="button" className="btn-danger-small" onClick={() => removeMaterial(c.key, mat.id)}>✕</button>
                  {palierInvalid && (
                    <div style={{ gridColumn: '1 / -1', fontSize: '0.65em', color: '#a13d3d' }}>Palier supérieur au maximum suggéré ({maxPalier}).</div>
                  )}
                </div>
              );})}
            </div>
          ) : (
            <div style={{ fontSize: '0.85em', color: 'var(--encre-douce)' }}>Aucun matériau ajouté.</div>
          )}
        </div>
      ))}
      {/* Résumé agrégé */}
      <MaterialsSummary data={data} categories={categories} targets={targets} onTargetsChange={onTargetsChange} />
    </div>
  );
}

function MaterialsSummary({ data, categories, targets, onTargetsChange }) {
  // Calcul des totaux par catégorie et regroupement par nom et par palier
  const summary = categories.map(c => {
    const arr = data[c.key] || [];
    const totalQuantite = arr.reduce((s, m) => s + (m.quantite || 0), 0);
    const perPalier = arr.reduce((acc, m) => {
      const p = m.palier || 1;
      acc[p] = (acc[p] || 0) + (m.quantite || 0);
      return acc;
    }, {});
    return { key: c.key, label: c.label, totalQuantite, perPalier, items: arr };
  });

  // Agrégation globale par nom (toutes catégories confondues)
  const allItems = summary.flatMap(s => s.items);
  const byName = allItems.reduce((acc, m) => {
    if (!m.nom) return acc;
    acc[m.nom] = acc[m.nom] || { nom: m.nom, quantite: 0, paliers: {} };
    acc[m.nom].quantite += (m.quantite || 0);
    const p = m.palier || 1;
    acc[m.nom].paliers[p] = (acc[m.nom].paliers[p] || 0) + (m.quantite || 0);
    return acc;
  }, {});

  const totalGlobal = allItems.reduce((s, m) => s + (m.quantite || 0), 0);

  // Mise à jour des objectifs (création si manquant)
  const ensureTargets = () => {
    let changed = false;
    const next = { ...(targets || {}) };
    Object.values(byName).forEach(item => {
      if (!next[item.nom]) { next[item.nom] = { total: item.quantite, paliers: {} }; changed = true; }
      Object.keys(item.paliers).forEach(p => {
        if (!next[item.nom].paliers[p]) { next[item.nom].paliers[p] = item.paliers[p]; changed = true; }
      });
    });
    if (changed) onTargetsChange(next);
  };
  ensureTargets();

  const handleTargetChange = (nom, field, value, palier) => {
    const next = { ...(targets || {}) };
    next[nom] = next[nom] || { total: 0, paliers: {} };
    if (field === 'total') {
      next[nom].total = value;
    } else if (field === 'palier') {
      next[nom].paliers[palier] = value;
    }
    onTargetsChange(next);
  };

  // Export JSON
  const exportJSON = () => {
    const exportObj = {
      categories: summary.map(s => ({ key: s.key, label: s.label, total: s.totalQuantite, perPalier: s.perPalier })),
      materials: Object.values(byName).map(item => ({
        nom: item.nom,
        quantite: item.quantite,
        paliers: item.paliers,
        targets: targets && targets[item.nom] ? targets[item.nom] : null,
        missingTotal: targets && targets[item.nom] ? Math.max(0, (targets[item.nom].total || 0) - item.quantite) : null,
        missingPerPalier: targets && targets[item.nom] ? Object.keys(targets[item.nom].paliers || {}).reduce((acc,p)=>{
          acc[p] = Math.max(0, (targets[item.nom].paliers[p]||0) - (item.paliers[p]||0));
          return acc;}, {}) : null
      })),
      totalGlobal
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'materiaux_evolution.json'; a.click();
    URL.revokeObjectURL(url);
  };

  // Export CSV
  const exportCSV = () => {
    const rows = [['Categorie','Nom','Palier','Quantite','CiblePalier','ManquantPalier','TotalNom','CibleTotal','ManquantTotal']];
    summary.forEach(s => {
      (data[s.key]||[]).forEach(m => {
        const tgt = targets && targets[m.nom];
        const cibleTotal = tgt ? (tgt.total||0) : '';
        const manquantTotal = tgt ? Math.max(0, (tgt.total||0) - Object.values(byName[m.nom].paliers).reduce((a,b)=>a+b,0)) : '';
        const ciblePalier = tgt && tgt.paliers[m.palier||1] !== undefined ? tgt.paliers[m.palier||1] : '';
        const manquantPalier = tgt && tgt.paliers[m.palier||1] !== undefined ? Math.max(0, tgt.paliers[m.palier||1] - m.quantite) : '';
        rows.push([s.label, m.nom, m.palier||1, m.quantite, ciblePalier, manquantPalier, byName[m.nom].quantite, cibleTotal, manquantTotal]);
      });
    });
    const csv = rows.map(r => r.map(x => typeof x === 'string' && x.includes(',') ? '"'+x+'"' : x).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'materiaux_evolution.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h5 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Résumé des matériaux</h5>
      {allItems.length === 0 ? (
        <div style={{ fontSize: '0.85em', color: 'var(--encre-douce)' }}>Aucun matériau pour le résumé.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85em', marginBottom: '0.25rem', fontWeight: '600' }}>Totaux par catégorie</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '0.5rem' }}>
              {summary.map(s => (
                <div key={s.key} style={{ background: 'var(--douceur)', border: '1px solid var(--trait)', borderRadius: '6px', padding: '0.5rem' }}>
                  <div style={{ fontSize: '0.75em', fontWeight: '600', marginBottom: '0.25rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.8em' }}>Total: <strong>{s.totalQuantite}</strong></div>
                  <div style={{ fontSize: '0.7em', marginTop: '0.25rem' }}>
                    {Object.entries(s.perPalier).sort((a,b)=>parseInt(a[0]) - parseInt(b[0])).map(([p,v]) => (
                      <span key={p} style={{ marginRight: '0.4rem' }}>P{p}:{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.85em', marginBottom: '0.25rem', fontWeight: '600' }}>Objectifs & Manquants</div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {Object.values(byName).map(item => {
                const tgt = targets && targets[item.nom] ? targets[item.nom] : { total: 0, paliers: {} };
                const missingTotal = Math.max(0, (tgt.total || 0) - item.quantite);
                return (
                  <div key={item.nom} style={{ background: 'var(--douceur)', padding: '0.6rem 0.7rem', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.8em', fontWeight: '600' }}>{item.nom}</span>
                      <span style={{ fontSize: '0.7em' }}>Actuel: {item.quantite}</span>
                      <span style={{ fontSize: '0.7em' }}>Cible totale: <input type="number" min={0} value={tgt.total || 0} onChange={(e)=>handleTargetChange(item.nom,'total', parseInt(e.target.value)||0)} style={{ width: '70px' }} /></span>
                      <span style={{ fontSize: '0.7em', color: missingTotal>0?'#a13d3d':'#2e7d4f' }}>Manquant total: {missingTotal}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {Object.entries(item.paliers).sort((a,b)=>parseInt(a[0]) - parseInt(b[0])).map(([p,v]) => {
                        const palierTarget = tgt.paliers && tgt.paliers[p] !== undefined ? tgt.paliers[p] : v;
                        const missing = Math.max(0, (palierTarget || 0) - v);
                        return (
                          <div key={p} style={{ background: 'var(--douceur)', padding: '0.3rem 0.45rem', borderRadius: '4px', fontSize: '0.65em', display: 'flex', flexDirection: 'column', minWidth: '105px' }}>
                            <span style={{ fontWeight: '600' }}>Palier {p}</span>
                            <span>Actuel: {v}</span>
                            <span>Cible: <input type="number" min={0} value={palierTarget} onChange={(e)=>handleTargetChange(item.nom,'palier', parseInt(e.target.value)||0, p)} style={{ width: '55px' }} /></span>
                            <span style={{ color: missing>0?'#a13d3d':'#2e7d4f' }}>Manquant: {missing}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ fontSize: '0.8em', fontWeight: '600' }}>Total global matériaux: {totalGlobal}</div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn-small" onClick={exportJSON}>Export JSON</button>
            <button type="button" className="btn-small" onClick={exportCSV}>Export CSV</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sous-composant: arborescence des compétences
function SkillTreeSection({ data, onChange }) {
  const addRootSkill = () => {
    const next = [...data, {
      id: Date.now() + Math.random(),
      nom: '',
      niveau: 1,
      description: '',
      children: []
    }];
    onChange(next);
  };
  const updateSkill = (id, field, value) => {
    const updateRecursive = (nodes) => nodes.map(n => {
      if (n.id === id) return { ...n, [field]: value };
      if (n.children && n.children.length) return { ...n, children: updateRecursive(n.children) };
      return n;
    });
    onChange(updateRecursive(data));
  };
  const removeSkill = (id) => {
    const removeRecursive = (nodes) => nodes.filter(n => n.id !== id).map(n => ({ ...n, children: n.children ? removeRecursive(n.children) : [] }));
    onChange(removeRecursive(data));
  };
  const addChildSkill = (parentId) => {
    const addRecursive = (nodes) => nodes.map(n => {
      if (n.id === parentId) {
        return {
          ...n,
          children: [...(n.children || []), { id: Date.now() + Math.random(), nom: '', niveau: 1, description: '', children: [] }]
        };
      }
      return { ...n, children: n.children ? addRecursive(n.children) : [] };
    });
    onChange(addRecursive(data));
  };

  const renderNode = (node, depth = 0) => (
    <div key={node.id} style={{ border: '1px solid var(--trait)', borderRadius: '6px', padding: '0.5rem', marginBottom: '0.5rem', marginLeft: depth * 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.6fr 2fr auto auto', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Nom"
          value={node.nom}
          onChange={(e) => updateSkill(node.id, 'nom', e.target.value)}
        />
        <input
          type="number"
          className="form-input"
          min={1}
          value={node.niveau}
          onChange={(e) => updateSkill(node.id, 'niveau', parseInt(e.target.value) || 1)}
          placeholder="Niv"
        />
        <input
          type="text"
          className="form-input"
          placeholder="Description"
          value={node.description}
          onChange={(e) => updateSkill(node.id, 'description', e.target.value)}
        />
        <button type="button" className="btn-small" onClick={() => addChildSkill(node.id)}>+ Sous</button>
        <button type="button" className="btn-danger-small" onClick={() => removeSkill(node.id)}>✕</button>
      </div>
      {node.children && node.children.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {node.children.map(child => renderNode(child, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1em', fontWeight: 'bold' }}>Arborescence des Compétences</h4>
      <button type="button" className="btn-small" onClick={addRootSkill} style={{ marginBottom: '0.75rem' }}>Ajouter compétence racine</button>
      {data.length === 0 ? (
        <div style={{ fontSize: '0.85em', color: 'var(--encre-douce)' }}>Aucune compétence définie.</div>
      ) : (
        <div>{data.map(node => renderNode(node))}</div>
      )}
    </div>
  );
}

function StatsSection({ formData, onStatChange, onInputChange }) {
  const handleEvolutionMaterialsChange = useCallback((next) => {
    onInputChange('evolutionMaterials', next);
  }, [onInputChange]);
  const handleSkillTreeChange = useCallback((next) => {
    onInputChange('skillTree', next);
  }, [onInputChange]);
  const handleEvolutionTargetsChange = useCallback((next) => {
    onInputChange('evolutionTargets', next);
  }, [onInputChange]);
  return (
    <div className="form-section-card">
      <div className="form-grid">
        <FormField
          id="character-combat-type"
          label="Type de combat"
          type="select"
          value={formData.combatType || ''}
          onChange={(e) => onInputChange('combatType', e.target.value)}
          containerClassName="form-half"
          options={["DPS", "Tank", "Attaque à distance", "Soutien", "Buffeur"]}
        />

        <FormField
          id="character-star-rating"
          label="Nombre d'étoiles"
          type="number"
          value={formData.starRating || 1}
          onChange={(e) => onInputChange('starRating', parseInt(e.target.value) || 1)}
          containerClassName="form-half"
          min={1}
          max={5}
          placeholder="1-5"
        />

        <FormField
          id="character-gacha-event"
          label="Événement (Gacha)"
          type="text"
          value={formData.gachaEvent || ''}
          onChange={(e) => onInputChange('gachaEvent', e.target.value)}
          containerClassName="form-half"
          placeholder="Ex: Bannière d'été, Event limité..."
        />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', fontSize: '1.1em', fontWeight: 'bold' }}>
          Statistiques du personnage
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {CHARACTER_STATS.map(stat => (
            <div key={stat} style={{ textAlign: 'center' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '0.25rem' }}>
                {stat}
              </label>
              <input
                type="number"
                value={formData.stats[stat]}
                onChange={(e) => onStatChange(stat, e.target.value)}
                className="form-input"
                style={{
                  textAlign: 'center',
                  fontSize: '1.1em',
                  fontWeight: 'bold'
                }}
                min="1"
                max="20"
              />
              <div style={{
                marginTop: '0.25rem',
                fontSize: '0.85em',
                color: 'var(--encre-douce)',
                fontWeight: 'bold'
              }}>
                Modificateur: {Math.floor((formData.stats[stat] - 10) / 2) >= 0 ? '+' : ''}{Math.floor((formData.stats[stat] - 10) / 2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <EvolutionMaterialsSection
        data={formData.evolutionMaterials || { ennemis: [], donjonsReguliers: [], donjonsHebdomadaires: [], bossRegulieres: [], bossHebdomadaires: [], speciaux: [] }}
        targets={formData.evolutionTargets || {}}
        onTargetsChange={handleEvolutionTargetsChange}
        onChange={handleEvolutionMaterialsChange}
        starRating={formData.starRating}
        level={formData.level}
      />
      <SkillTreeSection
        data={formData.skillTree || []}
        onChange={handleSkillTreeChange}
      />
    </div>
  );
}

export default StatsSection;
