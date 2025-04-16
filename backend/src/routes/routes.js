


const express=require('express')
const router=express.Router()
const control=require('../controllers/controller')
const Userdb=require('../models/user')
const multer = require('multer');

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/api/createUser',control.create)
router.post('/api/login',control.login)
router.post('/account/externalloginconfirmation', upload.single('avatar'), control.changingData);
router.post('/api/forgot-password', control.forgotPassword);
router.post('/api/reset-password', control.resetPassword);


router.get('/api/users/:email', async (req, res) => {
   
  const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }
  
    try {
      const user = await Userdb.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
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
  });
  
  module.exports = router;
  

