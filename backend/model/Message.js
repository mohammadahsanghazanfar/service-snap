const mongoose = require('mongoose');

const userDatabase = mongoose.connection.useDb('user_data');

const messageSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'trashcan'],  // Only allow 'draft' or 'sent' as valid statuses
    default: 'draft'           // Default to 'draft' when creating a new message
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false, // New field with default value
  },
});

const Message = userDatabase.model('Message', messageSchema);

module.exports = Message;