


const express=require('express')
const router=express.Router()
const control=require('../Controller/controller')
const Userdb=require('../model/user')
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
router.post('/api/cashOrder',control.cash)
router.post('/api/checkOrder',control.checkOrder)
router.post('/api/login',control.login)
router.post('/verify-email',control.verifyEmail)
router.post('/allOrders',control.workerOrders)
router.post('/acceptOrders',control.acceptOrders)
router.post('/deleteOrders',control.deleteOrders)
router.post('/pendingOrder',control.pendingOrder)
router.get('/allUsers',control.allUsers)
router.get('/allOrders',control.getOrders)
router.post('/particularUser',control.patUser)
router.put('/blockUser',control.blockUser1)
router.post('/api/getService',control.getService)
router.post('/api/adminApproval',control.adminApproval)
router.delete('/api/rejectOrder',control.rejectOrder)
router.post('/api/particularOrder',control.particularOrder)

router.post('/account/externalloginconfirmation', upload.single('cnic'), control.changingData);
router.post('/api/add/services', upload.single('image'), control.manualService);


// router.post('//add', upload.single('image'), control.addSubmission);

//router.post('/account/externalloginconfirmation', upload.single('image'), control.changingData);
router.post('/api/forgot-password', control.forgotPassword);
router.post('/api/reset-password', control.resetPassword);
router.post('/api/books', control.findBooks);
router.post('/api/idea', control.idea);
router.post('/api/newIdea', control.addOrUpdateComment); 
router.get('/api/load/comments', control.loadCommments); 
router.post('/api/comment/box',control.commentBox)
router.post('/api/comment/save',control.comBox)
router.post('/api/reply',control.replyComment)
router.post('/api/bookOne',control.findBookById)
router.post('/api/ticket',control.tickets)
router.post('/api/find/ticket',control.findTickets)
router.post('/api/load/search',control.loadComments2)
router.post('/api/token',control.token)
router.post('/api/advertisment',control.advertisment)
router.get('/api/ads',control.fetchAds)
router.put('/api/update/ads',control.updateAds)
router.post('/api/ado',control.showAdds)
router.put('/api/delete/ads',control.deleteAds)
router.post('/api/comments/follow',control.follow)
router.post('/api/comments/followlist',control.followList)
router.get('/api/top', control.sort); 
router.post('/api/report',control.report)
router.post('/api/header/messages',control.message)
router.post('/api/token1',control.token1)



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
           user:user
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/api/userss/:email', async (req, res) => {
    try {
      const user = await Userdb.findOne({ email: req.params.email });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update user data
router.post('/api/users/:email', async (req, res) => {
  try {
    const updatedUser = await Userdb.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/count/suggestions', control.countSuggestions);
router.get('/api/count/tickets', control.countTickets);
router.get('/api/count/fictions', control.countFictions);
router.get('/api/count/users', control.countUsers);
router.get('/api/load/recent/suggestions', control.getRecentSuggestions);
router.get('/api/load/recent/tickets', control.getRecentTickets);

// Route to delete tickets
router.post('/api/delete/tickets', control.deleteTickets);

// Route to delete suggestions
router.post('/api/delete/suggestions', control.deleteSuggestions);

// Fetch users by role
router.get('/api/users', control.getUsersByRole);

// Block user
router.post('/api/block-users', control.blockUser);

// Unblock user
router.post('/api/unblock-users', control.unblockUser);
router.post('/api/add-users', control.addUser);


// Delete users
router.post('/api/delete-users', control.deleteUsers);

router.put('/api/update-userinfo/:id', control.updateUser);

  // Route to get all UTM tags
router.get('/api/utm-tags', control.getAllUtmTags);

// Route to create a new UTM tag
router.post('/api/utm-tags', control.createUtmTag);

// Route to delete a UTM tag by ID
router.delete('/api/utm-tags/:id', control.deleteUtmTag);

// Update an existing UTM tag by ID
router.put('/api/utm-tags/:id', control.updateUtmTag);


  module.exports = router;
  

