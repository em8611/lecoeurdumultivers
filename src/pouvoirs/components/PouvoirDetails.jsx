import React from 'react';
import FichePouvoirButton from '../../components/common/FichePouvoirButton.jsx';

export default function PouvoirDetails({
  selectedPouvoir,
  getCategoryIcon,
  getLevelColor,
  characters,
  availableCharacters,
  getCharacterById,
  onAddUser,
  onRemoveUser
}) {
  return (
    <div style={{
      flex: 1,
      border: '1px solid #ddd',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#ffffff',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <span style={{ fontSize: 32 }}>{getCategoryIcon(selectedPouvoir.category)}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#2196f3' }}>
            {selectedPouvoir.name}
          </h3>
          <div style={{ fontSize: 14, color: '#666' }}>
            {selectedPouvoir.type} • {selectedPouvoir.category}
          </div>
        </div>
        <FichePouvoirButton pouvoir={selectedPouvoir} />
      </div>
      <div style={{ marginBottom: 15 }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: getLevelColor(selectedPouvoir.level)
        }}>
          Niveau: {selectedPouvoir.level}
        </span>
      </div>

      {selectedPouvoir.description && (
        <div style={{ marginBottom: 15 }}>
          <strong>Description:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.description}
          </p>
        </div>
      )}

      {selectedPouvoir.effects && (
        <div style={{ marginBottom: 15 }}>
          <strong>Effets:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.effects}
          </p>
        </div>
      )}

      {selectedPouvoir.cost && (
        <div style={{ marginBottom: 15 }}>
          <strong>Coût/Limitations:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.cost}
          </p>
        </div>
      )}

      {selectedPouvoir.requirements && (
        <div style={{ marginBottom: 15 }}>
          <strong>Prérequis:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.requirements}
          </p>
        </div>
      )}

      {(selectedPouvoir.range || selectedPouvoir.duration || selectedPouvoir.cooldown || selectedPouvoir.damage || selectedPouvoir.element || selectedPouvoir.rarity) && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2196f3' }}>📊 Caractéristiques</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 14 }}>
            {selectedPouvoir.range && (
              <div><strong>Portée:</strong> {selectedPouvoir.range}</div>
            )}
            {selectedPouvoir.duration && (
              <div><strong>Durée:</strong> {selectedPouvoir.duration}</div>
            )}
            {selectedPouvoir.cooldown && (
              <div><strong>Recharge:</strong> {selectedPouvoir.cooldown}</div>
            )}
            {selectedPouvoir.damage && (
              <div><strong>Puissance:</strong> {selectedPouvoir.damage}</div>
            )}
            {selectedPouvoir.element && (
              <div><strong>Élément:</strong> {selectedPouvoir.element}</div>
            )}
            {selectedPouvoir.rarity && (
              <div><strong>Rareté:</strong> <span style={{ color: '#6f42c1', fontWeight: 'bold' }}>{selectedPouvoir.rarity}</span></div>
            )}
          </div>
        </div>
      )}

      {selectedPouvoir.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong>🌍 Origine:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.origin}
          </p>
        </div>
      )}

      {selectedPouvoir.learningMethod && (
        <div style={{ marginBottom: 15 }}>
          <strong>📚 Méthode d'apprentissage:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.learningMethod}
          </p>
        </div>
      )}

      {(selectedPouvoir.visualEffect || selectedPouvoir.soundEffect) && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#fff3cd', borderRadius: 6 }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>🎨 Effets sensoriels</h4>
          {selectedPouvoir.visualEffect && (
            <div style={{ marginBottom: 6, fontSize: 14 }}>
              <strong>Visuel:</strong> {selectedPouvoir.visualEffect}
            </div>
          )}
          {selectedPouvoir.soundEffect && (
            <div style={{ fontSize: 14 }}>
              <strong>Sonore:</strong> {selectedPouvoir.soundEffect}
            </div>
          )}
        </div>
      )}

      {selectedPouvoir.evolution && (
        <div style={{ marginBottom: 15 }}>
          <strong>⬆️ Évolution:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.evolution}
          </p>
        </div>
      )}

      {selectedPouvoir.combinations && (
        <div style={{ marginBottom: 15 }}>
          <strong>🔗 Combinaisons possibles:</strong>
          <p style={{ margin: '4px 0', color: '#555' }}>
            {selectedPouvoir.combinations}
          </p>
        </div>
      )}

      {(selectedPouvoir.strengths || selectedPouvoir.weaknesses) && (
        <div style={{ marginBottom: 15 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {selectedPouvoir.strengths && (
              <div style={{ padding: 10, backgroundColor: '#d4edda', borderRadius: 6, border: '1px solid #28a745' }}>
                <strong style={{ color: '#155724' }}>✓ Points forts:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#155724' }}>
                  {selectedPouvoir.strengths}
                </p>
              </div>
            )}
            {selectedPouvoir.weaknesses && (
              <div style={{ padding: 10, backgroundColor: '#f8d7da', borderRadius: 6, border: '1px solid #dc3545' }}>
                <strong style={{ color: '#721c24' }}>✗ Points faibles:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#721c24' }}>
                  {selectedPouvoir.weaknesses}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedPouvoir.sideEffects && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#fff3cd', borderRadius: 6, border: '1px solid #ffc107' }}>
          <strong style={{ color: '#856404' }}>⚠️ Effets secondaires:</strong>
          <p style={{ margin: '4px 0', fontSize: 13, color: '#856404' }}>
            {selectedPouvoir.sideEffects}
          </p>
        </div>
      )}

      {selectedPouvoir.tags && selectedPouvoir.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>🏷️ Tags:</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(Array.isArray(selectedPouvoir.tags) ? selectedPouvoir.tags : selectedPouvoir.tags.split(',')).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                {typeof tag === 'string' ? tag.trim() : tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedPouvoir.usageMoments && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: '#f0f4ff', borderRadius: 6, border: '1px solid #2196f3' }}>
          <strong style={{ color: '#1565c0' }}>📖 Moments d'utilisation:</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#1565c0', whiteSpace: 'pre-wrap' }}>
            {selectedPouvoir.usageMoments}
          </p>
        </div>
      )}

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #dee2e6' }} />

      <div style={{ marginBottom: 20 }}>
        <strong>Utilisateurs ({selectedPouvoir.users.length}):</strong>
        {selectedPouvoir.users.length === 0 ? (
          <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>
            Aucun personnage ne possède ce pouvoir
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
            {selectedPouvoir.users.map(userId => {
              const character = getCharacterById(userId);
              return character ? (
                <li
                  key={userId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 8,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 4,
                    marginBottom: 6
                  }}
                >
                  <div>
                    <strong>{character.name}</strong>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {character.age} ans • {character.origin}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveUser(userId)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: 3,
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                    title="Retirer ce pouvoir"
                  >
                    Retirer
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        )}
      </div>

      <div>
        <strong>Attribuer à un personnage:</strong>
        {availableCharacters.length === 0 ? (
          <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>
            {characters.length === 0
              ? "Aucun personnage disponible. Créez d'abord des personnages."
              : "Tous les personnages possèdent déjà ce pouvoir."}
          </p>
        ) : (
          <div style={{ marginTop: 8 }}>
            {availableCharacters.map(character => (
              <button
                key={character.id}
                onClick={() => onAddUser(character.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 8,
                  marginBottom: 6,
                  backgroundColor: '#e7f3ff',
                  border: '1px solid #90caf9',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14
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
