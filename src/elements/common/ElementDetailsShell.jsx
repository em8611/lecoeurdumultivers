import React from 'react';

function badgeStyle() {
  return {
    padding: '4px 10px',
    backgroundColor: 'var(--douceur)',
    color: 'var(--encre)',
    borderRadius: 'var(--rayon-pilule)',
    fontSize: 12,
    fontWeight: 'bold'
  };
}

export function ElementDetailsShell({ title, badges, actions, children }) {
  return (
    <div style={{ border: '1px solid var(--trait)', borderRadius: 'var(--rayon-carte)', padding: '1.5rem', background: 'var(--fond-carte)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>{title}</h2>
          {badges && badges.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {badges.filter(b => b.value).map((b, i) => (
                <span key={i} style={badgeStyle()}>{b.label}: {b.value}</span>
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

export function InfoCard({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ padding: '0.75rem', background: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', color: 'var(--encre)' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>{label}</div>
    </div>
  );
}

export function Section({ title, content }) {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;
  return (
    <div>
      <h4 style={{ marginBottom: 6, color: 'var(--coeur)' }}>{title}</h4>
      {Array.isArray(content) ? (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {content.map((c, i) => (
            <span key={i} style={{ backgroundColor: 'var(--douceur)', color: 'var(--encre)', padding: '2px 10px', borderRadius: 'var(--rayon-pilule)', fontSize: 12 }}>{c}</span>
          ))}
        </div>
      ) : (
        <p style={{ margin: 0, color: 'var(--encre-douce)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{content}</p>
      )}
    </div>
  );
}
