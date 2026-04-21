const express = require('express');
const Bookmark = require('../models/Bookmark');
const { bookmarkSchema } = require('../utils/validation');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const parsed = bookmarkSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const saved = await Bookmark.create(parsed.data);
    return res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 }).lean();
    return res.json(bookmarks);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Bookmark.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Bookmark not found' });
    return res.json({ message: 'Bookmark deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
