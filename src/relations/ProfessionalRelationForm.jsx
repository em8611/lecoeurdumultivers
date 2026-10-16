import React, { useMemo } from 'react';

export default function ProfessionalRelationForm({ formData, setFormData }) {
  const isMentor = formData.type === 'Mentor';
  const isProtege = formData.type === 'Protégé·e';
  const isColleague = formData.type === 'Collègue';
  const isTeacher = formData.type === 'Professeur' || formData.type === 'Formateur';
  const isStudent = formData.type === 'Élève' || formData.type === 'Étudiant' || formData.type === 'Apprenti';
  const isDirector = formData.type === 'Directeur';

  // Déterminer les erreurs (requis / recommandés)
  const errors = useMemo(() => {
    const e = {};
    if (isMentor && !formData.mentorshipFocus) e.mentorshipFocus = 'Focus du mentorat requis';
    if (isProtege && !formData.developmentGoals) e.developmentGoals = 'Objectifs requis';
    if (isColleague && !formData.department) e.department = 'Département recommandé';
    if (isColleague && !formData.project) e.project = 'Projet recommandé';
  if (isTeacher && !formData.teachingSubject) e.teachingSubject = 'Matière enseignée requise';
  if (isStudent && !formData.learningProgress) e.learningProgress = 'Progression d’apprentissage requise';
  if (isDirector && !formData.department) e.department = 'Département recommandé';
    if (!formData.organization) e.organization = 'Organisation recommandée';
    if (!formData.role) e.role = 'Rôle recommandé';
    return e;
  }, [formData, isMentor, isProtege, isColleague, isTeacher, isStudent]);

  const baseInputStyle = (hasError) => ({
    width: '100%',
    padding: 8,
    borderRadius: 4,
    border: `1px solid ${hasError ? '#a13d3d' : 'var(--trait)'}`,
    fontSize: 14,
    backgroundColor: hasError ? 'var(--douceur)' : 'white'
  });

  const label = (text, required) => (
    <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
      {text}{required && <span style={{ color: '#a13d3d' }}> *</span>}
    </label>
  );

  const help = (field) => errors[field] ? (
    <div style={{ fontSize: 11, color: '#a13d3d', marginTop: 4 }}>{errors[field]}</div>
  ) : null;

  return (
  <div style={{ marginBottom: 20, padding: 20, backgroundColor: 'var(--douceur)', borderRadius: 'var(--rayon-carte)', border: '1px solid var(--trait)' }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, color: 'var(--coeur)' }}>Informations professionnelles détaillées</h4>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, alignItems: 'start' }}>
        <div>
          {label('Hiérarchie', false)}
          <select
            value={formData.hierarchy || ''}
            onChange={(e) => setFormData({ ...formData, hierarchy: e.target.value })}
            style={baseInputStyle(false)}
          >
            <option value="">Sélectionner...</option>
            <option value="Égal">Égal</option>
            <option value="Supérieur">Supérieur</option>
            <option value="Subordonné">Subordonné</option>
          </select>
        </div>
        <div>
          {label('Nature de la collaboration', false)}
          <input
            type="text"
            value={formData.collaboration || ''}
            onChange={(e) => setFormData({ ...formData, collaboration: e.target.value })}
            placeholder="Projet commun, supervision, pair-programming..."
            style={baseInputStyle(false)}
          />
        </div>
        <div>
          {label('Organisation / Structure', true)}
          <input
            type="text"
            value={formData.organization || ''}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="Entreprise, guilde, institution..."
            style={baseInputStyle(!!errors.organization)}
          />
          {help('organization')}
        </div>
        <div>
          {label('Rôle / Fonction', true)}
          <input
            type="text"
            value={formData.role || ''}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Analyste, Formateur, Assistant..."
            style={baseInputStyle(!!errors.role)}
          />
          {help('role')}
        </div>
        <div>
          {label('Type de contrat', false)}
          <select
            value={formData.contractType || ''}
            onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
            style={baseInputStyle(false)}
          >
            <option value="">Sélectionner...</option>
            <option value="Permanent">Permanent</option>
            <option value="Temporaire">Temporaire</option>
            <option value="Mission">Mission</option>
            <option value="Freelance">Freelance</option>
            <option value="Stage">Stage</option>
          </select>
        </div>
        <div>
          {label('Niveau de confidentialité', false)}
          <select
            value={formData.confidentialityLevel || ''}
            onChange={(e) => setFormData({ ...formData, confidentialityLevel: e.target.value })}
            style={baseInputStyle(false)}
          >
            <option value="">Sélectionner...</option>
            <option value="Faible">Faible</option>
            <option value="Standard">Standard</option>
            <option value="Élevé">Élevé</option>
            <option value="Secret">Secret</option>
          </select>
        </div>
        <div>
          {label("Fréquence d'évaluation", false)}
          <select
            value={formData.evaluationFrequency || ''}
            onChange={(e) => setFormData({ ...formData, evaluationFrequency: e.target.value })}
            style={baseInputStyle(false)}
          >
            <option value="">Sélectionner...</option>
            <option value="Hebdomadaire">Hebdomadaire</option>
            <option value="Mensuelle">Mensuelle</option>
            <option value="Trimestrielle">Trimestrielle</option>
            <option value="Annuelle">Annuelle</option>
            <option value="À la demande">À la demande</option>
          </select>
        </div>
          {isColleague && (
          <div>
            {label('Département / Équipe', true)}
            <input
              type="text"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="R&D, Archives, Sécurité..."
              style={baseInputStyle(!!errors.department)}
            />
            {help('department')}
          </div>
        )}
          {isDirector && (
            <div>
              {label('Département / Pôle', false)}
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Ex: Direction Recherche, Pôle Académique..."
                style={baseInputStyle(!!errors.department)}
              />
              {help('department')}
            </div>
          )}
        {isColleague && (
          <div>
            {label('Projet / Mission partagée', true)}
            <input
              type="text"
              value={formData.project || ''}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              placeholder="Nom du projet ou objectif..."
              style={baseInputStyle(!!errors.project)}
            />
            {help('project')}
          </div>
        )}
          {isTeacher && (
            <>
              <div>
                {label('Matière enseignée', true)}
                <input
                  type="text"
                  value={formData.teachingSubject || ''}
                  onChange={(e) => setFormData({ ...formData, teachingSubject: e.target.value })}
                  placeholder="Ex: Mathématiques, Magie runique, Stratégie..."
                  style={baseInputStyle(!!errors.teachingSubject)}
                />
                {help('teachingSubject')}
              </div>
              <div>
                {label('Style pédagogique', false)}
                <select
                  value={formData.teachingStyle || ''}
                  onChange={(e) => setFormData({ ...formData, teachingStyle: e.target.value })}
                  style={baseInputStyle(false)}
                >
                  <option value="">Sélectionner...</option>
                  <option value="Magistral">Magistral</option>
                  <option value="Socratique">Socratique</option>
                  <option value="Pratique">Pratique</option>
                  <option value="Projet">Projet</option>
                  <option value="Mixte">Mixte</option>
                </select>
              </div>
            </>
          )}
          {isStudent && (
            <>
              <div>
                {label('Style d’apprentissage', false)}
                <select
                  value={formData.learningStyle || ''}
                  onChange={(e) => setFormData({ ...formData, learningStyle: e.target.value })}
                  style={baseInputStyle(false)}
                >
                  <option value="">Sélectionner...</option>
                  <option value="Visuel">Visuel</option>
                  <option value="Auditif">Auditif</option>
                  <option value="Kinesthésique">Kinesthésique</option>
                  <option value="Lecture/Écriture">Lecture/Écriture</option>
                  <option value="Mixte">Mixte</option>
                </select>
              </div>
              <div>
                {label('Progression', true)}
                <input
                  type="text"
                  value={formData.learningProgress || ''}
                  onChange={(e) => setFormData({ ...formData, learningProgress: e.target.value })}
                  placeholder="Débutant, Intermédiaire, Avancé, Chapitre 3, Module 2..."
                  style={baseInputStyle(!!errors.learningProgress)}
                />
                {help('learningProgress')}
              </div>
              <div>
                {label('Performance académique', false)}
                <input
                  type="text"
                  value={formData.academicPerformance || ''}
                  onChange={(e) => setFormData({ ...formData, academicPerformance: e.target.value })}
                  placeholder="Top 10%, A-, Mérite, observations..."
                  style={baseInputStyle(false)}
                />
              </div>
            </>
          )}
        {isMentor && (
          <div>
            {label('Focus du mentorat', true)}
            <input
              type="text"
              value={formData.mentorshipFocus || ''}
              onChange={(e) => setFormData({ ...formData, mentorshipFocus: e.target.value })}
              placeholder="Compétence clé, domaine, discipline..."
              style={baseInputStyle(!!errors.mentorshipFocus)}
            />
            {help('mentorshipFocus')}
          </div>
        )}
        {isMentor && (
          <div>
            {label('Durée estimée', false)}
            <input
              type="text"
              value={formData.mentorDuration || ''}
              onChange={(e) => setFormData({ ...formData, mentorDuration: e.target.value })}
              placeholder="6 mois, continu..."
              style={baseInputStyle(false)}
            />
          </div>
        )}
        {isProtege && (
          <div style={{ gridColumn: 'span 2' }}>
            {label('Objectifs de développement', true)}
            <textarea
              rows={2}
              value={formData.developmentGoals || ''}
              onChange={(e) => setFormData({ ...formData, developmentGoals: e.target.value })}
              placeholder="Compétences à acquérir, progression recherchée..."
              style={{ ...baseInputStyle(!!errors.developmentGoals), fontFamily: 'inherit', resize: 'vertical' }}
            />
            {help('developmentGoals')}
          </div>
        )}
        <div>
          {label('Date de fin / rupture', false)}
          <input
            type="date"
            value={formData.professionalEndDate || ''}
            onChange={(e) => setFormData({ ...formData, professionalEndDate: e.target.value })}
            style={baseInputStyle(false)}
          />
        </div>
      </div>
  <div style={{ marginTop: 20 }}>
        {label('Notes / Observations', false)}
        <textarea
          rows={3}
          value={formData.performanceNotes || ''}
          onChange={(e) => setFormData({ ...formData, performanceNotes: e.target.value })}
          placeholder="Feedback, incidents, évolutions notables..."
          style={{ ...baseInputStyle(false), fontFamily: 'inherit', resize: 'vertical' }}
        />
      </div>
      {/* Résumé rapide des manques */}
      {Object.keys(errors).length > 0 && (
        <div style={{ marginTop: 12, background: 'var(--douceur)', border: '1px solid var(--trait)', borderLeft: '3px solid var(--or)', padding: 10, borderRadius: 'var(--rayon-carte)', fontSize: 12, color: '#a13d3d' }}>
          Champs à compléter avant validation idéale: {Object.keys(errors).join(', ')}
        </div>
      )}
    </div>
  );
}
