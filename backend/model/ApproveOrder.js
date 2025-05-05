const mongoose = require('mongoose');

const ApproveOrderSchema = new mongoose.Schema({
   
  username:String,
  email:String,
  money:Number,
  serviceName:String,
  servicedes:String,
  location:String,
  cell:String,
  address:String,
  
});

module.exports = mongoose.model('ApproveOrdersDB', ApproveOrderSchema);