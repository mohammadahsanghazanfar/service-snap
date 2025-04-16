const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Userdb = require('../models/user'); // Update the path as needed
const Orderdb = require('../models/order')
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');


const JWT_SECRET='MynameisAhsan#'
const sendResetEmail = require('./nodemailer'); 





exports.forgotPassword = async (req, res) => {
  const  email  = req.body.email;
  try {
    
    const user = await Userdb.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email address.' });
    }

    // const token = crypto.randomBytes(32).toString('hex');
    // const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // user.resetPasswordToken = token;
    // user.resetPasswordExpires = resetTokenExpiry;
    // await user.save();

    // const resetURL = http://localhost:3000/reset-password/${token};
    // await sendResetEmail(email, resetURL);
   if(!user.password){
    return res.status(404).json({ message: 'No user found with this email address.' });
  }
  res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  } 
};


exports.resetPassword = async (req, res) => {
              const { email, password } = req.body;
  try {
   

    // Find user by email
    const user = await Userdb.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No user found with this email address.' });
    }

    // Hash the new password before saving it
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};




exports.create = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await Userdb.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User instance with the role set to "author" by default
    const user = new Userdb({
      username: req.body.username,
      email: req.body.email,
      password: secPassword,
      gender: req.body.gender,
      birthday: req.body.birthday,
      referrer: req.body.referrer,
      role: "author",
    });

    // Save the User instance to MongoDB
    const savedUser = await user.save();
    res.json({ success: true, message: 'User registered successfully' });

    console.log("Data saved:", savedUser);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send(error);
  }
};


  exports.findOne=async(req,res)=>{

    let email=req.body.email

    try{
         let userData=  await Userdb.findOne({email})
         if(!userData.email){
          return res.status(400).json({error:"Try logging with valid Credentials"})
         }
         const pwd =await bcrypt.compare(req.body.password,userData.password)
         if(!pwd){
          return res.status(400).json({error:"Try logging with valid Credentials"})
         }


         return res.json({success:true }) 
    }
    catch(error){
      console.error("Error saving data:", error);
      res.status(500).send(error);
    }
  }
  exports.find = async (req, res) => {
    try {
        const fetched_data = await mongoose.connection.db.collection("gofood");
        const dataArray = await fetched_data.find({}).toArray();
        res.json({success:true ,dataArray: dataArray})
        console.log(dataArray)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.order1 = async (req, res) => {
  let data = req.body.order_data;
  let email = req.body.email;
  
  // Add order_date to the beginning of the data array
  data.unshift({ order_date: req.body.order_date });

  try {
      // Use findOneAndUpdate directly to either create or update the order
      await Orderdb.findOneAndUpdate(
          { email },
          { $push: { order_data: { $each: data } } }, // Use $each to push multiple elements
          { upsert: true } // Creates the document if it doesn't exist
      );
      
      res.json({ success: true });
      console.log("Order saved/updated successfully.");
  } catch (err) {
      console.error("Error in order function:", err);
      res.status(500).json({ error: err.message });
  }
};

exports.changingData = async (req, res) => {
  try {
    // Extract the file and form data
    const { username, email } = req.body;
    const avatar = req.file.filename // Get the uploaded file path if available

    // Find the user by email and update the details
    const user = await Userdb.findOneAndUpdate(
      { email: email },
      { username: username, profilePicture: avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Send back the updated user data
    res.status(200).json({
      message: 'User details updated successfully',
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.SignUpData=async(req,res)=>{
   
   // Extract the file and form data
   try {
   const { username, email } = req.body;
   const avatar = req.file.filename // Get the uploaded file path if available

   // Find the user by email and update the details
   const user = await Userdb.findOneAndUpdate(
     { email: email },
     { username: username, profilePicture: avatar },
     { new: true, runValidators: true }
   );

   if (!user) {
     return res.status(404).send('User not found');
   }

   // Send back the updated user data
   res.status(200).json({
     message: 'User details updated successfully',
     user: {
       username: user.username,
       email: user.email,
       profilePicture: user.profilePicture
     }
   });
 } catch (error) {
   console.error('Error updating user:', error);
   res.status(500).send('Internal Server Error');
 }

}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Userdb.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Try logging in with valid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Try logging in with valid credentials" });
    }

    // Send the user data if authentication is successful
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      message: 'User data fetched successfully'
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

