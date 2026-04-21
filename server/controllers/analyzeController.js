const { default: pdfParse } = require('pdf-parse');
const {
  analyzeSkills,
  detectDegree,
  extractExperienceYearsFromJD,
  extractExperienceYearsFromResume,
  normalizeText,
} = require('../services/extractionService');
const {
  buildRecommendations,
  computeATSScore,
  computeEducationMatch,
  computeExperienceMatch,
  computeOverallScore,
  computeSkillMatchScore,
} = require('../services/scoringService');
const { analyzeSchema } = require('../utils/validation');

async function analyzeResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'resumePdf file is required' });
    }

    const parsedInput = analyzeSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ message: parsedInput.error.issues[0].message });
    }

    const { jobDescriptionText, jobTitle = '', company = '' } = parsedInput.data;
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text || '';

    const skills = analyzeSkills(jobDescriptionText, resumeText);
    const skillMatchScore = computeSkillMatchScore(skills);

    const requiredYears = extractExperienceYearsFromJD(jobDescriptionText);
    const candidateYears = extractExperienceYearsFromResume(resumeText);
    const experience = computeExperienceMatch(requiredYears, candidateYears);

    const education = computeEducationMatch(detectDegree(jobDescriptionText), detectDegree(resumeText));

    const normalizedResume = normalizeText(resumeText);
    const hasEmail = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/.test(resumeText);
    const hasPhone = /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/.test(resumeText);
    const hasSections = {
      experience: /\bexperience\b/i.test(normalizedResume),
      skills: /\bskills\b/i.test(normalizedResume),
      education: /\beducation\b/i.test(normalizedResume),
    };

    const keywordCoverage = skills.jdSkills.length
      ? skills.matched.length / skills.jdSkills.length
      : 0;

    const { atsScore, warnings } = computeATSScore({
      resumeText,
      hasEmail,
      hasPhone,
      hasSections,
      keywordCoverage,
    });

    const overallScore = computeOverallScore({
      skillMatchScore,
      experienceScore: experience.score,
      educationScore: education.score,
      atsScore,
    });

    const recommendations = buildRecommendations({
      skills,
      atsWarnings: warnings,
      experience,
      education,
    });

    return res.status(200).json({
      resumeFileName: req.file.originalname,
      resumeText,
      jobDescriptionText,
      jobTitle,
      company,
      overallScore,
      atsScore,
      skillMatchScore,
      experience,
      education,
      skills: {
        matched: skills.matched,
        missing: skills.missing,
        optional: skills.optional,
      },
      recommendations,
      atsWarnings: warnings,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeResume,
};
