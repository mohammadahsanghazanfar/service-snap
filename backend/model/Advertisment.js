const mongoose = require('mongoose');
const test = mongoose.connection.useDb('test');
   

const add = new mongoose.Schema({
    

  id:String,
  title:String,
  image:String,
  link:String,
 
});

// Add pre-save hook to update `updatedAt` on update


const addDB = test.model('advertisment', add);

module.exports = addDB;
