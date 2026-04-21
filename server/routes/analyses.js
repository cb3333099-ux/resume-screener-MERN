const express = require('express');
const Analysis = require('../models/Analysis');
const { createApiLimiter } = require('../middleware/rateLimiter');
const { isValidObjectId, saveAnalysisSchema } = require('../utils/validation');

const router = express.Router();
router.use(createApiLimiter(60_000, 50));

router.post('/', async (req, res, next) => {
  try {
    const parsed = saveAnalysisSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const saved = await Analysis.create(parsed.data);
    return res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 }).lean();
    return res.json(analyses);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid analysis id' });
    }

    const analysis = await Analysis.findById(req.params.id).lean();
    if (!analysis) return res.status(404).json({ message: 'Analysis not found' });
    return res.json(analysis);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid analysis id' });
    }

    const deleted = await Analysis.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Analysis not found' });
    return res.json({ message: 'Analysis deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
