const Submission = require('../models/Submission');
const multer = require('multer');
const path = require('path');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/')); // Ensure the directory exists and is writable
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findByIdAndUpdate(
            id,
            { status: 'Approved', note: '' },
            { new: true }
        );
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const submission = await Submission.findByIdAndUpdate(
            id,
            { status: 'Rejected', note },
            { new: true }
        );
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

exports.getSubmissionsByAuthor = async (req, res) => {
    try {
        const { username } = req.params;
        const submissions = await Submission.find({ author: username });
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this author.' });
        }
        res.json(submissions);
    } catch (error) {
        console.error('Failed to fetch submissions:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// exports.submitFiction = async (req, res) => {
//     try {
//       const { title, genres, tags, warnings, ownershipProof, manualRelease, chapters, description, author, synopsis, image } = req.body;
  
//       // Check if the fiction title already exists
//       const existingTitle = await Submission.findOne({ title });
//       if (existingTitle) {
//         return res.status(409).json({ message: "This fiction title already exists, please choose a different title." });
//       }
  
//       // Parse JSON fields safely
//       let parsedGenres, parsedTags, parsedWarnings, parsedChapters;
//       try {
//         parsedGenres = JSON.parse(genres);
//         parsedTags = JSON.parse(tags);
//         parsedWarnings = JSON.parse(warnings);
//         parsedChapters = JSON.parse(chapters);
//       } catch (error) {
//         return res.status(400).json({ error: "Invalid JSON format in one or more fields." });
//       }
  
//       // Create a new Submission instance
//       const newFiction = new Submission({
//         title,
//         url: title.toLowerCase().replace(/\s+/g, '-'),
//         image, // Save the image path exactly as sent
//         genres: parsedGenres,
//         tags: parsedTags,
//         warnings: parsedWarnings,
//         ownershipProof: ownershipProof === 'true',
//         manualRelease: manualRelease === 'true',
//         chapters: parsedChapters,
//         description,
//         author,
//         synopsis
//       });
  
//       // Save the new fiction to the database
//       await newFiction.save();
//       res.status(201).json({ message: "Fiction submitted successfully!" });
//     } catch (error) {
//       console.error('Error submitting fiction:', error);
//       res.status(500).json({ error: error.message });
//     }
//   };
  