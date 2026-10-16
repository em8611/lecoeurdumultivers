import React from 'react';
import SubBranchManager from './SubBranchManager.jsx';
import FicheEquipeButton from '../../components/common/FicheEquipeButton.jsx';

export default function EquipeDetails({
  selectedEquipe,
  characters,
  availableCharacters,
  getCharacterById,
  onSetLeader,
  onSetSecond,
  onRemoveSecond,
  onRemoveMember,
  onAddMember,
  showSubBranchForm,
  setShowSubBranchForm,
  subBranchData,
  setSubBranchData,
  onAddSubBranch,
  onDeleteSubBranch,
  onAddMemberToSubBranch,
  onRemoveMemberFromSubBranch
}) {
  return (
    <div style={{
      flex: 1,
      border: `2px solid ${selectedEquipe.colors?.primary || 'var(--trait)'}`,
      padding: 20,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: 'calc(100vh - 200px)',
      overflowY: 'auto'
    }}>
      {/* En-tête avec emblème */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: `2px solid ${selectedEquipe.colors?.primary || 'var(--trait)'}`
      }}>
        {selectedEquipe.emblem && (
          <img
            src={selectedEquipe.emblem}
            alt={selectedEquipe.name}
            style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 'var(--rayon-image)', border: '1px solid var(--trait)' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--police-affichage)',
            fontWeight: 600,
            color: 'var(--coeur)',
            fontSize: 24
          }}>
            {selectedEquipe.name}
          </h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)', marginTop: 4 }}>
            {selectedEquipe.type}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <span style={{
            padding: '4px 10px',
            backgroundColor: 'var(--douceur)',
            color: 'var(--encre)',
            borderRadius: 'var(--rayon-pilule)',
            fontSize: 12,
            fontWeight: 'bold'
          }}>
            {selectedEquipe.status}
          </span>
          <FicheEquipeButton equipe={selectedEquipe} />
        </div>
      </div>

      {/* Informations générales */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', marginBottom: 12 }}>
          Informations générales
        </h4>

        {selectedEquipe.founded && (
          <div style={{ marginBottom: 8, fontSize: 14 }}>
            <strong>Fondation:</strong> {selectedEquipe.founded}
          </div>
        )}

        {selectedEquipe.headquarters && (
          <div style={{ marginBottom: 8, fontSize: 14 }}>
            <strong>Quartier général:</strong> {selectedEquipe.headquarters}
          </div>
        )}

        {selectedEquipe.description && (
          <div style={{ marginBottom: 12 }}>
            <strong>Description:</strong>
            <p style={{
              margin: '4px 0',
              fontStyle: 'italic',
              color: 'var(--encre-douce)',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {selectedEquipe.description}
            </p>
          </div>
        )}

        {selectedEquipe.objectives && (
          <div style={{ marginBottom: 12 }}>
            <strong>Objectifs:</strong>
            <p style={{
              margin: '4px 0',
              color: 'var(--encre-douce)',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {selectedEquipe.objectives}
            </p>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <strong>Couleurs:</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: selectedEquipe.colors?.primary || 'var(--coeur)',
              borderRadius: 'var(--rayon-bouton)',
              border: '1px solid var(--trait)'
            }} title="Couleur primaire" />
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: selectedEquipe.colors?.secondary || 'var(--douceur)',
              borderRadius: 'var(--rayon-bouton)',
              border: '1px solid var(--trait)'
            }} title="Couleur secondaire" />
          </div>
        </div>
      </div>

      {/* Moments marquants */}
      {selectedEquipe.keyMoments && (
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', marginBottom: 12 }}>
            Moments marquants
          </h4>
          <div style={{
            padding: 12,
            backgroundColor: 'var(--douceur)',
            borderRadius: 'var(--rayon-carte)',
            borderLeft: '3px solid var(--or)'
          }}>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: 'var(--encre)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6
            }}>
              {selectedEquipe.keyMoments}
            </p>
          </div>
        </div>
      )}

      {/* Hiérarchie */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', marginBottom: 12 }}>
          Hiérarchie
        </h4>

        <div style={{ marginBottom: 12 }}>
          <strong>Leader:</strong>
          {selectedEquipe.leader ? (
            <div style={{
              marginTop: 4,
              padding: 8,
              backgroundColor: 'var(--douceur)',
              borderRadius: 'var(--rayon-bouton)',
              border: '1px solid var(--or)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{getCharacterById(selectedEquipe.leader)?.name}</span>
              <button
                onClick={() => onSetLeader(null)}
                style={{
                  padding: '2px 6px',
                  backgroundColor: '#a13d3d',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--rayon-bouton)',
                  cursor: 'pointer',
                  fontSize: 11
                }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--encre-douce)', marginTop: 4 }}>
              Aucun leader désigné
            </div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <strong>Second(s):</strong>
          {selectedEquipe.seconds && selectedEquipe.seconds.length > 0 ? (
            <div style={{ marginTop: 4 }}>
              {selectedEquipe.seconds.map(secondId => {
                const secondChar = getCharacterById(secondId);
                return secondChar ? (
                  <div key={secondId} style={{
                    padding: 8,
                    backgroundColor: 'var(--douceur)',
                    borderRadius: 'var(--rayon-bouton)',
                    border: '1px solid var(--trait)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4
                  }}>
                    <span>{secondChar.name}</span>
                    <button
                      onClick={() => onRemoveSecond(secondId)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#a13d3d',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--rayon-bouton)',
                        cursor: 'pointer',
                        fontSize: 11
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--encre-douce)', marginTop: 4 }}>
              Aucun second désigné
            </div>
          )}
        </div>
      </div>

      {/* Membres actuels */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', marginBottom: 12 }}>
          Membres ({selectedEquipe.members.length})
        </h4>
        {selectedEquipe.members.length === 0 ? (
          <p style={{ color: 'var(--encre-douce)', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>
            Aucun membre pour le moment
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
            {selectedEquipe.members.map(memberId => {
              const character = getCharacterById(memberId);
              const isLeader = selectedEquipe.leader === memberId;
              const isSecond = (selectedEquipe.seconds || []).includes(memberId);

              return character ? (
                <li
                  key={memberId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: isLeader || isSecond ? 'var(--douceur)' : 'var(--fond-carte)',
                    borderRadius: 'var(--rayon-bouton)',
                    marginBottom: 6,
                    border: isLeader ? '1px solid var(--or)' : isSecond ? '1px solid var(--coeur)' : '1px solid var(--trait)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {isLeader && (
                        <span style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: 'var(--rayon-pilule)',
                          backgroundColor: 'var(--or)',
                          color: 'var(--sur-or)'
                        }}>Leader</span>
                      )}
                      {isSecond && (
                        <span style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: 'var(--rayon-pilule)',
                          backgroundColor: 'var(--douceur)',
                          color: 'var(--coeur)'
                        }}>Second</span>
                      )}
                      <strong>{character.name}</strong>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>
                      {character.age} ans • {character.origin}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {!isLeader && (
                      <button
                        onClick={() => onSetLeader(memberId)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--or)',
                          color: 'var(--sur-or)',
                          border: 'none',
                          borderRadius: 'var(--rayon-bouton)',
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                        title="Définir comme leader"
                      >
                        Leader
                      </button>
                    )}
                    {!isSecond && !isLeader && (
                      <button
                        onClick={() => onSetSecond(memberId)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--coeur)',
                          color: 'var(--sur-coeur)',
                          border: 'none',
                          borderRadius: 'var(--rayon-bouton)',
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                        title="Définir comme second"
                      >
                        Second
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveMember(memberId)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#a13d3d',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--rayon-bouton)',
                        cursor: 'pointer',
                        fontSize: 11
                      }}
                      title="Retirer du groupe"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        )}
      </div>

      {/* Sous-branches */}
      <SubBranchManager
        selectedEquipe={selectedEquipe}
        showSubBranchForm={showSubBranchForm}
        setShowSubBranchForm={setShowSubBranchForm}
        subBranchData={subBranchData}
        setSubBranchData={setSubBranchData}
        onAddSubBranch={onAddSubBranch}
        onDeleteSubBranch={onDeleteSubBranch}
        onAddMemberToSubBranch={onAddMemberToSubBranch}
        onRemoveMemberFromSubBranch={onRemoveMemberFromSubBranch}
        getCharacterById={getCharacterById}
      />

      {/* Ajouter des membres */}
      <div>
        <h4 style={{ fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)', marginBottom: 12 }}>
          Ajouter un membre
        </h4>
        {availableCharacters.length === 0 ? (
          <p style={{ color: 'var(--encre-douce)', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>
            {characters.length === 0
              ? "Aucun personnage disponible. Créez d'abord des personnages dans la section Personnages."
              : "Tous les personnages sont déjà membres de cette équipe."}
          </p>
        ) : (
          <div style={{ marginTop: 8, maxHeight: 200, overflowY: 'auto' }}>
            {availableCharacters.map(character => (
              <button
                key={character.id}
                onClick={() => onAddMember(character.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 10,
                  marginBottom: 6,
                  backgroundColor: 'var(--douceur)',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-bouton)',
                  cursor: 'pointer',
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--coeur)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--trait)';
                }}
              >
                <strong>{character.name}</strong>
                <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>
                  {character.age} ans • {character.origin}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
