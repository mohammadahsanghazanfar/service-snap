const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   
  username:String,
  email:String,
  money:Number,
  services: [{
  
    serviceName:String,
    des:String,
    price:Number, 
    domain:String, // This allows services to contain any object or primitive type
  }],
  area:String,
  
  address:String,
  mobile: String,
  paymentMethod:String
});

module.exports = mongoose.model('OrdersDB', OrderSchema);