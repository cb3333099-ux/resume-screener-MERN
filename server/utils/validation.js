const { z } = require('zod');

const analyzeSchema = z.object({
  jobDescriptionText: z.string().min(20, 'Job description must be at least 20 characters'),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
});

const saveAnalysisSchema = z.object({
  resumeFileName: z.string().min(1),
  jobDescriptionText: z.string().min(20),
  overallScore: z.number().min(0).max(100),
  atsScore: z.number().min(0).max(100),
  skillMatchScore: z.number().min(0).max(100),
  experience: z.object({
    requiredYears: z.number().min(0),
    candidateYears: z.number().min(0),
    status: z.enum(['underqualified', 'qualified', 'overqualified', 'unknown']),
    score: z.number().min(0).max(100),
  }),
  education: z.object({
    requiredLevel: z.enum(['unknown', 'highschool', 'bachelor', 'master', 'phd']),
    candidateLevel: z.enum(['unknown', 'highschool', 'bachelor', 'master', 'phd']),
    status: z.enum(['match', 'missing', 'unknown']),
    score: z.number().min(0).max(100),
  }),
  skills: z.object({
    matched: z.array(z.string()),
    missing: z.array(z.string()),
    optional: z.array(z.string()),
  }),
  recommendations: z.array(
    z.object({
      text: z.string().min(1),
      priority: z.enum(['High', 'Medium', 'Low']),
    })
  ),
  atsWarnings: z.array(z.string()),
  resumeText: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
});

const bookmarkSchema = z.object({
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  jobDescriptionText: z.string().min(20),
});

module.exports = {
  analyzeSchema,
  saveAnalysisSchema,
  bookmarkSchema,
};
