const mongoose = require('mongoose');
const suggestion = mongoose.connection.useDb('Suggestion');

const FollowSchema = new mongoose.Schema({
   mail: String,
});
const ReportSchema = new mongoose.Schema({
  mail: String,
  reporterEmail:String,
  reason:String,
  information:String


});


const CommentSchema = new mongoose.Schema({
    title:String,
  content: {
    type: String,
    
  },
  username: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: String,
  category:String,
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  follow: [FollowSchema],
  report: [ReportSchema]
});

// Add pre-save hook to update `updatedAt` on update
CommentSchema.pre('save', function(next) {
  // Check if there are any changes to fields other than 'follow'
  if (this.isModified('title') || this.isModified('content') || this.isModified('username') || this.isModified('profilePicture') || this.isModified('category')) {
    this.updatedAt = Date.now();
  }
  next();
});


const Commentdb = suggestion.model('Comment', CommentSchema);

module.exports = Commentdb;
