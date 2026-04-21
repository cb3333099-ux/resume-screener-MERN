const Analysis = require('../models/Analysis');
const { generateAnalysisPdf } = require('../services/pdfGenerator');
const { isValidObjectId } = require('../utils/validation');

async function exportAnalysisPdf(req, res, next) {
  try {
    const { analysisId, analysis } = req.body;

    let payload = analysis;
    if (!payload && analysisId) {
      if (!isValidObjectId(analysisId)) {
        return res.status(400).json({ message: 'Invalid analysis id' });
      }
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
