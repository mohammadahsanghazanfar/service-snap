const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  
    field:String,
    price:Number,
    des:String,
    img:String,
  
});

module.exports = mongoose.model('ServiceDB', ServicesSchema);