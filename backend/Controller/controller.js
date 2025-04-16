const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Userdb = require('../model/user'); // Update the path as needed
const Commentdb=require('../model/Comments')
const CommentBoxdb=require('../model/CommentsBox')
const ticketsDB=require('../model/Tckets')
const Order=require('../model/Orders')
const OrdersPlaced=require('../model/PlacedOrders')

const BookThread = require('../src/models/BookThread')
const UtmTag = require('../model/UtmTag');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const addDB=require('../model/Advertisment')
const { MongoClient } = require('mongodb');

const { v4: uuidv4 } = require('uuid');



const sendResetEmail = require('./nodemailer'); 
const PlacedOrders = require('../model/PlacedOrders');
  const bookDatabase = mongoose.connection.useDb('test');
  const userDatabase = mongoose.connection.useDb('user_data');





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

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
    }

    // Find the user by the decoded user ID
    const user = await Userdb.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    // If the user's email is already verified
    if (user.emailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified.' });
    }

    // Update the user's emailVerified field
    user.emailVerified = true;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ success: false, message: 'An error occurred while verifying email.' });
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
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new User instance with the role set to "author" by default
    const user = new Userdb({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      city: req.body.city,
      role: req.body.role,
      area: req.body.area,
      emailVerified: false, // Add this field if not already in your schema
    });

    // Save the User instance to MongoDB
    const savedUser = await user.save();

    // Commented out the email sending part
    /*
    // Generate a verification token
    const verificationToken = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Construct verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email`;

    // Send verification email
    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.TOKEN,
      })
    );

    await transport.sendMail({
      from: { address: 'hello@demomailtrap.com', name: 'ahsan' },
      to: savedUser.email,
      subject: 'Verify Your Email',
      html: `
        <h1>Welcome, ${savedUser.username}!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });
    */

    res.json({
      success: true,
      message: 'User registered successfully.',
      user: savedUser
    });

    console.log('User saved:', savedUser);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send(error);
  }
};

exports.workerOrders = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ success: false, message: 'Domain is required' });
    }

    // Find orders where at least one service has the given domain
    const matchingOrders = await Order.find({ 
      services: { $elemMatch: { domain: domain } }
    });

    res.json({ success: true, orders: matchingOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
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
    exports.checkOrder=async(req,res)=>{
        const email=req.body.email

        try {
           const check=await Order.findOne({email})
           if(check){
              res.json({success:true})
           }
           else {
            console.log("No order found, returning success: false");
            return res.json({ success: false });
        }
          
        }
        catch(error){
          res.status(500).json({ error: error.message });
         }
        }

        exports.pendingOrder=async(req,res)=>{
          const acceptorEmail= req.body.acceptorEmail

          try{
            const dataUser=await PlacedOrders.find({acceptorEmail})
            if(dataUser){
               res.json({success:true, userData:dataUser})
               
              }
            
               else {
                console.log("No order found, returning success: false");
                return res.json({ success: false });
            }
          }
            
            catch(error){
              res.status(500).json({ error: error.message });
             }
        }
      

          exports.allUsers=async(req,res)=>{
              
            try {
              const users = await Userdb.find(); // You can add filters if needed
              res.status(200).json(users);
            } catch (error) {
              console.error('Error fetching users:', error);
              res.status(500).json({ message: 'Server Error' });
            }
          }
          exports.blockUser1 = async (req, res) => {
            const { email } = req.body;
          
            try {
              const user = await Userdb.findOne({ email });
          
              if (!user) {
                return res.status(404).json({ error: 'User not found' });
              }
          
              console.log("Found user:", user.email, "Current status:", user.status);
          
              // Toggle status
              const newStatus = user.status === 'active' ? 'blocked' : 'active';
              user.status = newStatus;
          
              await user.save();
              console.log("Status updated to:", user.status);
          
              res.status(200).json({ status: user.status });
            } catch (error) {
              console.error('Error updating user status:', error);
              res.status(500).json({ error: 'Internal server error' });
            }
          };
          
          

          exports.patUser=async(req,res)=>{
            try {
              const { username } = req.body;
          
              if (!username) {
                return res.status(400).json({ error: 'Username is required' });
              }
          
              // Search users with username match (case-insensitive)
              const users = await Userdb.find({
                username: { $regex: new RegExp(`^${username}`, 'i') }
              });
          
              res.status(200).json(users);
            } catch (error) {
              console.error('Error fetching user:', error);
              res.status(500).json({ error: 'Server error' });
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
    const { email, field } = req.body;
    const cnicPath = req.file ? req.file.path : null; // Get the uploaded file path if available

    // Find the user by email and update the details
    const user = await Userdb.findOneAndUpdate(
      { email: email },
      { field: field, cnic: cnicPath }, // Save the file path in the database
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }


    // Send back the updated user data
    res.status(200).json({
      message: "User details updated successfully",
      user: user
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};


exports.addSubmission = async (req, res) => {
  try {
      const { title, genres, tags, warnings, ownershipProof, manualRelease, chapters, description, author, synopsis, image } = req.body;

      // Check if the fiction title already exists
      const existingTitle = await Submission.findOne({ title });
      if (existingTitle) {
        return res.status(409).json({ message: "This fiction title already exists, please choose a different title." });
      }
  
      // Parse JSON fields safely
      let parsedGenres, parsedTags, parsedWarnings, parsedChapters;
      try {
        parsedGenres = JSON.parse(genres);
        parsedTags = JSON.parse(tags);
        parsedWarnings = JSON.parse(warnings);
        parsedChapters = JSON.parse(chapters);
      } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format in one or more fields." });
      }

      const newSubmission = new Submission({
          title,
      url: title.toLowerCase().replace(/\s+/g, '-'),
      image, // Save the image path exactly as sent
      genres: parsedGenres,
      tags: parsedTags,
      warnings: parsedWarnings,
      ownershipProof: ownershipProof ,
      manualRelease: manualRelease ,
      chapters: parsedChapters,
      description,
      author,
      synopsis
      });

      await newSubmission.save();
      res.status(201).send('Fiction submitted successfully!');
  } catch (error) {
      console.error('Error submitting fiction:', error);
      res.status(500).send('Failed to submit fiction. Please try again.');
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
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    

    // Send user data in the response object
    res.json({
      user:user,
      message: 'User logged in successfully'
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  exports.cash=async(req,res)=>{
    try{
       // Create a new User instance with the role set to "author" by default
    const order = new Order({
      username: req.body.username,
      email: req.body.email,
      area: req.body.area,
      money:req.body.price,
      services:req.body.services,
      address:req.body.address,
      mobile:req.body.mobile,
      paymentMethod:req.body.paymentMethod
    });

     const saveOrder=order.save()
     res.json({
      success:'true',
      message:'Order placed Successfully',
      data:saveOrder
     })
    }
    catch(err){
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.acceptOrders=async(req,res)=>{
    try{
       // Create a new User instance with the role set to "author" by default
    const order = new OrdersPlaced({
      username:req.body.username,
      acceptor:req.body.acceptor,
      phoneNumber:req.body.phoneNumber,
      acceptorPhone:req.body.acceptorPhone,
      email:req.body.email,
     acceptorEmail:req.body.acceptorEmail,
      money:req.body.money,
     serviceName:req.body.serviceName,
      area:req.body.area,
                     
      address:req.body.address,
      paymentMethod:req.body.paymentMethod,
    });
    
                     

     const saveOrder=order.save()
     res.json({
      success:'true',
      message:'Order placed Successfully',
      data:saveOrder
     })
    }
    catch(err){
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.deleteOrders=async(req,res)=>{
    try {
      const { email, serviceName } = req.body;

      // Ensure both email and serviceName are provided
      if (!email || !serviceName) {
          return res.status(400).json({ error: 'Email and service name are required' });
      }

      // Use $pull to remove the service object with the specified name
      const updatedOrder = await Order.findOneAndUpdate(
          { email }, // Find order by email
          { $pull: { services: { name: serviceName } } }, // Remove service with the given name
          { new: true } // Return the updated document
      );

      if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ message: 'Service removed successfully', updatedOrder });
  } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  }

exports.findBooks=async(req,res)=>{




  // Define the Book model
  const Book = bookDatabase.collection('bookthreads'); 

const { title } = req.body; // Get title from request body

try {
  // Create a regex pattern to search for the title that contains any part of the query
  const regex = new RegExp(title, 'i'); // Case-insensitive regex

  // Fetch books where title matches the regex pattern
  const books = await Book.find({ title: { $regex: regex } }).toArray();

  res.json(books);
} catch (error) {
  console.error('Error fetching books:', error);
  res.status(500).json({ message: 'Server error' });
}
}

exports.idea=async(req,res)=>{
  
  const { email } = req.body;
  try {
    const user = await Userdb.findOne({ email }) // Fetch one user by email
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
}
  



exports.addOrUpdateComment = async (req, res) => {
  const { title, content, username, email, profilePicture, category } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    const filter = { email }; // Adjust filter based on your requirements
    const update = {
      title,
      content,
      username,
      email,
      profilePicture,
      category,
      updatedAt: Date.now()
    };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const updatedComment = await Commentdb.findOneAndUpdate(filter, update, options);
    
    res.status(200).json({ message: 'Comment added/updated successfully', comment: updatedComment });
  } catch (error) {
    console.error('Error adding or updating comment:', error);
    res.status(500).json({ message: 'Error adding or updating comment' });
  }
};

exports.loadCommments=async(req,res)=>{
  try {
    const comments = await Commentdb.find().sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
}
exports.loadComments2 = async (req, res) => {
  try {
    const { title } = req.body; // Extract the title from the request body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid input, please provide a title.' });
    }

    // Construct a regex pattern to match any word in the title from the request body
    const regexPattern = title.split(/\s+/).map(word => `\\b${word}\\b`).join('|');
    const regex = new RegExp(regexPattern, 'i'); // 'i' for case-insensitive

    // Query to match any of the words in the title
    const comments = await Commentdb.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

exports.commentBox=async(req,res)=>{
    const {id}=req.body
  try {
    const comments = await CommentBoxdb.find({ id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}

exports.comBox=async(req,res)=>{
  const { id, profilePicture, username, content } = req.body;
  
  try {
   

    // Create a new comment document
    const newComment = new CommentBoxdb({
      id,
      profilePicture,
      username,
      content,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Respond with the saved comment data
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: 'Failed to save comment' });
  }
 


}

exports.replyComment=async(req,res)=>{
  try {
    const { id, reply } = req.body;
    const result = await CommentBoxdb.findOneAndUpdate(
      { _id: id }, // Find the comment by ID
      { $push: { replies: reply } }, // Append the new reply to the replies array
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json(result); // Send back the updated comment
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error saving reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
} 
exports.findBookById = async (req, res) => {
  const Book = bookDatabase.collection('bookthreads'); // Define the Book model

  const  {title}  = req.body; // Get book ID from request body

  try {
    // Convert the ID string to an ObjectId
  

    // Fetch the book by its ID
    const book = await Book.findOne({title});

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.tickets=async(req,res)=>{

  try {
    const { email, ticket } = req.body;

    // Find the user by email and update their tickets array
    const updatedUser = await ticketsDB.findOneAndUpdate(
      { email: email },
      { $push: { ticket: ticket } }, // Push the new ticket into the array
      { new: true, upsert: true } // Create a new user document if it doesn't exist
    );

    if (updatedUser) {
      res.status(200).json({ comment: 'Ticket submitted successfully!' });
    } else {
      res.status(400).json({ error: 'Failed to submit the ticket' });
    }
  } catch (error) {
    console.error("Error saving ticket:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

exports.findTickets=async(req,res)=>{
  const { email } = req.body;
  try {
    

    // Find the user by email and return their tickets
    const userTickets = await ticketsDB.findOne({ email });

    if (userTickets) {
      res.status(200).json(userTickets.ticket); // Send back the tickets array
    } else {
      res.status(404).json({ error: 'No tickets found for this user' });
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: 'Internal server error' });
  }  

}
exports.token=async(req,res)=>{
  const { email } = req.body;
    
  try {
      const user = await Userdb.findOne({ email });

      if (user) {
          return res.json({  user });
      } else {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error });
  }
}

// Count suggestions
exports.countSuggestions = async (req, res) => {
  try {
    const count = await Commentdb.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting suggestions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count tickets
exports.countTickets = async (req, res) => {
  try {
    const count = await ticketsDB.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting tickets:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count fictions
exports.countFictions = async (req, res) => {
  try {
    const count = await BookThread.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting fictions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count users
exports.countUsers = async (req, res) => {
  try {
    const count = await Userdb.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Method to fetch recent suggestions and tickets
exports.getRecentSuggestions = async (req, res) => {
  try {
    const recentSuggestions = await Commentdb.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentSuggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentTickets = async (req, res) => {
  try {
    const recentTickets = await ticketsDB.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to delete tickets
exports.deleteTickets = async (req, res) => {
  const { ticketIds } = req.body; // Array of ticket IDs to delete

  if (!ticketIds || ticketIds.length === 0) {
      return res.status(400).json({ message: 'No tickets specified for deletion' });
  }

  try {
      await ticketsDB.deleteMany({
          '_id': { $in: ticketIds }
      });
      res.status(200).json({ message: 'Tickets deleted successfully' });
  } catch (error) {
      console.error("Error deleting tickets:", error);
      res.status(500).json({ message: 'Failed to delete tickets', error });
  }
};

// Function to delete suggestions
exports.deleteSuggestions = async (req, res) => {
  const { suggestionIds } = req.body; // Array of suggestion IDs to delete

  if (!suggestionIds || suggestionIds.length === 0) {
      return res.status(400).json({ message: 'No suggestions specified for deletion' });
  }

  try {
      await Commentdb.deleteMany({
          '_id': { $in: suggestionIds }
      });
      res.status(200).json({ message: 'Suggestions deleted successfully' });
  } catch (error) {
      console.error("Error deleting suggestions:", error);
      res.status(500).json({ message: 'Failed to delete suggestions', error });
  }
};
exports.deleteUsers = async (req, res) => {
  const { userIds } = req.body;
  
  if (!userIds || userIds.length === 0) {
    return res.status(400).json({ message: 'No users specified for deletion' });
  }

  try {
    await Userdb.deleteMany({
      '_id': { $in: userIds }
    });
    res.status(200).json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Failed to delete users', error });
  }
};


exports.getUsersByRole = async (req, res) => {
  const { role } = req.query;
  try {
      const users = await Userdb.find({ role: role });
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.blockUser = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Userdb.findOneAndUpdate({ email }, { status: 'blocked' }, { new: true });
      if (user) {
        console.log("userss"+user);
          res.json({ message: 'User blocked successfully', user });
      } else {
        console.log("erorrrrrrrr");
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.unblockUser = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Userdb.findOneAndUpdate({ email }, { status: 'active' }, { new: true });
      if (user) {
          console.log("userss"+user);
          res.json({ message: 'User unblocked successfully', user });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error unblocking user:', error);
      res.status(500).json({ error: 'Server error' });
  }
};


exports.addUser = async (req, res) => {
  try {
    const { username, password ,email, gender, role } = req.body;

    // Check if user already exists
    const existingUser = await Userdb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new Userdb({
      username,
      password,
      email,
      gender,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
     res.status(500).json({ message: 'Failed to add user', error });
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Extract id from URL parameters
  const { username, email, password, role, status } = req.body;

  try {
      const user = await Userdb.findByIdAndUpdate(id, {
          username,
          email,
          password,
          role,
          status,
      }, { new: true });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user', error });
  }
};


// Get all UTM tags
exports.getAllUtmTags = async (req, res) => {
  try {
      const utmTags = await UtmTag.find().sort({ createdAt: -1 });
      res.status(200).json(utmTags);
  } catch (error) {
      console.error('Error fetching UTM tags:', error);
      res.status(500).json({ message: 'Failed to fetch UTM tags', error });
  }
};

// Create a new UTM tag
exports.createUtmTag = async (req, res) => {
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

  try {
      const newUtmTag = new UtmTag({
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content
      });

      const savedUtmTag = await newUtmTag.save();
      res.status(201).json(savedUtmTag);
  } catch (error) {
      console.error('Error creating UTM tag:', error);
      res.status(500).json({ message: 'Failed to create UTM tag', error });
  }
};

// Delete a UTM tag by ID
exports.deleteUtmTag = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedUtmTag = await UtmTag.findByIdAndDelete(id);

      if (!deletedUtmTag) {
          return res.status(404).json({ message: 'UTM tag not found' });
      }

      res.status(200).json({ message: 'UTM tag deleted successfully' });
  } catch (error) {
      console.error('Error deleting UTM tag:', error);
      res.status(500).json({ message: 'Failed to delete UTM tag', error });
  }
};

exports.updateUtmTag = async (req, res) => {
  const { id } = req.params;
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

  try {
      const updatedTag = await UtmTag.findByIdAndUpdate(
          id,
          { utm_source, utm_medium, utm_campaign, utm_term, utm_content },
          { new: true, runValidators: true }
      );

      if (!updatedTag) {
          return res.status(404).json({ message: 'UTM Tag not found' });
      }

      res.status(200).json({ message: 'UTM Tag updated successfully', data: updatedTag });
  } catch (error) {
      console.error('Error updating UTM Tag:', error);
      res.status(500).json({ message: 'Failed to update UTM Tag', error });
  }
};

exports.advertisment=async(req,res)=>{   

  const { title, image } = req.body;

  try {
    // Ensure title and image are provided
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    // Check the total number of advertisements in the database
    const totalAds = await addDB.countDocuments();

    if (totalAds >= 4) {
      return res.status(400).json({ message: 'Cannot add more than 4 advertisements' });
    }

    // Find the last added advertisement to determine the next ID
    const lastAd = await addDB.findOne().sort({ _id: -1 });

    let newId;
    if (lastAd) {
      const lastIdNum = parseInt(lastAd.id.split('_')[1], 10);
      newId = `Ad_${lastIdNum + 1}`;
    } else {
      newId = 'Ad_1';
    }

    // Create a new advertisement
    const newAd = new addDB({ id: newId, title, image });
    await newAd.save();

    return res.json({ message: 'Advertisement created', ad: newAd });
  } catch (error) {
    console.error('Error handling advertisement', error);
    return res.status(500).json({ message: 'Server error' });
  }

  }

  exports.fetchAds=async(req,res)=>{
    try {
      // Fetch all advertisements from the database
      const ads = await addDB.find();
  
      // Respond with the advertisements
      res.status(200).json({ ads });
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  exports.updateAds=async(req,res)=>{
    const { id, title, image, link } = req.body;

    try {
      // Find the advertisement by title
      const ad = await addDB.findOne({ id });
  
      if (ad) {
        // Update the advertisement with new data
        ad.image = image;
        ad.title= title;
        ad.link= link;
  
        await ad.save(); // Save the updated advertisement
  
        res.status(200).json({ message: 'Advertisement updated successfully', ad });
      } else {
        res.status(404).json({ message: 'Advertisement not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  exports.showAdds = async (req, res) => {
    const { id } = req.body;
  
    try {
      // Adjust based on your model and schema
      // Assuming `addDB` has a method to find an ad by a different identifier
      const ad = await addDB.findOne({ id: id });
  
      if (ad) {
        res.status(200).json(ad);
      } else {
        res.status(404).json({ message: 'Advertisement not found' });
      }
    } catch (error) {
      console.error('Error fetching advertisement data:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.deleteAds=async(req,res)=>{
    const { key } = req.body;

  try {
    // Update the document by unsetting `title` and `image` fields
    const updatedAd = await addDB.findOneAndUpdate(
      { id: key }, // Find the document by key
      { $unset: { title: "", image: "", link: ""  } }, // Remove the title and image fields
      { new: true } // Return the updated document
    );

    if (updatedAd) {
      res.status(200).json({ message: "Title and image deleted successfully", ad: updatedAd });
    } else {
      res.status(404).json({ message: "Advertisement not found" });
    }
  } catch (error) {
    console.error("Error deleting advertisement:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  }
  exports.follow=async(req,res)=>{
    const { email, mail } = req.body;
    try {
      const comment = await Commentdb.findOne({ email });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const isFollowing = comment.follow.some(follow => follow.mail === mail);
      if (isFollowing) {
        comment.follow = comment.follow.filter(follow => follow.mail !== mail);
      } else {
        comment.follow.push({ mail });
      }
  
      await comment.save();
      res.status(200).json({ success: true, isFollowing: !isFollowing });
    } catch (error) {
      console.error('Error updating follow status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  
  
  }
  exports.followList=async(req,res)=>{
   
    const { mail , email } = req.body;

    try {
      // Assuming Commentdb contains follow arrays, where each follow has an email field
      const comment = await Commentdb.findOne({ email });
 

    if (!comment) {
      return res.status(404).json({ message: 'Follow list not found' });
    }

    // Filter the follow list by the provided email
    const followList = comment.follow.filter(follow => follow.mail === mail);

    if (followList.length === 0) {
      return res.status(404).json({ message: 'User not following' });
    }

    res.status(200).json({ success: true, followList, isFollowing: true });
  } catch (error) {
    console.error('Error checking follow status:', error);
    res.status(500).json({ message: 'Server error' });
  
  }
  
  }
  exports.sort=async(req,res)=>{
    try {
      const comments = await Commentdb.find().sort({ createdAt: -1 }); // Sort by createdAt descending
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }

  exports.report=async(req,res)=>{
    const { mail, reporterEmail, reason, information } = req.body;

    try {
      // Find the comment by the email (you can modify this to use another unique identifier)
      const comment = await Commentdb.findOne({ email: mail });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Add the report to the report array
      comment.report.push({
        mail,
        reporterEmail,
        reason,
        information,
      });
  
      // Save the updated comment
      await comment.save();
  
      res.status(200).json({ message: 'Report submitted successfully', comment });
    } catch (error) {
      console.error('Error submitting report:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  exports.message=async(req,res)=>{
    const Message = userDatabase.collection('messages');
    const { recipient } = req.body;

    try {
        // Fetching messages for the recipient, including 'message' field
        const messages = await Message.find({ recipient: recipient })
            .project({ subject: 1, sender: 1, message: 1, createdAt: 1 })  // Project relevant fields
            .sort({ createdAt: -1 })  // Sort by date in descending order
            .toArray();  // Convert cursor to array

        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }


  }
  exports.token1=async(req,res)=>{
    const { username } = req.body;
      
    try {
        const user = await Userdb.findOne({ username });
  
        if (user) {
            return res.json({  user });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
 