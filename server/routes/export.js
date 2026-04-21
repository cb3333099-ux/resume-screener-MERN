const express = require('express');
const { exportAnalysisPdf } = require('../controllers/exportController');

const router = express.Router();

router.post('/pdf', exportAnalysisPdf);

module.exports = router;
