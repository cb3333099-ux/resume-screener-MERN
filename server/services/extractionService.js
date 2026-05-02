const { SKILLS_DICTIONARY, SKILLS_CATEGORIES } = require('../utils/skillsDict');

// Build a skill → category lookup map for O(1) category resolution
const SKILL_CATEGORY_MAP = {};
for (const [category, skills] of Object.entries(SKILLS_CATEGORIES)) {
  for (const skill of skills) {
    SKILL_CATEGORY_MAP[skill] = category;
  }
}

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesSkill(normalizedText, skill) {
  return new RegExp(`(?<![a-z0-9])${escapeRegex(skill)}(?![a-z0-9])`).test(normalizedText);
}

function groupByCategory(skillList) {
  const grouped = {};
  for (const skill of skillList) {
    const cat = SKILL_CATEGORY_MAP[skill] || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  }
  return grouped;
}

function analyzeSkills(jdText, resumeText) {
  const normalizedJD = normalizeText(jdText);
  const normalizedResume = normalizeText(resumeText);

  const jdSkills = SKILLS_DICTIONARY.filter((skill) => matchesSkill(normalizedJD, skill));
  const jdSkillSet = new Set(jdSkills);
  const matched = jdSkills.filter((skill) => matchesSkill(normalizedResume, skill));
  const matchedSet = new Set(matched);
  const missing = jdSkills.filter((skill) => !matchedSet.has(skill));
  const optional = SKILLS_DICTIONARY.filter(
    (skill) => !jdSkillSet.has(skill) && matchesSkill(normalizedResume, skill)
  );

  const skillsByCategory = {
    matched: groupByCategory(matched),
    missing: groupByCategory(missing),
    optional: groupByCategory(optional),
  };

  return { jdSkills, matched, missing, optional, skillsByCategory };
}

function detectDegree(text) {
  const normalized = normalizeText(text);
  if (/\bph\.?d\b/.test(normalized)) return 'phd';
  if (/\bmaster(?:'s)?\b|\bm\.?s\.?\b|\bm\.?eng\b|\bm\.?sc\b/.test(normalized)) return 'master';
  if (/\bbachelor(?:'s)?\b|\bb\.?s\.?\b|\bb\.?eng\b|\bb\.?a\.?\b|\bundergraduate\b/.test(normalized))
    return 'bachelor';
  if (/\bhigh\s*school\b|\bhighschool\b/.test(normalized)) return 'highschool';
  return 'unknown';
}

function extractExperienceYearsFromJD(text) {
  const normalized = normalizeText(text);
  const patterns = [
    /(\d+)\s*\+\s*years?\s*of/,
    /at\s*least\s*(\d+)\s*years?/,
    /minimum\s*(?:of\s*)?(\d+)\s*years?/,
    /(\d+)\s*(?:to|-)\s*\d+\s*years?/,
    /(\d+)\s*years?\s*(?:of\s*)?experience/,
    /experience[^.]{0,30}?(\d+)\s*years?/,
  ];
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) return parseInt(match[1], 10);
  }
  return 0;
}

function extractExperienceYearsFromResume(text) {
  const normalized = normalizeText(text);
  const explicit = normalized.match(/(\d+)\s*\+?\s*years?\s*(?:of\s*)?experience/);
  if (explicit) return parseInt(explicit[1], 10);

  const yearMatches = [...normalized.matchAll(/\b(20\d{2}|19\d{2})\b/g)];
  if (yearMatches.length >= 2) {
    const years = yearMatches.map((m) => parseInt(m[1], 10));
    return Math.max(0, Math.max(...years) - Math.min(...years));
  }
  return 0;
}

module.exports = {
  normalizeText,
  analyzeSkills,
  detectDegree,
  extractExperienceYearsFromJD,
  extractExperienceYearsFromResume,
};