import React from 'react';

const BADGE_COLORS = {
  danger: '#dc3545',
  type: '#6c757d',
  habitat: '#28a745',
  rarete: '#fd7e14',
  etat: '#17a2b8'
};

function badgeStyle(kind) {
  return {
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    background: BADGE_COLORS[kind] || '#6c757d',
    color: 'white'
  };
}

export function ElementDetailsShell({ title, badges, actions, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1.5rem', background: '#fff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0 }}>{title}</h2>
          {badges && badges.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {badges.filter(b => b.value).map((b, i) => (
                <span key={i} style={badgeStyle(b.kind)}>{b.label}: {b.value}</span>
              ))}
            </div>
          )}
        </div>
        {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function InfoCard({ label, value, icon }) {
  if (!value) return null;
  return (
    <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: 8, textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem' }}>{icon}</div>
      <div style={{ fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
    </div>
  );
}

export function Section({ title, icon, content }) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;
  return (
    <div>
      <h4 style={{ marginBottom: 6 }}>{icon} {title}</h4>
      {Array.isArray(content) ? (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {content.map((c, i) => (
            <span key={i} style={{ background: '#e9ecef', padding: '2px 10px', borderRadius: 12, fontSize: 12 }}>{c}</span>
          ))}
        </div>
      ) : (
        <p style={{ margin: 0, color: '#555', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{content}</p>
      )}
    </div>
  );
}
