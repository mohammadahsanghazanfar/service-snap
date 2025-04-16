require('dotenv').config();
const mongoose = require('mongoose');

   const connectDB = async () => {
               
    try {
    
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected');
        return con;
        
       } 
    catch (err)
    
    {
      
      console.error(err.message);
      process.exit(1);
      } 
   };

module.exports = connectDB;

