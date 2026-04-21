const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    jobDescriptionText: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
