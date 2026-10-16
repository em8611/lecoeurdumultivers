import React from 'react';

export default function EquipeStats({ stats }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      marginBottom: 16
    }}>
      <div style={{
        padding: 12,
        backgroundColor: 'var(--douceur)',
        borderRadius: 'var(--rayon-carte)',
        border: '1px solid var(--trait)'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--coeur)' }}>
          {stats.total}
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>Total équipes</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: 'var(--douceur)',
        borderRadius: 'var(--rayon-carte)',
        border: '1px solid var(--trait)'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#2e7d4f' }}>
          {stats.active}
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>Équipes actives</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: 'var(--douceur)',
        borderRadius: 'var(--rayon-carte)',
        border: '1px solid var(--trait)'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--or)' }}>
          {stats.totalMembers}
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>Total membres</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: 'var(--douceur)',
        borderRadius: 'var(--rayon-carte)',
        border: '1px solid var(--trait)'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--coeur)' }}>
          {stats.avgMembersPerTeam}
        </div>
        <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>Moy. membres/équipe</div>
      </div>
    </div>
  );
}
