import React from 'react';
import { useElementsState } from '../state/elementsStore.jsx';
import { MODULES, ENTITY_SOURCES as RECENT_SOURCES } from '../utils/moduleRegistry.js';
import coeurEmbleme from '../assets/coeur-embleme.svg';

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
      __date: item.updatedAt || item.createdAt
    })))
    .filter(item => item.__date)
    .sort((a, b) => new Date(b.__date) - new Date(a.__date))
    .slice(0, 8);

  const goTo = (key) => {
    if (onNavigate) onNavigate(key);
  };

  return (
    <div className="home-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--espace-4)', marginBottom: 'var(--espace-8)' }}>
        <img src={coeurEmbleme} alt="" width={48} height={48} />
        <div>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--police-affichage)',
            fontSize: 48,
            lineHeight: '52px',
            fontWeight: 600,
            color: 'var(--coeur)'
          }}>
            Cœur du Multivers
          </h1>
          <p style={{ color: 'var(--encre-douce)', fontSize: 15, marginTop: 'var(--espace-2)' }}>
            {totalEntries} fiche{totalEntries === 1 ? '' : 's'} répartie{totalEntries === 1 ? '' : 's'} sur {MODULES.length} modules.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 'var(--espace-4)',
        marginBottom: 'var(--espace-8)'
      }}>
        {MODULES.map(m => {
          const count = m.count(state);
          return (
            <button
              key={m.key}
              onClick={() => goTo(m.key)}
              style={{
                textAlign: 'left',
                padding: 'var(--espace-4)',
                borderRadius: 'var(--rayon-carte)',
                border: '1px solid var(--trait)',
                backgroundColor: 'var(--fond-carte)',
                cursor: 'pointer',
                boxShadow: 'var(--ombre-legere)',
                transition: 'box-shadow 220ms ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--ombre-survol)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--ombre-legere)'; }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4, color: 'var(--encre)' }}>{m.label}</div>
              <div style={{ fontSize: 13, color: 'var(--encre-douce)' }}>
                {count} fiche{count === 1 ? '' : 's'}
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--espace-3)', color: 'var(--encre)' }}>Activité récente</h3>
        {recentItems.length === 0 ? (
          <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic' }}>
            Aucune fiche créée pour le moment. Choisissez un module ci-dessus pour commencer.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espace-2)' }}>
            {recentItems.map((item, idx) => (
              <button
                key={`${item.__moduleKey}-${item.id}-${idx}`}
                onClick={() => goTo(item.__moduleKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--espace-3)',
                  padding: '10px 14px',
                  borderRadius: 'var(--rayon-bouton)',
                  border: '1px solid var(--trait)',
                  backgroundColor: 'var(--douceur)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 14, color: 'var(--encre)' }}>{item.name || 'Sans nom'}</strong>
                  <span style={{ fontSize: 12, color: 'var(--encre-douce)', marginLeft: 8 }}>{item.__typeLabel}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--encre-douce)' }}>{timeAgo(item.__date)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
