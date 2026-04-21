const Analysis = require('../models/Analysis');
const { generateAnalysisPdf } = require('../services/pdfGenerator');

async function exportAnalysisPdf(req, res, next) {
  try {
    const { analysisId, analysis } = req.body;

    let payload = analysis;
    if (!payload && analysisId) {
      payload = await Analysis.findById(analysisId).lean();
    }

    if (!payload) {
      return res.status(400).json({ message: 'Provide analysisId or analysis object' });
    }

    const pdfBuffer = await generateAnalysisPdf(payload);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume-analysis-report.pdf"');
    return res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  exportAnalysisPdf,
};
