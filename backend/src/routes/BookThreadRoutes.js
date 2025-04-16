const express = require('express');
const router = express.Router();
const multer = require('multer');
const BookThreadController = require('../controllers/BookThreadController');
const { getBestRatedBooks } = require('../controllers/BookThreadController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

router.get('/bookthreads', getBestRatedBooks);
// router.post('/submit-fiction', BookThreadController.submitFiction);

router.post('/submit-fiction', upload.single('image'), BookThreadController.submitFiction);

router.get('/author-dashboard/:username', BookThreadController.getAuthorDashboard);


module.exports = router;
