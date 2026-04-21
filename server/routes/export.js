const express = require('express');
const { exportAnalysisPdf } = require('../controllers/exportController');
const { createApiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
router.use(createApiLimiter(60_000, 20));

router.post('/pdf', exportAnalysisPdf);

module.exports = router;
