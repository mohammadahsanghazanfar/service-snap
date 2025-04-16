const mongoose = require('mongoose');

const OrderPlacedSchema = new mongoose.Schema({
   
  username:String,
  acceptor:String,
  phoneNumber:String,
  acceptorPhone:String,
  email:String,
  acceptorEmail:String,
  money:Number,
  serviceName:String,
  area:String,
  
  address:String,
  paymentMethod:String
});

module.exports = mongoose.model('OrderPlacedDB', OrderPlacedSchema);