import React from 'react';
import { getTypeColor, getIntensityColor, getIntensityLabel, isFamilialType, isProfessionalType, isFriendlyType, isAdmirationType, isObsessionType } from './RelationTypes.js';
import { FicheRelationButton } from '../components/common';

export default function RelationDetailsPanel({ relation, characterById, onClose }) {
  if (!relation) return null;

  // Compatibilité avec les anciennes relations
  const fromId = relation.fromId || relation.characterAId;
  const toId = relation.toId || relation.characterBId;
  const fromChar = characterById(fromId);
  const toChar = characterById(toId);

  return (
    <div style={{
      flex: 1,
      border: '1px solid #ddd',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#fff',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ marginTop: 0, color: '#2196f3' }}>Détails de la relation</h3>
        <FicheRelationButton
          relation={{
            ...relation,
            fromId,
            toId,
            fromName: fromChar?.name || `ID: ${fromId}`,
            toName: toChar?.name || `ID: ${toId}`
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          padding: '4px 12px',
          backgroundColor: getTypeColor(relation.type),
          color: 'white',
          borderRadius: 12,
          fontWeight: 'bold',
          fontSize: 13
        }}>
          {relation.type}
        </span>
        <span style={{
          padding: '2px 8px',
          backgroundColor: getIntensityColor(relation.intensity),
          color: 'white',
          borderRadius: 8,
          fontSize: 12
        }}>
          {getIntensityLabel(relation.intensity)}
        </span>
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>De:</strong> {fromChar?.name || `ID: ${fromId}`}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Vers:</strong> {toChar?.name || `ID: ${toId}`}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Direction:</strong> {relation.direction}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Statut:</strong> {relation.status}
      </div>

      {relation.since && (
        <div style={{ marginBottom: 10 }}>
          <strong>Depuis:</strong> {new Date(relation.since).toLocaleDateString('fr-FR')}
        </div>
      )}

      {/* Champs conditionnels - Idole */}
      {relation.type === 'Idole' && (
        <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#fffbea', border: '1px solid #f3d27a', borderRadius: 10 }}>
          {relation.idolPublicPersona && (
            <div style={{ marginBottom: 10 }}>
              <strong>Personna publique:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.idolPublicPersona}</p>
            </div>
          )}
          {relation.idolRealPersona && (
            <div style={{ marginBottom: 10 }}>
              <strong>Personna réelle:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.idolRealPersona}</p>
            </div>
          )}
          {relation.idolDistanceLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Distance perçue:</strong> {relation.idolDistanceLevel}/5
            </div>
          )}
          {relation.idolInfluenceAreas && (
            <div style={{ marginBottom: 10 }}>
              <strong>Zones d'influence:</strong> {relation.idolInfluenceAreas}
            </div>
          )}
          {relation.idolAccessFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fréquence d'accès:</strong> {relation.idolAccessFrequency}
            </div>
          )}
          {relation.idolFanPerception && (
            <div style={{ marginBottom: 10 }}>
              <strong>Perception des admirateurs:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.idolFanPerception}</p>
            </div>
          )}
          {relation.idolContradictions && (
            <div style={{ marginBottom: 10 }}>
              <strong>Contradictions:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.idolContradictions}</p>
            </div>
          )}
          {relation.idolBoundaries && (
            <div style={{ marginBottom: 10 }}>
              <strong>Limites:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.idolBoundaries}</p>
            </div>
          )}
        </div>
      )}

      {/* Champs conditionnels - Fanatique */}
      {relation.type === 'Fanatique' && (
        <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#fff5fb', border: '1px solid #f3a0c2', borderRadius: 10 }}>
          {relation.fanaticDevotionLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau de dévotion:</strong> {relation.fanaticDevotionLevel}/5
            </div>
          )}
          {relation.fanaticBeliefSystem && (
            <div style={{ marginBottom: 10 }}>
              <strong>Système de croyances:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.fanaticBeliefSystem}</p>
            </div>
          )}
          {relation.fanaticMotivations && (
            <div style={{ marginBottom: 10 }}>
              <strong>Motivations:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.fanaticMotivations}</p>
            </div>
          )}
          {relation.fanaticBehaviorPatterns && (
            <div style={{ marginBottom: 10 }}>
              <strong>Schémas comportementaux:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.fanaticBehaviorPatterns}</p>
            </div>
          )}
          {relation.fanaticRisks && (
            <div style={{ marginBottom: 10 }}>
              <strong>Risques:</strong> {relation.fanaticRisks}
            </div>
          )}
          {relation.fanaticControlMethods && (
            <div style={{ marginBottom: 10 }}>
              <strong>Méthodes de contrôle:</strong> {relation.fanaticControlMethods}
            </div>
          )}
          {relation.fanaticTriggerPoints && (
            <div style={{ marginBottom: 10 }}>
              <strong>Points de déclenchement:</strong> {relation.fanaticTriggerPoints}
            </div>
          )}
          {relation.fanaticEscalationSigns && (
            <div style={{ marginBottom: 10 }}>
              <strong>Signes d'escalade:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.fanaticEscalationSigns}</p>
            </div>
          )}
        </div>
      )}
      {/* Champ Description supprimé */}
      {/* Historique (ordre défini par position) */}
      {Array.isArray(relation.history) && relation.history.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <strong>Historique:</strong>
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {relation.history
              .slice()
              .sort((a,b)=> (a.position ?? 0) - (b.position ?? 0))
              .map((h,i) => (
              <div key={h.id} style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ minWidth: 20, textAlign: 'center', fontSize: 11, color: '#555', fontWeight: 'bold' }}>{h.position ?? (i+1)}</span>
                {h.historyType && (
                  <span style={{ padding: '2px 8px', backgroundColor: getTypeColor(h.historyType), color: '#fff', borderRadius: 12, fontSize: 11 }}>
                    {h.historyType}
                  </span>
                )}
                {h.historyStatus && (
                  <span style={{ padding: '2px 8px', backgroundColor: '#343a40', color: '#fff', borderRadius: 12, fontSize: 11 }}>
                    {h.historyStatus}
                  </span>
                )}
                <div style={{ fontSize: 13 }}>{h.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Champs conditionnels - Relations familiales enrichies */}
      {isFamilialType(relation.type) && (
        <>
          {relation.biologicalLink && (
            <div style={{ marginBottom: 10 }}>
              <strong>Nature du lien:</strong> {relation.biologicalLink}
            </div>
          )}
          {relation.familyBranch && (
            <div style={{ marginBottom: 10 }}>
              <strong>Branche familiale:</strong> {relation.familyBranch}
            </div>
          )}
          {relation.familyStatus && (
            <div style={{ marginBottom: 10 }}>
              <strong>Statut familial:</strong> {relation.familyStatus}
            </div>
          )}
          {relation.cohabitation && (
            <div style={{ marginBottom: 10 }}>
              <strong>Co-habitation:</strong> {relation.cohabitation}
            </div>
          )}
          {relation.type === 'Enfant' && relation.isLegalGuardian && (
            <div style={{ marginBottom: 10 }}>
              <strong>Tuteur légal:</strong> {relation.isLegalGuardian}
            </div>
          )}
          {relation.type === 'Enfant' && relation.custody && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type de garde:</strong> {relation.custody}
            </div>
          )}
          {relation.biologicalLink === 'Adoptif' && relation.adoptionDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Date d'adoption:</strong> {new Date(relation.adoptionDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.surnameUsed && (
            <div style={{ marginBottom: 10 }}>
              <strong>Surnom utilisé:</strong> {relation.surnameUsed}
            </div>
          )}
          {relation.emotionalCloseness && (
            <div style={{ marginBottom: 10 }}>
              <strong>Proximité émotionnelle:</strong> {relation.emotionalCloseness}/5 - {['Distant', 'Tendu', 'Modéré', 'Proche', 'Fusionnel'][relation.emotionalCloseness - 1]}
            </div>
          )}
          {relation.familyNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Notes familiales:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.familyNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Relations professionnelles enrichies */}
      {isProfessionalType(relation.type) && (
        <>
          {relation.hierarchy && (
            <div style={{ marginBottom: 10 }}>
              <strong>Hiérarchie:</strong> {relation.hierarchy}
            </div>
          )}
          {relation.collaboration && (
            <div style={{ marginBottom: 10 }}>
              <strong>Collaboration:</strong> {relation.collaboration}
            </div>
          )}
          {relation.organization && (
            <div style={{ marginBottom: 10 }}>
              <strong>Organisation:</strong> {relation.organization}
            </div>
          )}
          {relation.role && (
            <div style={{ marginBottom: 10 }}>
              <strong>Rôle:</strong> {relation.role}
            </div>
          )}
          {relation.contractType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Contrat:</strong> {relation.contractType}
            </div>
          )}
          {relation.confidentialityLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Confidentialité:</strong> {relation.confidentialityLevel}
            </div>
          )}
          {relation.evaluationFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Évaluations:</strong> {relation.evaluationFrequency}
            </div>
          )}
          {(relation.type === 'Collègue' || relation.type === 'Directeur') && relation.department && (
            <div style={{ marginBottom: 10 }}>
              <strong>Département:</strong> {relation.department}
            </div>
          )}
          {relation.type === 'Collègue' && relation.project && (
            <div style={{ marginBottom: 10 }}>
              <strong>Projet:</strong> {relation.project}
            </div>
          )}
          {relation.type === 'Mentor' && relation.mentorshipFocus && (
            <div style={{ marginBottom: 10 }}>
              <strong>Focus mentorat:</strong> {relation.mentorshipFocus}
            </div>
          )}
          {relation.type === 'Mentor' && relation.mentorDuration && (
            <div style={{ marginBottom: 10 }}>
              <strong>Durée:</strong> {relation.mentorDuration}
            </div>
          )}
          {relation.type === 'Protégé·e' && relation.developmentGoals && (
            <div style={{ marginBottom: 10 }}>
              <strong>Objectifs:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.developmentGoals}</p>
            </div>
          )}
          {relation.professionalEndDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fin prévue:</strong> {new Date(relation.professionalEndDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.performanceNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Notes:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.performanceNotes}</p>
            </div>
          )}
          {(relation.type === 'Professeur' || relation.type === 'Formateur') && relation.teachingSubject && (
            <div style={{ marginBottom: 10 }}>
              <strong>Matière enseignée:</strong> {relation.teachingSubject}
            </div>
          )}
          {(relation.type === 'Professeur' || relation.type === 'Formateur') && relation.teachingStyle && (
            <div style={{ marginBottom: 10 }}>
              <strong>Style pédagogique:</strong> {relation.teachingStyle}
            </div>
          )}
          {(relation.type === 'Élève' || relation.type === 'Étudiant' || relation.type === 'Apprenti') && relation.learningStyle && (
            <div style={{ marginBottom: 10 }}>
              <strong>Style d’apprentissage:</strong> {relation.learningStyle}
            </div>
          )}
          {(relation.type === 'Élève' || relation.type === 'Étudiant' || relation.type === 'Apprenti') && relation.learningProgress && (
            <div style={{ marginBottom: 10 }}>
              <strong>Progression:</strong> {relation.learningProgress}
            </div>
          )}
          {(relation.type === 'Élève' || relation.type === 'Étudiant') && relation.academicPerformance && (
            <div style={{ marginBottom: 10 }}>
              <strong>Performance académique:</strong> {relation.academicPerformance}
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Compagnon */}
      {relation.type === 'Compagnon' && (
        <>
          {relation.companionType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type:</strong> {relation.companionType}
            </div>
          )}
          {relation.companionSpecies && (
            <div style={{ marginBottom: 10 }}>
              <strong>Espèce/Modèle:</strong> {relation.companionSpecies}
            </div>
          )}
          {relation.companionOrigin && (
            <div style={{ marginBottom: 10 }}>
              <strong>Origine:</strong> {relation.companionOrigin}
            </div>
          )}
          {relation.companionAbilities && (
            <div style={{ marginBottom: 10 }}>
              <strong>Capacités:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.companionAbilities}</p>
            </div>
          )}
          {relation.companionNeeds && (
            <div style={{ marginBottom: 10 }}>
              <strong>Besoins:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.companionNeeds}</p>
            </div>
          )}
          {relation.bondLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Lien affectif:</strong> {relation.bondLevel}/5 - {['Faible', 'Naissant', 'Solide', 'Fort', 'Fusionnel'][relation.bondLevel - 1]}
            </div>
          )}
          {relation.autonomyLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Autonomie:</strong> {relation.autonomyLevel}/5 - {['Totalement dépendant', 'Dépendant', 'Semi-autonome', 'Autonome', 'Indépendant'][relation.autonomyLevel - 1]}
            </div>
          )}
          {relation.trainingLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Entraînement:</strong> {relation.trainingLevel}/5 - {['Non entraîné', 'Début', 'Basique', 'Avancé', 'Expert'][relation.trainingLevel - 1]}
            </div>
          )}
          {relation.careResponsibility && (
            <div style={{ marginBottom: 10 }}>
              <strong>Responsable des soins:</strong> {relation.careResponsibility}
            </div>
          )}
          {relation.travelTogether && (
            <div style={{ marginBottom: 10 }}>
              <strong>Voyagent ensemble:</strong> {relation.travelTogether}
            </div>
          )}
          {relation.firstEncounterDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Première rencontre:</strong> {new Date(relation.firstEncounterDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.favoriteActivities && (
            <div style={{ marginBottom: 10 }}>
              <strong>Activités favorites:</strong> {relation.favoriteActivities}
            </div>
          )}
          {relation.expectedLifespan && (
            <div style={{ marginBottom: 10 }}>
              <strong>Durée de vie estimée:</strong> {relation.expectedLifespan}
            </div>
          )}
          {relation.healthNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Santé / Risques:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.healthNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Créateur/Propriétaire */}
      {(relation.type === 'Créateur' || relation.type === 'Propriétaire') && relation.creationDate && (
        <div style={{ marginBottom: 10 }}>
          <strong>Date de création:</strong> {new Date(relation.creationDate).toLocaleDateString('fr-FR')}
        </div>
      )}

      {(relation.type === 'Créateur' || relation.type === 'Propriétaire') && relation.ownership && (
        <div style={{ marginBottom: 10 }}>
          <strong>Type de {relation.type === 'Créateur' ? 'création' : 'propriété'}:</strong> {relation.ownership}
        </div>
      )}
        {/* Champs avancés Créateur / Propriétaire */}
        {relation.type === 'Créateur' && (
          <div style={{ marginBottom: 18, padding: 14, background:'#f8f5ff', border:'1px solid #e2d9fb', borderRadius:10 }}>
            {relation.creationPurpose && (
              <div style={{ marginBottom:10 }}>
                <strong>But / Finalité:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.creationPurpose}</p>
              </div>
            )}
            {relation.creationProcess && (
              <div style={{ marginBottom:10 }}>
                <strong>Processus:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.creationProcess}</p>
              </div>
            )}
            {relation.creationMaterials && (
              <div style={{ marginBottom:10 }}>
                <strong>Matériaux / Composants:</strong> {relation.creationMaterials}
              </div>
            )}
            {relation.creationConstraints && (
              <div style={{ marginBottom:10 }}>
                <strong>Contraintes:</strong> {relation.creationConstraints}
              </div>
            )}
            {relation.creationRisks && (
              <div style={{ marginBottom:10 }}>
                <strong>Risques:</strong> {relation.creationRisks}
              </div>
            )}
            {relation.creationEthics && (
              <div style={{ marginBottom:10 }}>
                <strong>Considérations éthiques:</strong> {relation.creationEthics}
              </div>
            )}
            {relation.creationSafeguards && (
              <div style={{ marginBottom:10 }}>
                <strong>Sécurités / Verrous:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.creationSafeguards}</p>
              </div>
            )}
            {relation.creationUpgradePotential && (
              <div style={{ marginBottom:10 }}>
                <strong>Potentiel d'amélioration:</strong> {relation.creationUpgradePotential}
              </div>
            )}
            {relation.creationOrigin && (
              <div style={{ marginBottom:10 }}>
                <strong>Origine / Inspiration:</strong> {relation.creationOrigin}
              </div>
            )}
          </div>
        )}
        {relation.type === 'Propriétaire' && (
          <div style={{ marginBottom: 18, padding: 14, background:'#f8f5ff', border:'1px solid #e2d9fb', borderRadius:10 }}>
            {relation.ownershipAcquisitionMethod && (
              <div style={{ marginBottom:10 }}>
                <strong>Méthode d'acquisition:</strong> {relation.ownershipAcquisitionMethod}
              </div>
            )}
            {relation.ownershipDate && (
              <div style={{ marginBottom:10 }}>
                <strong>Date d'acquisition:</strong> {new Date(relation.ownershipDate).toLocaleDateString('fr-FR')}
              </div>
            )}
            {relation.ownershipRightsScope && (
              <div style={{ marginBottom:10 }}>
                <strong>Étendue des droits:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.ownershipRightsScope}</p>
              </div>
            )}
            {relation.ownershipRestrictions && (
              <div style={{ marginBottom:10 }}>
                <strong>Restrictions:</strong> {relation.ownershipRestrictions}
              </div>
            )}
            {relation.ownershipControlLevel && (
              <div style={{ marginBottom:10 }}>
                <strong>Niveau de contrôle:</strong> {relation.ownershipControlLevel}/5
              </div>
            )}
            {relation.ownershipMaintenanceResponsibility && (
              <div style={{ marginBottom:10 }}>
                <strong>Maintenance / Responsable:</strong> {relation.ownershipMaintenanceResponsibility}
              </div>
            )}
            {relation.ownershipTransferHistory && (
              <div style={{ marginBottom:10 }}>
                <strong>Historique transferts:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.ownershipTransferHistory}</p>
              </div>
            )}
            {relation.ownershipLiability && (
              <div style={{ marginBottom:10 }}>
                <strong>Responsabilités / Passifs:</strong> {relation.ownershipLiability}
              </div>
            )}
            {relation.ownershipSuccessionPlan && (
              <div style={{ marginBottom:10 }}>
                <strong>Plan de succession:</strong> {relation.ownershipSuccessionPlan}
              </div>
            )}
            {relation.ownershipNotes && (
              <div style={{ marginBottom:10 }}>
                <strong>Notes propriété:</strong>
                <p style={{ margin:'6px 0', color:'#555', whiteSpace:'pre-wrap' }}>{relation.ownershipNotes}</p>
              </div>
            )}
          </div>
        )}

      {/* Champs conditionnels - Spécial */}
      {relation.type === 'Spécial' && (
        <>
          {relation.specialType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type de lien spécial:</strong> {relation.specialType}
            </div>
          )}
          {relation.specialOrigin && (
            <div style={{ marginBottom: 10 }}>
              <strong>Origine:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.specialOrigin}</p>
            </div>
          )}
          {relation.specialConnectionLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau de connexion:</strong> {relation.specialConnectionLevel}/5 - {['Superficielle', 'Légère', 'Moyenne', 'Profonde', 'Fusionnelle'][relation.specialConnectionLevel - 1]}
            </div>
          )}
          {relation.specialPowers && (
            <div style={{ marginBottom: 10 }}>
              <strong>Pouvoirs/Capacités:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.specialPowers}</p>
            </div>
          )}
          {relation.specialSymbol && (
            <div style={{ marginBottom: 10 }}>
              <strong>Symbole/Artefact:</strong> {relation.specialSymbol}
            </div>
          )}
          {relation.specialConditions && (
            <div style={{ marginBottom: 10 }}>
              <strong>Conditions:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.specialConditions}</p>
            </div>
          )}
          {relation.specialConsequences && (
            <div style={{ marginBottom: 10 }}>
              <strong>Conséquences:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.specialConsequences}</p>
            </div>
          )}
          {relation.specialNature && (
            <div style={{ marginBottom: 10 }}>
              <strong>Description:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.specialNature}</p>
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Amical */}
      {/* Champs conditionnels - Allié·e */}
      {relation.type === 'Allié·e' && (
        <>
          {relation.allianceScope && (
            <div style={{ marginBottom: 10 }}>
              <strong>Portée:</strong> {relation.allianceScope}
            </div>
          )}
          {relation.allianceMotivation && (
            <div style={{ marginBottom: 10 }}>
              <strong>Motivation:</strong> {relation.allianceMotivation}
            </div>
          )}
          {relation.resourceSharing && (
            <div style={{ marginBottom: 10 }}>
              <strong>Partage de ressources:</strong> {relation.resourceSharing}
            </div>
          )}
          {relation.riskTolerance && (
            <div style={{ marginBottom: 10 }}>
              <strong>Tolérance au risque:</strong> {relation.riskTolerance}
            </div>
          )}
          {relation.allianceTrustLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Confiance:</strong> {relation.allianceTrustLevel}/5 - {['Fragile', 'Prudent', 'Solide', 'Élevé', 'Total'][relation.allianceTrustLevel - 1]}
            </div>
          )}
          {relation.coordinationFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Coordination:</strong> {relation.coordinationFrequency}
            </div>
          )}
          {relation.secrecyLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau de secret:</strong> {relation.secrecyLevel}
            </div>
          )}
          {relation.supportTypes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Soutien:</strong> {relation.supportTypes}
            </div>
          )}
          {relation.allianceTerms && (
            <div style={{ marginBottom: 10 }}>
              <strong>Termes:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.allianceTerms}</p>
            </div>
          )}
          {relation.pactName && (
            <div style={{ marginBottom: 10 }}>
              <strong>Pacte:</strong> {relation.pactName}
            </div>
          )}
          {relation.pactSymbol && (
            <div style={{ marginBottom: 10 }}>
              <strong>Symbole:</strong> {relation.pactSymbol}
            </div>
          )}
          {relation.allianceStartDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Début:</strong> {new Date(relation.allianceStartDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.allianceEndDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fin:</strong> {new Date(relation.allianceEndDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.allianceNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Notes:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.allianceNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Amour */}
      {relation.type === 'Amour' && (
        <>
          {relation.romanticStatus && (
            <div style={{ marginBottom: 10 }}>
              <strong>Statut:</strong> {relation.romanticStatus}
            </div>
          )}
          {relation.commitmentLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Engagement:</strong> {relation.commitmentLevel}/5 - {['Naissant', 'Tendre', 'Équilibré', 'Fort', 'Total'][relation.commitmentLevel - 1]}
            </div>
          )}
          {relation.jealousyLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Jalousie:</strong> {relation.jealousyLevel}/5 - {['Aucune', 'Légère', 'Modérée', 'Forte', 'Toxique'][relation.jealousyLevel - 1]}
            </div>
          )}
          {relation.cohabitationStatus && (
            <div style={{ marginBottom: 10 }}>
              <strong>Co-habitation:</strong> {relation.cohabitationStatus}
            </div>
          )}
          {relation.loveLanguages && (
            <div style={{ marginBottom: 10 }}>
              <strong>Langages:</strong> {relation.loveLanguages}
            </div>
          )}
          {relation.secretRelationship && (
            <div style={{ marginBottom: 10 }}>
              <strong>Secret:</strong> {relation.secretRelationship}
            </div>
          )}
          {relation.familyApproval && (
            <div style={{ marginBottom: 10 }}>
              <strong>Approbation familiale:</strong> {relation.familyApproval}
            </div>
          )}
          {relation.anniversaryDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Anniversaire:</strong> {new Date(relation.anniversaryDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.firstMeetingStory && (
            <div style={{ marginBottom: 10 }}>
              <strong>Rencontre:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.firstMeetingStory}</p>
            </div>
          )}
          {relation.sharedRituals && (
            <div style={{ marginBottom: 10 }}>
              <strong>Rituels:</strong> {relation.sharedRituals}
            </div>
          )}
          {relation.dealBreakers && (
            <div style={{ marginBottom: 10 }}>
              <strong>Lignes rouges:</strong> {relation.dealBreakers}
            </div>
          )}
          {relation.intimacyNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Intimité:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.intimacyNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Rivalité */}
      {relation.type === 'Rivalité' && (
        <>
          {relation.competitionType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Compétition:</strong> {relation.competitionType}
            </div>
          )}
          {relation.rivalryOrigin && (
            <div style={{ marginBottom: 10 }}>
              <strong>Origine:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.rivalryOrigin}</p>
            </div>
          )}
          {relation.escalationLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Escalade:</strong> {relation.escalationLevel}/5 - {['Latente', 'Mineure', 'Active', 'Intense', 'Critique'][relation.escalationLevel - 1]}
            </div>
          )}
          {relation.respectLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Respect:</strong> {relation.respectLevel}/5 - {['Aucun', 'Faible', 'Mitigé', 'Présent', 'Elevé'][relation.respectLevel - 1]}
            </div>
          )}
          {relation.fairnessLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fair-play:</strong> {relation.fairnessLevel}
            </div>
          )}
          {relation.currentScore && (
            <div style={{ marginBottom: 10 }}>
              <strong>Score actuel:</strong> {relation.currentScore}
            </div>
          )}
          {relation.truceStatus && (
            <div style={{ marginBottom: 10 }}>
              <strong>Trêve:</strong> {relation.truceStatus}
            </div>
          )}
          {relation.sabotageNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Sabotage:</strong> {relation.sabotageNotes}
            </div>
          )}
          {relation.publicPerception && (
            <div style={{ marginBottom: 10 }}>
              <strong>Perception publique:</strong> {relation.publicPerception}
            </div>
          )}
          {relation.alliesInvolved && (
            <div style={{ marginBottom: 10 }}>
              <strong>Alliés impliqués:</strong> {relation.alliesInvolved}
            </div>
          )}
          {relation.nextConfrontationDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Prochaine confrontation:</strong> {new Date(relation.nextConfrontationDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.notableClashes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Affrontements notables:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.notableClashes}</p>
            </div>
          )}
          {relation.rulesOfEngagement && (
            <div style={{ marginBottom: 10 }}>
              <strong>Règles:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.rulesOfEngagement}</p>
            </div>
          )}
          {relation.stakes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Enjeux:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.stakes}</p>
            </div>
          )}
        </>
      )}
      {/* Champs conditionnels - Antagoniste */}
      {relation.type === 'Antagoniste' && (
        <>
          {relation.antagonismType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type d'antagonisme:</strong> {relation.antagonismType}
            </div>
          )}
          {relation.intentLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Intention:</strong> {relation.intentLevel}
            </div>
          )}
          {relation.threatLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau de menace:</strong> {relation.threatLevel}/5 - {['Minime', 'Faible', 'Modérée', 'Élevée', 'Extrême'][relation.threatLevel - 1]}
            </div>
          )}
          {relation.enmityOrigin && (
            <div style={{ marginBottom: 10 }}>
              <strong>Origine de l'inimitié:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.enmityOrigin}</p>
            </div>
          )}
          {relation.methods && (
            <div style={{ marginBottom: 10 }}>
              <strong>Méthodes:</strong> {relation.methods}
            </div>
          )}
          {relation.resources && (
            <div style={{ marginBottom: 10 }}>
              <strong>Ressources:</strong> {relation.resources}
            </div>
          )}
          {relation.territory && (
            <div style={{ marginBottom: 10 }}>
              <strong>Territoire/Influence:</strong> {relation.territory}
            </div>
          )}
          {relation.lastEncounterDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Dernière confrontation:</strong> {new Date(relation.lastEncounterDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.nextMove && (
            <div style={{ marginBottom: 10 }}>
              <strong>Prochain coup:</strong> {relation.nextMove}
            </div>
          )}
          {relation.weakPoints && (
            <div style={{ marginBottom: 10 }}>
              <strong>Points faibles:</strong> {relation.weakPoints}
            </div>
          )}
          {relation.moralLimits && (
            <div style={{ marginBottom: 10 }}>
              <strong>Limites morales:</strong> {relation.moralLimits}
            </div>
          )}
          {relation.publicThreatLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Menace publique:</strong> {relation.publicThreatLevel}
            </div>
          )}
          {relation.psychologicalWarfare && (
            <div style={{ marginBottom: 10 }}>
              <strong>Guerre psychologique:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.psychologicalWarfare}</p>
            </div>
          )}
          {relation.leverage && (
            <div style={{ marginBottom: 10 }}>
              <strong>Levier:</strong> {relation.leverage}
            </div>
          )}
        </>
      )}

      {/* Champs conditionnels - Neutre */}
      {relation.type === 'Neutre' && (
        <>
          {relation.neutralNature && (
            <div style={{ marginBottom: 10 }}>
              <strong>Nature de la neutralité:</strong> {relation.neutralNature}
            </div>
          )}
          {relation.neutralContactFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fréquence de contact:</strong> {relation.neutralContactFrequency}
            </div>
          )}
          {relation.neutralContext && (
            <div style={{ marginBottom: 10 }}>
              <strong>Contexte habituel:</strong> {relation.neutralContext}
            </div>
          )}
          {relation.neutralInterestLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau d'intérêt:</strong> {relation.neutralInterestLevel}/5 - {['Aucun', 'Très faible', 'Minime', 'Léger', 'Modéré'][relation.neutralInterestLevel - 1]}
            </div>
          )}
          {relation.neutralEvolutionPotential && (
            <div style={{ marginBottom: 10 }}>
              <strong>Potentiel d'évolution:</strong> {relation.neutralEvolutionPotential}
            </div>
          )}
          {relation.neutralReason && (
            <div style={{ marginBottom: 10 }}>
              <strong>Raison de la neutralité:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.neutralReason}</p>
            </div>
          )}
          {relation.neutralBarriers && (
            <div style={{ marginBottom: 10 }}>
              <strong>Barrières / Obstacles:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.neutralBarriers}</p>
            </div>
          )}
          {relation.neutralNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Notes:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.neutralNotes}</p>

      {/* Champs conditionnels - Relations violentes */}
      {(relation.type === 'Abuseur' || relation.type === 'Victime' || relation.type === 'Meurtrier') && (
        <div style={{ marginBottom: 20, padding: 20, backgroundColor: '#fff5f5', border: '2px solid #fc8181', borderRadius: 12 }}>
          <h4 style={{ marginTop: 0, marginBottom: 12, color: '#c53030' }}>⚠️ Informations sensibles</h4>
          {relation.violenceType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type de violence:</strong> {relation.violenceType}
            </div>
          )}
          {relation.violenceDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Date:</strong> {relation.violenceDate}
            </div>
          )}
          {relation.violenceDuration && (
            <div style={{ marginBottom: 10 }}>
              <strong>Durée:</strong> {relation.violenceDuration}
            </div>
          )}
          {relation.violenceFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fréquence:</strong> {relation.violenceFrequency}
            </div>
          )}
          {relation.violenceSeverity && (
            <div style={{ marginBottom: 10 }}>
              <strong>Sévérité:</strong> {relation.violenceSeverity}/5 - {['Mineure', 'Modérée', 'Sérieuse', 'Grave', 'Extrême'][relation.violenceSeverity - 1]}
            </div>
          )}
          {relation.traumaLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Impact traumatique:</strong> {relation.traumaLevel}/5 - {['Léger', 'Modéré', 'Important', 'Sévère', 'Dévastateur'][relation.traumaLevel - 1]}
            </div>
          )}
          {relation.violenceCircumstances && (
            <div style={{ marginBottom: 10 }}>
              <strong>Circonstances:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.violenceCircumstances}</p>
            </div>
          )}
          {relation.witnessesInvolved && (
            <div style={{ marginBottom: 10 }}>
              <strong>Témoins:</strong> {relation.witnessesInvolved}
            </div>
          )}
          {relation.legalConsequences && (
            <div style={{ marginBottom: 10 }}>
              <strong>Conséquences légales:</strong> {relation.legalConsequences}
            </div>
          )}
          {relation.type === 'Meurtrier' && (
            <>
              {relation.murderCircumstances && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Circonstances du meurtre:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.murderCircumstances}</p>
                </div>
              )}
              {relation.murderMethod && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Méthode:</strong> {relation.murderMethod}
                </div>
              )}
              {relation.murderMotive && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Motif:</strong> {relation.murderMotive}
                </div>
              )}
              {relation.murderPremeditation && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Préméditation:</strong> {relation.murderPremeditation}
                </div>
              )}
              {relation.bodyDiscovery && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Découverte du corps:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.bodyDiscovery}</p>
                </div>
              )}
              {relation.investigation && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Enquête:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.investigation}</p>
                </div>
              )}
              {relation.suspicionLevel && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Niveau de suspicion:</strong> {relation.suspicionLevel}
                </div>
              )}
            </>
          )}
          {relation.type === 'Abuseur' && (
            <>
              {relation.abuseType && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Type d'abus:</strong> {relation.abuseType}
                </div>
              )}
              {relation.powerDynamics && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Dynamique de pouvoir:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.powerDynamics}</p>
                </div>
              )}
              {relation.manipulationTactics && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Tactiques de manipulation:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.manipulationTactics}</p>
                </div>
              )}
            </>
          )}
          {relation.type === 'Victime' && (
            <>
              {relation.escapeAttempts && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Tentatives d'échappement:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.escapeAttempts}</p>
                </div>
              )}
              {relation.supportReceived && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Soutien reçu:</strong> {relation.supportReceived}
                </div>
              )}
              {relation.recoveryStatus && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Statut de récupération:</strong> {relation.recoveryStatus}
                </div>
              )}
              {relation.protectionMeasures && (
                <div style={{ marginBottom: 10 }}>
                  <strong>Mesures de protection:</strong>
                  <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.protectionMeasures}</p>
                </div>
              )}
            </>
          )}
          {relation.triggerWarnings && (
            <div style={{ marginBottom: 10 }}>
              <strong>Avertissements de contenu:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.triggerWarnings}</p>
            </div>
          )}
          {relation.violenceNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Notes additionnelles:</strong>
              <p style={{ margin: '6px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{relation.violenceNotes}</p>
            </div>
          )}
        </div>
      )}
            </div>
          )}
        </>
      )}

      {isFriendlyType(relation.type) && (
        <>
          {relation.friendlyTrustLevel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Niveau de confiance:</strong> {relation.friendlyTrustLevel}/5 - {['Naissante', 'Sympathie', 'Solide', 'Forte', 'Indéfectible'][relation.friendlyTrustLevel - 1]}
            </div>
          )}
          {relation.friendlyContactFrequency && (
            <div style={{ marginBottom: 10 }}>
              <strong>Fréquence de contact:</strong> {relation.friendlyContactFrequency}
            </div>
          )}
          {relation.friendlyPrimaryChannel && (
            <div style={{ marginBottom: 10 }}>
              <strong>Canal principal:</strong> {relation.friendlyPrimaryChannel}
            </div>
          )}
          {relation.friendlyGroup && (
            <div style={{ marginBottom: 10 }}>
              <strong>Cercle / Groupe:</strong> {relation.friendlyGroup}
            </div>
          )}
          {relation.friendlySharedInterests && (
            <div style={{ marginBottom: 10 }}>
              <strong>Intérêts communs:</strong> {relation.friendlySharedInterests}
            </div>
          )}
          {relation.friendlyFavoriteActivities && (
            <div style={{ marginBottom: 10 }}>
              <strong>Activités favorites:</strong> {relation.friendlyFavoriteActivities}
            </div>
          )}
          {relation.friendlyInsideJokes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Blagues privées:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.friendlyInsideJokes}</p>
            </div>
          )}
          {relation.friendlySupportType && (
            <div style={{ marginBottom: 10 }}>
              <strong>Type de soutien:</strong> {relation.friendlySupportType}
            </div>
          )}
          {relation.friendlyFirstMeetingDate && (
            <div style={{ marginBottom: 10 }}>
              <strong>Première rencontre:</strong> {new Date(relation.friendlyFirstMeetingDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {relation.friendlyFirstMeetingPlace && (
            <div style={{ marginBottom: 10 }}>
              <strong>Lieu de la première rencontre:</strong> {relation.friendlyFirstMeetingPlace}
            </div>
          )}
          {relation.friendlyConflictNotes && (
            <div style={{ marginBottom: 10 }}>
              <strong>Conflits / Divergences:</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>{relation.friendlyConflictNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Tags */}
      {relation.tags?.length > 0 && (
        <div>
          <strong>Tags:</strong>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
            {relation.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#e7f3ff',
                  border: '1px solid #90caf9',
                  borderRadius: 12,
                  fontSize: 12
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, color: '#999', marginTop: 16 }}>
        Créée le {new Date(relation.createdAt).toLocaleString('fr-FR')}
      </div>
    </div>
  );
}
