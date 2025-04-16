const mongoose = require('mongoose');

const BookThreadSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  url: { type: String, default: '' },
  image: { type: String, default: '' },
  tags: { type: [String], default: [] },
  stats: {
    followers: { type: String, default: '0' },
    rating: {
      overall: { type: String, default: '0' },
      style: { type: String, default: '' },
      story: { type: String, default: '' },
      grammar: { type: String, default: '' },
      character: { type: String, default: '' },
    },
    pages: { type: String, default: '0' },
    views: { type: String, default: '0' },
    chapters: { type: String, default: '0' },
    updatedDate: { type: Date, default: Date.now },
    reviewsCount: { type: Number, default: 0 },  // New field
    followersCount: { type: Number, default: 0 },  // New field
  },
  description: { type: String, default: '' },
  genres: { type: [String], default: [] },
  warnings: { type: [String], default: [] },
  ownershipProof: { type: Boolean, default: false },
  manualRelease: { type: Boolean, default: false },
  chapters: { type: [{ title: String, content: String, createdAt: { type: Date, default: Date.now } }], default: [] },
  author: { type: String, default: '' },
  synopsis: { type: String, default: '' }
  
});

module.exports = mongoose.model('BookThread', BookThreadSchema);
