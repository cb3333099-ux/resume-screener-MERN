const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analyzeController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/', upload.single('resumePdf'), analyzeResume);

module.exports = router;
