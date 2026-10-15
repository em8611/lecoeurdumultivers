import React from 'react';

export default function SubBranchManager({
  selectedEquipe,
  showSubBranchForm,
  setShowSubBranchForm,
  subBranchData,
  setSubBranchData,
  onAddSubBranch,
  onDeleteSubBranch,
  onAddMemberToSubBranch,
  onRemoveMemberFromSubBranch,
  getCharacterById
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ color: selectedEquipe.colors?.primary || '#2196f3', margin: 0 }}>
          🌿 Sous-branches ({(selectedEquipe.subBranches || []).length})
        </h4>
        <button
          onClick={() => setShowSubBranchForm(!showSubBranchForm)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >
          {showSubBranchForm ? '✕ Annuler' : '+ Nouvelle sous-branche'}
        </button>
      </div>

      {showSubBranchForm && (
        <div style={{
          padding: 12,
          backgroundColor: '#e7f3ff',
          borderRadius: 6,
          border: '1px solid #17a2b8',
          marginBottom: 12
        }}>
          <form onSubmit={onAddSubBranch}>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold', fontSize: 13 }}>
                Nom de la sous-branche *
              </label>
              <input
                type="text"
                value={subBranchData.name}
                onChange={(e) => setSubBranchData({ ...subBranchData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ced4da',
                  fontSize: 14
                }}
                placeholder="Ex: Équipe Alpha, Branche Nord"
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '6px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 'bold'
              }}
            >
              ✓ Créer
            </button>
          </form>
        </div>
      )}

      {(selectedEquipe.subBranches || []).length === 0 ? (
        <p style={{ color: '#666', fontSize: 14, fontStyle: 'italic' }}>
          Aucune sous-branche créée
        </p>
      ) : (
        <div>
          {(selectedEquipe.subBranches || []).map(subBranch => (
            <div
              key={subBranch.id}
              style={{
                padding: 12,
                backgroundColor: '#f8f9fa',
                borderRadius: 6,
                border: '1px solid #dee2e6',
                marginBottom: 10
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ fontSize: 14, color: selectedEquipe.colors?.primary || '#2196f3' }}>
                  🌿 {subBranch.name}
                </strong>
                <button
                  onClick={() => onDeleteSubBranch(subBranch.id)}
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
                  ✕
                </button>
              </div>

              <div style={{ fontSize: 13, marginBottom: 8 }}>
                <strong>Membres ({subBranch.members.length}):</strong>
              </div>
              {subBranch.members.length === 0 ? (
                <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 8 }}>
                  Aucun membre
                </div>
              ) : (
                <div style={{ marginBottom: 8 }}>
                  {subBranch.members.map(memberId => {
                    const character = getCharacterById(memberId);
                    return character ? (
                      <div
                        key={memberId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 6,
                          backgroundColor: 'white',
                          borderRadius: 4,
                          marginBottom: 4,
                          fontSize: 12
                        }}
                      >
                        <span>{character.name}</span>
                        <button
                          onClick={() => onRemoveMemberFromSubBranch(subBranch.id, memberId)}
                          style={{
                            padding: '2px 6px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: 3,
                            cursor: 'pointer',
                            fontSize: 10
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <details style={{ fontSize: 12 }}>
                <summary style={{ cursor: 'pointer', color: selectedEquipe.colors?.primary || '#2196f3', fontWeight: 'bold' }}>
                  ➕ Ajouter un membre
                </summary>
                <div style={{ marginTop: 6, maxHeight: 150, overflowY: 'auto' }}>
                  {selectedEquipe.members
                    .filter(memberId => !subBranch.members.includes(memberId))
                    .map(memberId => {
                      const character = getCharacterById(memberId);
                      return character ? (
                        <button
                          key={memberId}
                          onClick={() => onAddMemberToSubBranch(subBranch.id, memberId)}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: 6,
                            marginBottom: 4,
                            backgroundColor: 'white',
                            border: '1px solid #dee2e6',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 12
                          }}
                        >
                          {character.name}
                        </button>
                      ) : null;
                    })}
                  {selectedEquipe.members.filter(memberId => !subBranch.members.includes(memberId)).length === 0 && (
                    <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic', padding: 4 }}>
                      Tous les membres sont déjà dans cette sous-branche
                    </div>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
