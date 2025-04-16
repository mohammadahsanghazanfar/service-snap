const mongoose = require('mongoose');
const suggestion = mongoose.connection.useDb('Suggestion');
   
const ReplySchema = new mongoose.Schema({
   
      username: {
        type: String,
       
      },
    subject: String,
    browser:String,
    category:String,
    javascript:String,
    extensions:String,
    message:String,
    status: {
      type: String,
      default: 'pending'
    },  
  
   
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  });
const CommentSchema = new mongoose.Schema({
    

  email: {
    type: String,
    required: true,
  },
  ticket:[ReplySchema]
 
});

// Add pre-save hook to update `updatedAt` on update
CommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ticketsDB = suggestion.model('tickets', CommentSchema);

module.exports = ticketsDB;
