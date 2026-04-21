const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema(
  {
    resumeFileName: { type: String, required: true },
    resumeText: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    jobDescriptionText: { type: String, required: true },
    overallScore: { type: Number, required: true },
    atsScore: { type: Number, required: true },
    skillMatchScore: { type: Number, required: true },
    experience: {
      requiredYears: { type: Number, default: 0 },
      candidateYears: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['underqualified', 'qualified', 'overqualified', 'unknown'],
        default: 'unknown',
      },
      score: { type: Number, default: 0 },
    },
    education: {
      requiredLevel: {
        type: String,
        enum: ['unknown', 'highschool', 'bachelor', 'master', 'phd'],
        default: 'unknown',
      },
      candidateLevel: {
        type: String,
        enum: ['unknown', 'highschool', 'bachelor', 'master', 'phd'],
        default: 'unknown',
      },
      status: { type: String, enum: ['match', 'missing', 'unknown'], default: 'unknown' },
      score: { type: Number, default: 0 },
    },
    skills: {
      matched: { type: [String], default: [] },
      missing: { type: [String], default: [] },
      optional: { type: [String], default: [] },
    },
    recommendations: {
      type: [
        {
          text: { type: String, required: true },
          priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
        },
      ],
      default: [],
    },
    atsWarnings: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', AnalysisSchema);
