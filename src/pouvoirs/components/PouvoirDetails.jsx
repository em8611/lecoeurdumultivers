import React from 'react';
import FichePouvoirButton from '../../components/common/FichePouvoirButton.jsx';

export default function PouvoirDetails({
  selectedPouvoir,
  characters,
  availableCharacters,
  getCharacterById,
  onAddUser,
  onRemoveUser
}) {
  return (
    <div style={{
      flex: 1,
      border: '1px solid var(--trait)',
      padding: 16,
      borderRadius: 'var(--rayon-carte)',
      backgroundColor: 'var(--fond-carte)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--police-affichage)', fontWeight: 600, color: 'var(--coeur)' }}>
            {selectedPouvoir.name}
          </h3>
          <div style={{ fontSize: 14, color: 'var(--encre-douce)' }}>
            {selectedPouvoir.type} • {selectedPouvoir.category}
          </div>
        </div>
        <FichePouvoirButton pouvoir={selectedPouvoir} />
      </div>
      <div style={{ marginBottom: 15 }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 10px',
          backgroundColor: 'var(--douceur)',
          color: 'var(--encre)',
          borderRadius: 'var(--rayon-pilule)',
          fontSize: 12,
          fontWeight: 'bold'
        }}>
          Niveau: {selectedPouvoir.level}
        </span>
      </div>

      {selectedPouvoir.description && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Description:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.description}
          </p>
        </div>
      )}

      {selectedPouvoir.effects && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Effets:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.effects}
          </p>
        </div>
      )}

      {selectedPouvoir.cost && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Coût/Limitations:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.cost}
          </p>
        </div>
      )}

      {selectedPouvoir.requirements && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Prérequis:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.requirements}
          </p>
        </div>
      )}

      {(selectedPouvoir.range || selectedPouvoir.duration || selectedPouvoir.cooldown || selectedPouvoir.damage || selectedPouvoir.element || selectedPouvoir.rarity) && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--coeur)' }}>Caractéristiques</h4>
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
              <div><strong>Rareté:</strong> <span style={{ color: 'var(--coeur)', fontWeight: 'bold' }}>{selectedPouvoir.rarity}</span></div>
            )}
          </div>
        </div>
      )}

      {selectedPouvoir.origin && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Origine:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.origin}
          </p>
        </div>
      )}

      {selectedPouvoir.learningMethod && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Méthode d'apprentissage:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.learningMethod}
          </p>
        </div>
      )}

      {(selectedPouvoir.visualEffect || selectedPouvoir.soundEffect) && (
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--coeur)' }}>Effets sensoriels</h4>
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
          <strong style={{ color: 'var(--encre)' }}>Évolution:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.evolution}
          </p>
        </div>
      )}

      {selectedPouvoir.combinations && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Combinaisons possibles:</strong>
          <p style={{ margin: '4px 0', color: 'var(--encre)' }}>
            {selectedPouvoir.combinations}
          </p>
        </div>
      )}

      {(selectedPouvoir.strengths || selectedPouvoir.weaknesses) && (
        <div style={{ marginBottom: 15 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {selectedPouvoir.strengths && (
              <div style={{ padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
                <strong style={{ color: 'var(--coeur)' }}>Points forts:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'var(--encre)' }}>
                  {selectedPouvoir.strengths}
                </p>
              </div>
            )}
            {selectedPouvoir.weaknesses && (
              <div style={{ padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--or)' }}>
                <strong style={{ color: 'var(--coeur)' }}>Points faibles:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'var(--encre)' }}>
                  {selectedPouvoir.weaknesses}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedPouvoir.sideEffects && (
        <div style={{ marginBottom: 15, padding: 10, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', borderLeft: '3px solid var(--or)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Effets secondaires:</strong>
          <p style={{ margin: '4px 0', fontSize: 13, color: 'var(--encre)' }}>
            {selectedPouvoir.sideEffects}
          </p>
        </div>
      )}

      {selectedPouvoir.tags && selectedPouvoir.tags.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong style={{ color: 'var(--encre)' }}>Tags:</strong>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(Array.isArray(selectedPouvoir.tags) ? selectedPouvoir.tags : selectedPouvoir.tags.split(',')).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'var(--or)',
                  color: 'var(--sur-or)',
                  borderRadius: 'var(--rayon-pilule)',
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
        <div style={{ marginBottom: 15, padding: 12, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)' }}>
          <strong style={{ color: 'var(--coeur)' }}>Moments d'utilisation:</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--encre)', whiteSpace: 'pre-wrap' }}>
            {selectedPouvoir.usageMoments}
          </p>
        </div>
      )}

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--trait)' }} />

      <div style={{ marginBottom: 20 }}>
        <strong style={{ color: 'var(--encre)' }}>Utilisateurs ({selectedPouvoir.users.length}):</strong>
        {selectedPouvoir.users.length === 0 ? (
          <p style={{ color: 'var(--encre-douce)', fontSize: 14, marginTop: 8 }}>
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
                    backgroundColor: 'var(--douceur)',
                    borderRadius: 'var(--rayon-bouton)',
                    marginBottom: 6
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--encre)' }}>{character.name}</strong>
                    <div style={{ fontSize: 12, color: 'var(--encre-douce)' }}>
                      {character.age} ans • {character.origin}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveUser(userId)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#a13d3d',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--rayon-bouton)',
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
        <strong style={{ color: 'var(--encre)' }}>Attribuer à un personnage:</strong>
        {availableCharacters.length === 0 ? (
          <p style={{ color: 'var(--encre-douce)', fontSize: 14, marginTop: 8 }}>
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
                  backgroundColor: 'var(--douceur)',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--rayon-bouton)',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: 'var(--encre)'
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
