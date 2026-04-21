const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analyzeController');
const { createApiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
router.use(createApiLimiter(60_000, 30));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      const error = new Error('Only PDF files are allowed');
      error.statusCode = 400;
      return cb(error);
    }
    return cb(null, true);
  },
});

router.post('/', upload.single('resumePdf'), analyzeResume);

module.exports = router;
