const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  
    field:String,
    serviceName:String,
    price:Number,
    des:String,
    image:String,
    
  
});

module.exports = mongoose.model('ServiceDB', ServicesSchema);