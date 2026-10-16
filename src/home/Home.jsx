import React from 'react';
import { useElementsState } from '../state/elementsStore.jsx';
import { MODULES, ENTITY_SOURCES as RECENT_SOURCES } from '../utils/moduleRegistry.js';

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
