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
      border: `2px solid ${selectedEquipe.colors?.primary || '#2196f3'}`,
      padding: 20,
      borderRadius: 8,
      backgroundColor: '#ffffff',
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
        borderBottom: `2px solid ${selectedEquipe.colors?.primary || '#2196f3'}`
      }}>
        {selectedEquipe.emblem && (
          <img
            src={selectedEquipe.emblem}
            alt={selectedEquipe.name}
            style={{ width: 80, height: 80, objectFit: 'contain' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            color: selectedEquipe.colors?.primary || '#2196f3',
            fontSize: 24
          }}>
            {selectedEquipe.name}
          </h3>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
            {selectedEquipe.type}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <span style={{
            padding: '6px 12px',
            borderRadius: 16,
            backgroundColor: selectedEquipe.status === 'Active' ? '#28a745' : '#6c757d',
            color: 'white',
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
        <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', marginBottom: 12 }}>
          📋 Informations générales
        </h4>

        {selectedEquipe.founded && (
          <div style={{ marginBottom: 8, fontSize: 14 }}>
            <strong>📅 Fondation:</strong> {selectedEquipe.founded}
          </div>
        )}

        {selectedEquipe.headquarters && (
          <div style={{ marginBottom: 8, fontSize: 14 }}>
            <strong>🏛️ Quartier général:</strong> {selectedEquipe.headquarters}
          </div>
        )}

        {selectedEquipe.description && (
          <div style={{ marginBottom: 12 }}>
            <strong>📝 Description:</strong>
            <p style={{
              margin: '4px 0',
              fontStyle: 'italic',
              color: '#555',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {selectedEquipe.description}
            </p>
          </div>
        )}

        {selectedEquipe.objectives && (
          <div style={{ marginBottom: 12 }}>
            <strong>🎯 Objectifs:</strong>
            <p style={{
              margin: '4px 0',
              color: '#555',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {selectedEquipe.objectives}
            </p>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <strong>🎨 Couleurs:</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: selectedEquipe.colors?.primary || '#2196f3',
              borderRadius: 4,
              border: '1px solid #ddd'
            }} title="Couleur primaire" />
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: selectedEquipe.colors?.secondary || '#90caf9',
              borderRadius: 4,
              border: '1px solid #ddd'
            }} title="Couleur secondaire" />
          </div>
        </div>
      </div>

      {/* Moments marquants */}
      {selectedEquipe.keyMoments && (
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', marginBottom: 12 }}>
            ⭐ Moments marquants
          </h4>
          <div style={{
            padding: 12,
            backgroundColor: '#f0f4ff',
            borderRadius: 6,
            border: '1px solid #2196f3'
          }}>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: '#1565c0',
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
        <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', marginBottom: 12 }}>
          👑 Hiérarchie
        </h4>

        <div style={{ marginBottom: 12 }}>
          <strong>Leader:</strong>
          {selectedEquipe.leader ? (
            <div style={{
              marginTop: 4,
              padding: 8,
              backgroundColor: '#fff3cd',
              borderRadius: 4,
              border: '1px solid #ffc107',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>👑 {getCharacterById(selectedEquipe.leader)?.name}</span>
              <button
                onClick={() => onSetLeader(null)}
                style={{
                  padding: '2px 6px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: 3,
                  cursor: 'pointer',
                  fontSize: 11
                }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
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
                    backgroundColor: '#d1ecf1',
                    borderRadius: 4,
                    border: '1px solid #17a2b8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4
                  }}>
                    <span>🥈 {secondChar.name}</span>
                    <button
                      onClick={() => onRemoveSecond(secondId)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: 3,
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
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
              Aucun second désigné
            </div>
          )}
        </div>
      </div>

      {/* Membres actuels */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', marginBottom: 12 }}>
          👥 Membres ({selectedEquipe.members.length})
        </h4>
        {selectedEquipe.members.length === 0 ? (
          <p style={{ color: '#666', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>
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
                    backgroundColor: isLeader ? '#fff3cd' : isSecond ? '#d1ecf1' : '#f8f9fa',
                    borderRadius: 4,
                    marginBottom: 6,
                    border: isLeader ? '1px solid #ffc107' : isSecond ? '1px solid #17a2b8' : '1px solid #dee2e6'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {isLeader && <span title="Leader">👑</span>}
                      {isSecond && <span title="Second">🥈</span>}
                      <strong>{character.name}</strong>
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {character.age} ans • {character.origin}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {!isLeader && (
                      <button
                        onClick={() => onSetLeader(memberId)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#ffc107',
                          color: '#333',
                          border: 'none',
                          borderRadius: 3,
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                        title="Définir comme leader"
                      >
                        👑
                      </button>
                    )}
                    {!isSecond && !isLeader && (
                      <button
                        onClick={() => onSetSecond(memberId)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#17a2b8',
                          color: 'white',
                          border: 'none',
                          borderRadius: 3,
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                        title="Définir comme second"
                      >
                        🥈
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveMember(memberId)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: 3,
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
        <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', marginBottom: 12 }}>
          ➕ Ajouter un membre
        </h4>
        {availableCharacters.length === 0 ? (
          <p style={{ color: '#666', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>
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
                  backgroundColor: '#e7f3ff',
                  border: '1px solid #90caf9',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#bbdefb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#e7f3ff';
                }}
              >
                <strong>{character.name}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>
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
