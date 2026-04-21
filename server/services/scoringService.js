const { DEGREE_RANK, PRIORITY, SCORE_WEIGHTS } = require('../utils/constants');

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function computeSkillMatchScore(skills) {
  const total = skills.matched.length + skills.missing.length;
  if (total === 0) return 0;
  return clampScore((skills.matched.length / total) * 100);
}

function computeExperienceMatch(requiredYears, candidateYears) {
  if (!requiredYears) {
    return { status: 'unknown', score: 50, requiredYears: 0, candidateYears };
  }

  if (candidateYears >= requiredYears + 2) {
    return { status: 'overqualified', score: 100, requiredYears, candidateYears };
  }

  if (candidateYears >= requiredYears) {
    return { status: 'qualified', score: 85, requiredYears, candidateYears };
  }

  const ratio = candidateYears / requiredYears;
  return {
    status: 'underqualified',
    score: clampScore(ratio * 80),
    requiredYears,
    candidateYears,
  };
}

function computeEducationMatch(requiredLevel, candidateLevel) {
  if (requiredLevel === 'unknown' || candidateLevel === 'unknown') {
    return { status: 'unknown', score: 50, requiredLevel, candidateLevel };
  }

  const requiredRank = DEGREE_RANK[requiredLevel];
  const candidateRank = DEGREE_RANK[candidateLevel];

  if (candidateRank >= requiredRank) {
    return { status: 'match', score: 100, requiredLevel, candidateLevel };
  }

  return { status: 'missing', score: 30, requiredLevel, candidateLevel };
}

function computeATSScore({ resumeText, hasEmail, hasPhone, hasSections, keywordCoverage }) {
  let score = 0;
  const warnings = [];

  if (hasEmail) score += 15;
  else warnings.push('No email address detected.');

  if (hasPhone) score += 15;
  else warnings.push('No phone number detected.');

  const sectionCount = Object.values(hasSections).filter(Boolean).length;
  score += Math.round((sectionCount / 3) * 25);
  if (!hasSections.experience) warnings.push('EXPERIENCE section header missing.');
  if (!hasSections.skills) warnings.push('SKILLS section header missing.');
  if (!hasSections.education) warnings.push('EDUCATION section header missing.');

  score += Math.round(keywordCoverage * 35);
  if (keywordCoverage < 0.4) warnings.push('Low keyword coverage against the job description.');

  const normalizedLength = resumeText.trim().length;
  if (normalizedLength < 600) {
    warnings.push('Resume appears too short. Add more measurable details.');
    score += 5;
  } else if (normalizedLength > 8000) {
    warnings.push('Resume appears too long; keep formatting concise.');
    score += 5;
  } else {
    score += 10;
  }

  return {
    atsScore: clampScore(score),
    warnings,
  };
}

function computeOverallScore({ skillMatchScore, experienceScore, educationScore, atsScore }) {
  const overall =
    skillMatchScore * SCORE_WEIGHTS.skill +
    experienceScore * SCORE_WEIGHTS.experience +
    educationScore * SCORE_WEIGHTS.education +
    atsScore * SCORE_WEIGHTS.ats;

  return clampScore(overall);
}

function buildRecommendations({ skills, atsWarnings, experience, education }) {
  const recs = [];

  skills.missing.slice(0, 2).forEach((skill) => {
    recs.push({
      text: `Add project bullets showing practical ${skill} experience.`,
      priority: PRIORITY.HIGH,
    });
  });

  if (experience.status === 'underqualified') {
    recs.push({
      text: 'Highlight outcomes and ownership to offset lower years of experience.',
      priority: PRIORITY.HIGH,
    });
  }

  if (education.status === 'missing') {
    recs.push({
      text: 'Include relevant coursework/certifications to bridge education requirements.',
      priority: PRIORITY.MEDIUM,
    });
  }

  atsWarnings.slice(0, 2).forEach((warning) => {
    recs.push({
      text: warning,
      priority: PRIORITY.MEDIUM,
    });
  });

  if (recs.length < 3) {
    recs.push({
      text: 'Tailor summary and keywords to the target job title and responsibilities.',
      priority: PRIORITY.LOW,
    });
  }

  return recs.slice(0, 5);
}

module.exports = {
  computeSkillMatchScore,
  computeExperienceMatch,
  computeEducationMatch,
  computeATSScore,
  computeOverallScore,
  buildRecommendations,
};
