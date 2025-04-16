const mongoose = require('mongoose');
const userDatabase = mongoose.connection.useDb('user_data');

var UserSchema = new mongoose.Schema({
  username:  String,
  email: String,
  password: String,

  gender:String,
  birthday:  String,
    
  referrer:   String,
  
  role: {
    type: String,
    default: 'author'
  },  
  facebookID:String,
  googleId: String,
  profilePicture: String  ,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

var Userdb = userDatabase.model('UserDB', UserSchema);

module.exports = Userdb;
