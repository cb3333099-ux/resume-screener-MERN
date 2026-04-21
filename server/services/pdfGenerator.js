const PDFDocument = require('pdfkit');

function addSectionTitle(doc, title) {
  doc.moveDown().fontSize(14).fillColor('#2563eb').text(title, { underline: true }).moveDown(0.5);
}

function generateAnalysisPdf(analysis) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.fontSize(20).fillColor('#111827').text('Resume Screener Report');
    doc.fontSize(10).fillColor('#6b7280').text(`Generated: ${new Date().toLocaleString()}`);

    addSectionTitle(doc, 'Candidate vs Job');
    doc.fillColor('#111827').fontSize(11);
    doc.text(`Job Title: ${analysis.jobTitle || 'N/A'}`);
    doc.text(`Company: ${analysis.company || 'N/A'}`);
    doc.text(`Resume File: ${analysis.resumeFileName}`);

    addSectionTitle(doc, 'Scores');
    doc.text(`Overall Score: ${analysis.overallScore}`);
    doc.text(`ATS Score: ${analysis.atsScore}`);
    doc.text(`Skill Match Score: ${analysis.skillMatchScore}`);
    doc.text(
      `Experience: ${analysis.experience.status} (${analysis.experience.candidateYears}/${analysis.experience.requiredYears} years)`
    );
    doc.text(`Education: ${analysis.education.status} (${analysis.education.candidateLevel})`);

    addSectionTitle(doc, 'Skills');
    doc.text(`Matched: ${analysis.skills.matched.join(', ') || 'None'}`);
    doc.text(`Missing: ${analysis.skills.missing.join(', ') || 'None'}`);
    doc.text(`Optional: ${analysis.skills.optional.join(', ') || 'None'}`);

    addSectionTitle(doc, 'Recommendations');
    analysis.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. [${rec.priority}] ${rec.text}`);
    });

    if (analysis.atsWarnings?.length) {
      addSectionTitle(doc, 'ATS Warnings');
      analysis.atsWarnings.forEach((warning) => doc.text(`- ${warning}`));
    }

    doc.end();
  });
}

module.exports = {
  generateAnalysisPdf,
};
