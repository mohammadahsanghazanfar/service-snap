const mongoose = require('mongoose');

const UserGoogleSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  profilePicture: String
});

module.exports = mongoose.model('UserGoogle', UserGoogleSchema);