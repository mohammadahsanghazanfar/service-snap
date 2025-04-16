const mongoose = require('mongoose');

const userDatabase = mongoose.connection.useDb('user_data');

var UserSchema = new mongoose.Schema({
  username:  String,
  email: {type:String ,  default: ''},
  password: String,
  city:String,
  status: {
    type: String,
    default: 'active'
  },
  cnic:String,
  field:String,
  phoneNumber:String,
  
  
  role:  String,
  area:String,

  googleId: {type:String ,  default: ''}
    
  //facebookID:{type:String ,  default: ''},

  //profilePicture: {type:String ,  default: ''}  ,
  //resetPasswordToken: {type:String ,  default: ''},
  //resetPasswordExpires: Date,
});

var Userdb = userDatabase.model('UserDB', UserSchema);


module.exports = Userdb;
