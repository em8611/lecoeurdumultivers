import React from 'react';
import { useElementsState } from '../state/elementsStore.jsx';

const MODULES = [
  {
    key: 'elements', label: 'Éléments', icon: '📊',
    count: s => s.characters.length + s.locations.length + s.objects.length + s.bestiaires.length + s.nourritures.length + s.materiauxs.length
  },
  { key: 'relations', label: 'Relations', icon: '🔗', count: s => s.relations.length },
  { key: 'equipes', label: 'Équipes', icon: '👥', count: s => s.equipes.length },
  { key: 'pouvoirs', label: 'Pouvoirs & Compétences', icon: '✨', count: s => s.pouvoirs.length },
  { key: 'dictionnaire', label: 'Dictionnaire', icon: '📖', count: s => s.termes.length },
  { key: 'concepts', label: 'Concepts', icon: '⚖️', count: s => s.concepts.length },
  { key: 'chronologie', label: 'Chronologie', icon: '🕰️', count: s => s.evenements.length },
  { key: 'geographie', label: 'Cartes & Géographie', icon: '🗺️', count: s => s.cartes.length + s.territoires.length },
  { key: 'diplomatie', label: 'Factions & Diplomatie', icon: '🤝', count: s => s.diplomatieRelations.length },
  { key: 'magie', label: 'Magie & Système de Combat', icon: '🔮', count: s => s.ecolesMagie.length + s.stylesCombat.length },
  { key: 'univers', label: 'Univers / Multivers', icon: '🌌', count: s => s.universMultivers.length },
  { key: 'religion', label: 'Religion & Mythologie', icon: '⛩️', count: s => s.divinites.length + s.mythes.length },
  { key: 'quetes', label: 'Quêtes & Intrigues', icon: '🗡️', count: s => s.quetes.length },
  { key: 'langues', label: 'Langues & Écritures', icon: '🗣️', count: s => s.langues.length },
  { key: 'artefacts', label: 'Artefacts & Reliques', icon: '🗝️', count: s => s.artefacts.length },
  { key: 'economie', label: 'Économie & Commerce', icon: '💰', count: s => s.ressources.length + s.routesCommerciales.length },
  { key: 'technologie', label: 'Technologie & Sciences', icon: '🔬', count: s => s.sciences.length + s.technologies.length },
  { key: 'culture', label: 'Culture & Société', icon: '🏺', count: s => s.traditions.length }
];

// Collections dont les entrées possèdent un nom + des dates, pour l'activité récente
const RECENT_SOURCES = [
  { moduleKey: 'elements', label: 'Personnage', icon: '📊', stateKey: 'characters' },
  { moduleKey: 'elements', label: 'Lieu', icon: '📊', stateKey: 'locations' },
  { moduleKey: 'elements', label: 'Objet', icon: '📊', stateKey: 'objects' },
  { moduleKey: 'elements', label: 'Bestiaire', icon: '📊', stateKey: 'bestiaires' },
  { moduleKey: 'relations', label: 'Relation', icon: '🔗', stateKey: 'relations' },
  { moduleKey: 'equipes', label: 'Équipe', icon: '👥', stateKey: 'equipes' },
  { moduleKey: 'pouvoirs', label: 'Pouvoir', icon: '✨', stateKey: 'pouvoirs' },
  { moduleKey: 'dictionnaire', label: 'Terme', icon: '📖', stateKey: 'termes' },
  { moduleKey: 'concepts', label: 'Concept', icon: '⚖️', stateKey: 'concepts' },
  { moduleKey: 'chronologie', label: 'Événement', icon: '🕰️', stateKey: 'evenements' },
  { moduleKey: 'geographie', label: 'Carte', icon: '🗺️', stateKey: 'cartes' },
  { moduleKey: 'geographie', label: 'Territoire', icon: '🗺️', stateKey: 'territoires' },
  { moduleKey: 'diplomatie', label: 'Relation diplomatique', icon: '🤝', stateKey: 'diplomatieRelations' },
  { moduleKey: 'magie', label: 'École de Magie', icon: '🔮', stateKey: 'ecolesMagie' },
  { moduleKey: 'magie', label: 'Style de Combat', icon: '🔮', stateKey: 'stylesCombat' },
  { moduleKey: 'univers', label: 'Univers', icon: '🌌', stateKey: 'universMultivers' },
  { moduleKey: 'religion', label: 'Divinité', icon: '⛩️', stateKey: 'divinites' },
  { moduleKey: 'religion', label: 'Mythe', icon: '⛩️', stateKey: 'mythes' },
  { moduleKey: 'quetes', label: 'Quête', icon: '🗡️', stateKey: 'quetes' },
  { moduleKey: 'langues', label: 'Langue', icon: '🗣️', stateKey: 'langues' },
  { moduleKey: 'artefacts', label: 'Artefact', icon: '🗝️', stateKey: 'artefacts' },
  { moduleKey: 'economie', label: 'Ressource', icon: '💰', stateKey: 'ressources' },
  { moduleKey: 'economie', label: 'Route commerciale', icon: '💰', stateKey: 'routesCommerciales' },
  { moduleKey: 'technologie', label: 'Discipline Scientifique', icon: '🔬', stateKey: 'sciences' },
  { moduleKey: 'technologie', label: 'Discipline Technologique', icon: '🔬', stateKey: 'technologies' },
  { moduleKey: 'culture', label: 'Tradition', icon: '🏺', stateKey: 'traditions' }
];

function timeAgo(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  return date.toLocaleDateString('fr-FR');
}

export function Home({ onNavigate }) {
  const state = useElementsState();

  const totalEntries = MODULES.reduce((sum, m) => sum + m.count(state), 0);

  const recentItems = RECENT_SOURCES
    .flatMap(source => (state[source.stateKey] || []).map(item => ({
      ...item,
      __moduleKey: source.moduleKey,
      __typeLabel: source.label,
      __icon: source.icon,
      __date: item.updatedAt || item.createdAt
    })))
    .filter(item => item.__date)
    .sort((a, b) => new Date(b.__date) - new Date(a.__date))
    .slice(0, 8);

  const goTo = (key) => {
    if (onNavigate) onNavigate(key);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0 }}>🌠 Le Coeur du Multivers</h1>
        <p style={{ color: '#666', fontSize: 15, marginTop: 8 }}>
          {totalEntries} fiche{totalEntries === 1 ? '' : 's'} répartie{totalEntries === 1 ? '' : 's'} sur {MODULES.length} modules.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 32
      }}>
        {MODULES.map(m => {
          const count = m.count(state);
          return (
            <button
              key={m.key}
              onClick={() => goTo(m.key)}
              style={{
                textAlign: 'left',
                padding: 16,
                borderRadius: 10,
                border: '1px solid #dee2e6',
                backgroundColor: '#fff',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'transform 0.1s, box-shadow 0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 13, color: '#888' }}>
                {count} fiche{count === 1 ? '' : 's'}
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <h3 style={{ marginBottom: 12 }}>🕒 Activité récente</h3>
        {recentItems.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>
            Aucune fiche créée pour le moment. Choisissez un module ci-dessus pour commencer.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentItems.map((item, idx) => (
              <button
                key={`${item.__moduleKey}-${item.id}-${idx}`}
                onClick={() => goTo(item.__moduleKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: 18 }}>{item.__icon}</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 14 }}>{item.name || 'Sans nom'}</strong>
                  <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>{item.__typeLabel}</span>
                </div>
                <span style={{ fontSize: 12, color: '#aaa' }}>{timeAgo(item.__date)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
