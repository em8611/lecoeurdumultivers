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
        backgroundColor: '#e3f2fd',
        borderRadius: 6,
        border: '1px solid #90caf9'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1976d2' }}>
          {stats.total}
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>Total équipes</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: '#e8f5e9',
        borderRadius: 6,
        border: '1px solid #81c784'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#388e3c' }}>
          {stats.active}
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>Équipes actives</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: '#fff3e0',
        borderRadius: 6,
        border: '1px solid #ffb74d'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#f57c00' }}>
          {stats.totalMembers}
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>Total membres</div>
      </div>
      <div style={{
        padding: 12,
        backgroundColor: '#f3e5f5',
        borderRadius: 6,
        border: '1px solid #ba68c8'
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#7b1fa2' }}>
          {stats.avgMembersPerTeam}
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>Moy. membres/équipe</div>
      </div>
    </div>
  );
}
