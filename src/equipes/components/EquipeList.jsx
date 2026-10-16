import React from 'react';
import AccordionList from '../../components/common/AccordionList.jsx';

export default function EquipeList({
  equipes,
  selectedEquipe,
  viewMode,
  onSelectEquipe,
  onDeleteEquipe,
  onEditEquipe
}) {
  if (equipes.length === 0) {
    return (
      <p style={{ color: 'var(--encre-douce)', fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
        Aucune équipe créée. Cliquez sur le bouton ci-dessus pour commencer.
      </p>
    );
  }

  if (viewMode === 'list') {
    const renderHeader = (equipe) => (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 4,
          height: 40,
          backgroundColor: equipe.colors?.primary || 'var(--coeur)',
          borderRadius: 2,
          marginRight: 8
        }} />
        {equipe.emblem && (
          <img
            src={equipe.emblem}
            alt={equipe.name}
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <strong style={{ fontSize: 16 }}>{equipe.name}</strong>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: 'var(--rayon-pilule)',
              backgroundColor: 'var(--douceur)',
              color: 'var(--encre)'
            }}>
              {equipe.status}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginTop: 4 }}>
            {equipe.type} • {equipe.members.length} membre(s)
            {equipe.headquarters && ` • ${equipe.headquarters}`}
          </div>
        </div>
      </div>
    );

    const renderContent = (equipe) => (
      <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
        {equipe.description && (
          <div style={{ marginBottom: 12 }}>
            <strong>Description :</strong>
            <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {equipe.description}
            </p>
          </div>
        )}
        {equipe.objectives && (
          <div style={{ marginBottom: 12 }}>
            <strong>Objectifs :</strong>
            <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {equipe.objectives}
            </p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
          {equipe.founded && <div><strong>Fondation :</strong> {equipe.founded}</div>}
          {equipe.leader && <div><strong>Leader :</strong> Oui</div>}
          {equipe.seconds && equipe.seconds.length > 0 && (
            <div><strong>Seconds :</strong> {equipe.seconds.length}</div>
          )}
        </div>
      </div>
    );

    return (
      <AccordionList
        items={equipes}
        selectedItem={selectedEquipe}
        onSelect={onSelectEquipe}
        onEdit={onEditEquipe}
        onDelete={onDeleteEquipe}
        renderHeader={renderHeader}
        renderContent={renderContent}
        emptyMessage="Aucune équipe ne correspond aux filtres sélectionnés."
      />
    );
  }

  // Vue cartes (inchangée)
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 12
    }}>
      {equipes.map(equipe => (
        <div
          key={equipe.id}
          onClick={() => onSelectEquipe(equipe)}
          style={{
            cursor: 'pointer',
            padding: 16,
            backgroundColor: selectedEquipe?.id === equipe.id ? 'var(--douceur)' : 'var(--fond-carte)',
            border: selectedEquipe?.id === equipe.id ? '2px solid var(--coeur)' : '1px solid var(--trait)',
            borderRadius: 'var(--rayon-carte)',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--ombre-legere)',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 4
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditEquipe(equipe);
              }}
              style={{
                padding: '4px 8px',
                backgroundColor: 'var(--or)',
                color: 'var(--sur-or)',
                border: 'none',
                borderRadius: 'var(--rayon-bouton)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 'bold'
              }}
              title="Modifier"
            >
              Modifier
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEquipe(equipe.id);
              }}
              style={{
                padding: '4px 8px',
                backgroundColor: '#a13d3d',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--rayon-bouton)',
                cursor: 'pointer',
                fontSize: 11
              }}
            >
              ✕
            </button>
          </div>

          {equipe.emblem && (
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <img
                src={equipe.emblem}
                alt={equipe.name}
                style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          <h4 style={{
            margin: '0 0 8px 0',
            fontFamily: 'var(--police-affichage)',
            fontWeight: 600,
            color: 'var(--coeur)',
            fontSize: 16
          }}>
            {equipe.name}
          </h4>

          <div style={{ fontSize: 12, color: 'var(--encre-douce)', marginBottom: 8 }}>
            {equipe.type}
          </div>

          <div style={{
            fontSize: 12,
            color: 'var(--encre)',
            marginBottom: 8,
            height: 40,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {equipe.description || 'Aucune description'}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 8,
            borderTop: '1px solid var(--trait)'
          }}>
            <span style={{ fontSize: 12, color: 'var(--encre-douce)' }}>
              {equipe.members.length} membres
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: 'var(--rayon-pilule)',
              backgroundColor: 'var(--douceur)',
              color: 'var(--encre)'
            }}>
              {equipe.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
