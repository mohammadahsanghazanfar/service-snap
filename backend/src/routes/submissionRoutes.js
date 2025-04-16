const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/SubmissionController');
const multer = require('multer');
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

router.get('/submissions', SubmissionController.getAllSubmissions);
router.post('/submissions/approve/:id', SubmissionController.approveSubmission);
router.post('/submissions/reject/:id', SubmissionController.rejectSubmission);
router.post('/submissions/add', upload.single('image'), SubmissionController.addSubmission);
router.get('/submissions/author/:username', SubmissionController.getSubmissionsByAuthor);

module.exports = router;
