import ViolentRelationForm from './ViolentRelationForm';
export const ViolentRelationFields = (props) => <ViolentRelationForm {...props} />;
import React from 'react';
import SpecialRelationForm from './SpecialRelationForm.jsx';
import FamilialRelationForm from './FamilialRelationForm.jsx';
import ProfessionalRelationForm from './ProfessionalRelationForm.jsx';
import FriendlyRelationForm from './FriendlyRelationForm.jsx';
import CompanionRelationForm from './CompanionRelationForm.jsx';
import AllyRelationForm from './AllyRelationForm.jsx';
import LoveRelationForm from './LoveRelationForm.jsx';
import RivalryRelationForm from './RivalryRelationForm.jsx';
import AntagonistRelationForm from './AntagonistRelationForm.jsx';
import NeutralRelationForm from './NeutralRelationForm.jsx';
import IdolFanaticRelationForm from './IdolFanaticRelationForm.jsx';

// Composant pour les champs de relations familiales
export function FamilialRelationFields({ formData, setFormData }) {
  return <FamilialRelationForm formData={formData} setFormData={setFormData} />;
}

// Composant pour les champs de relations professionnelles
export function ProfessionalRelationFields({ formData, setFormData }) {
  return <ProfessionalRelationForm formData={formData} setFormData={setFormData} />;
}

// Composant pour les champs de compagnon
export function CompanionRelationFields({ formData, setFormData }) {
  return <CompanionRelationForm formData={formData} setFormData={setFormData} />;
}

// Composant pour les champs de créateur/propriétaire
export function CreatorOwnerRelationFields({ formData, setFormData }) {
  const isCreator = formData.type === 'Créateur';
  const isOwner = formData.type === 'Propriétaire';
  const handle = (f,v)=> setFormData({ ...formData, [f]: v });
  return (
    <div style={{ marginBottom: 20, padding: 20, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
      <h4 style={{ marginTop: 0, marginBottom: 16, color: 'var(--coeur)' }}>{isCreator ? 'Création' : 'Propriété'} avancée</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
        {/* Commun */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Date de création</label>
          <input type="date" value={formData.creationDate || ''} onChange={(e)=> handle('creationDate', e.target.value)} style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
        </div>
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Type</label>
          <input type="text" value={formData.ownership || ''} onChange={(e)=> handle('ownership', e.target.value)} placeholder={isCreator ? 'Artefact, Concept, Être...' : 'Légale, Morale, Temporaire...'} style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
        </div>

        {isCreator && (
          <>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>But / Finalité</label>
              <textarea rows={2} value={formData.creationPurpose || ''} onChange={(e)=> handle('creationPurpose', e.target.value)} placeholder="Objectif principal, usage prévu..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Processus de création</label>
              <textarea rows={2} value={formData.creationProcess || ''} onChange={(e)=> handle('creationProcess', e.target.value)} placeholder="Étapes, méthodes employées, durée..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Matériaux / Composants</label>
              <input type="text" value={formData.creationMaterials || ''} onChange={(e)=> handle('creationMaterials', e.target.value)} placeholder="Substances, parties, technologies..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Contraintes</label>
              <input type="text" value={formData.creationConstraints || ''} onChange={(e)=> handle('creationConstraints', e.target.value)} placeholder="Énergie, temps, ressources rares..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Risques</label>
              <input type="text" value={formData.creationRisks || ''} onChange={(e)=> handle('creationRisks', e.target.value)} placeholder="Instabilité, corruption, échec..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Considérations éthiques</label>
              <input type="text" value={formData.creationEthics || ''} onChange={(e)=> handle('creationEthics', e.target.value)} placeholder="Moralité, interdits, dilemmes..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Dispositifs de sécurité</label>
              <textarea rows={2} value={formData.creationSafeguards || ''} onChange={(e)=> handle('creationSafeguards', e.target.value)} placeholder="Verrous, protocoles, dépendances..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Potentiel d'amélioration</label>
              <input type="text" value={formData.creationUpgradePotential || ''} onChange={(e)=> handle('creationUpgradePotential', e.target.value)} placeholder="Extensions, versions futures..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Origine / Inspiration</label>
              <input type="text" value={formData.creationOrigin || ''} onChange={(e)=> handle('creationOrigin', e.target.value)} placeholder="Source, influence culturelle..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
          </>
        )}

        {isOwner && (
          <>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Méthode d'acquisition</label>
              <input type="text" value={formData.ownershipAcquisitionMethod || ''} onChange={(e)=> handle('ownershipAcquisitionMethod', e.target.value)} placeholder="Achat, héritage, conquête..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Date d'acquisition</label>
              <input type="date" value={formData.ownershipDate || ''} onChange={(e)=> handle('ownershipDate', e.target.value)} style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Étendue des droits</label>
              <textarea rows={2} value={formData.ownershipRightsScope || ''} onChange={(e)=> handle('ownershipRightsScope', e.target.value)} placeholder="Usage, reproduction, contrôle, accès..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Restrictions</label>
              <input type="text" value={formData.ownershipRestrictions || ''} onChange={(e)=> handle('ownershipRestrictions', e.target.value)} placeholder="Contraintes légales, morales..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Niveau de contrôle: {formData.ownershipControlLevel || 3}/5</label>
              <input type="range" min={1} max={5} value={formData.ownershipControlLevel || 3} onChange={(e)=> handle('ownershipControlLevel', parseInt(e.target.value))} style={{ width:'100%' }} />
              <div style={{ fontSize:12, marginTop:4, color:'var(--encre-douce)' }}>{['Très faible','Partiel','Modéré','Fort','Absolu'][(formData.ownershipControlLevel || 3)-1]}</div>
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Responsable maintenance</label>
              <input type="text" value={formData.ownershipMaintenanceResponsibility || ''} onChange={(e)=> handle('ownershipMaintenanceResponsibility', e.target.value)} placeholder="Nom, équipe, entité..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Historique de transferts</label>
              <textarea rows={2} value={formData.ownershipTransferHistory || ''} onChange={(e)=> handle('ownershipTransferHistory', e.target.value)} placeholder="Succession, ventes, pertes..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Responsabilité / Passifs</label>
              <input type="text" value={formData.ownershipLiability || ''} onChange={(e)=> handle('ownershipLiability', e.target.value)} placeholder="Dette, obligation, risque..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Plan de succession</label>
              <input type="text" value={formData.ownershipSuccessionPlan || ''} onChange={(e)=> handle('ownershipSuccessionPlan', e.target.value)} placeholder="Héritier, transfert prévu..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14 }} />
            </div>
            <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column' }}>
              <label style={{ fontWeight:'bold', marginBottom:5 }}>Notes propriété</label>
              <textarea rows={2} value={formData.ownershipNotes || ''} onChange={(e)=> handle('ownershipNotes', e.target.value)} placeholder="Informations additionnelles..." style={{ width:'100%', padding:8, border:'1px solid var(--trait)', borderRadius:'var(--rayon-bouton)', fontSize:14, resize:'vertical', fontFamily:'inherit' }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Composant pour les champs de relation spéciale
export function SpecialRelationFields({ formData, setFormData }) {
  return <SpecialRelationForm formData={formData} setFormData={setFormData} />;
}

// Composant pour les champs de relations amicales
export function FriendlyRelationFields({ formData, setFormData }) {
  return <FriendlyRelationForm formData={formData} setFormData={setFormData} />;
}

// Composant pour les champs d'alliance
export function AllyRelationFields({ formData, setFormData }) {
  return <AllyRelationForm formData={formData} setFormData={setFormData} />;
}

export function LoveRelationFields({ formData, setFormData }) {
  return <LoveRelationForm formData={formData} setFormData={setFormData} />;
}

export function RivalryRelationFields({ formData, setFormData }) {
  return <RivalryRelationForm formData={formData} setFormData={setFormData} />;
}

export function AntagonistRelationFields({ formData, setFormData }) {
  return <AntagonistRelationForm formData={formData} setFormData={setFormData} />;
}

export function NeutralRelationFields({ formData, setFormData }) {
  return <NeutralRelationForm formData={formData} setFormData={setFormData} />;
}

export function IdolFanaticRelationFields({ formData, setFormData }) {
  return <IdolFanaticRelationForm formData={formData} setFormData={setFormData} />;
}
