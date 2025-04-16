const mongoose = require('mongoose');
const suggestion = mongoose.connection.useDb('Suggestion');

const ReplySchema = new mongoose.Schema({
  profilePicture: String,
  username: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
  },
  username: {
    type: String,
  },
  id: String,
  profilePicture: String,
  replies: [ReplySchema], // Array to hold replies
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});


// Add pre-save hook to update `updatedAt` on update
CommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CommentBoxdb = suggestion.model('CommentBox', CommentSchema);

module.exports = CommentBoxdb;