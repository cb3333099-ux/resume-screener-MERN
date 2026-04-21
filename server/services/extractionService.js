const { SKILLS_DICTIONARY } = require('../utils/skillsDict');

function normalizeText(text = '') {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function unique(items) {
  return [...new Set(items)];
}

function containsWord(text, term) {
  if (term.includes('+')) {
    return text.includes(term);
  }
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(text);
}

function extractSkillsFromText(text) {
  const normalized = normalizeText(text);
  return unique(SKILLS_DICTIONARY.filter((skill) => containsWord(normalized, skill)));
}

function extractOptionalSkillsFromJD(jdText) {
  const normalized = normalizeText(jdText);
  const optionalSectionMatch = normalized.match(
    /(nice to have|preferred qualifications?|bonus skills?)[:\s\-]*([\s\S]{0,500})/
  );
  if (!optionalSectionMatch) return [];
  return extractSkillsFromText(optionalSectionMatch[2]);
}

function extractExperienceYearsFromJD(jdText) {
  const text = normalizeText(jdText);
  const patterns = [
    /(?:minimum|min|at least)\s*(\d+)\+?\s*(?:years|yrs)/i,
    /(\d+)\+?\s*(?:years|yrs)\s*(?:of)?\s*experience/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return Number(match[1]);
  }

  return 0;
}

function parseYearToken(token) {
  const currentYear = new Date().getFullYear();
  const cleaned = token.toLowerCase();
  if (cleaned.includes('present') || cleaned.includes('current')) return currentYear;
  const yearMatch = cleaned.match(/(19|20)\d{2}/);
  if (yearMatch) return Number(yearMatch[0]);
  return null;
}

function extractExperienceYearsFromResume(resumeText) {
  const text = resumeText || '';
  const rangeRegex = /(\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\s*(?:19|20)\d{2})\s*[-–]\s*(present|current|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\s*(?:19|20)\d{2})/gi;
  const ranges = [...text.matchAll(rangeRegex)];

  let totalYears = 0;
  ranges.forEach((match) => {
    const startYear = parseYearToken(match[1]);
    const endYear = parseYearToken(match[2]);
    if (!startYear || !endYear || endYear < startYear) return;
    totalYears += endYear - startYear;
  });

  if (totalYears > 0) return Math.min(totalYears, 40);

  const standaloneYears = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((m) => Number(m[0]));
  if (standaloneYears.length >= 2) {
    const span = Math.max(...standaloneYears) - Math.min(...standaloneYears);
    if (span > 0) return Math.min(span, 40);
  }

  return 0;
}

function detectDegree(text) {
  const normalized = normalizeText(text);
  if (/ph\.?d|doctorate/.test(normalized)) return 'phd';
  if (/master'?s|m\.?s\.?|mba|mtech/.test(normalized)) return 'master';
  if (/bachelor'?s|b\.?s\.?|b\.?tech|bca|bsc|ba\b/.test(normalized)) return 'bachelor';
  if (/high school|secondary|diploma/.test(normalized)) return 'highschool';
  return 'unknown';
}

function analyzeSkills(jdText, resumeText) {
  const jdSkills = extractSkillsFromText(jdText);
  const resumeSkills = extractSkillsFromText(resumeText);
  const optionalSkills = extractOptionalSkillsFromJD(jdText);

  const matched = jdSkills.filter((skill) => resumeSkills.includes(skill));
  const missing = jdSkills.filter((skill) => !resumeSkills.includes(skill));

  return {
    jdSkills,
    resumeSkills,
    matched,
    missing,
    optional: optionalSkills,
  };
}

module.exports = {
  normalizeText,
  analyzeSkills,
  extractExperienceYearsFromJD,
  extractExperienceYearsFromResume,
  detectDegree,
};
