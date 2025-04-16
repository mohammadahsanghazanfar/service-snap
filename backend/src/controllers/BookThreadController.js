const BookThread = require('../models/BookThread');
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
exports.upload = upload;

exports.getBestRatedBooks = async (req, res) => {
  try {
    const books = await BookThread.find({});
    if (!books.length) {
      return res.status(404).json({ success: false, message: 'No books found' });
    }
    const shuffledBooks = shuffleArray(books); // Shuffle the array of books
    res.status(200).json({ success: true, data: shuffledBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// exports.getBestRatedBooks = async (req, res) => {
//   try {
//     const books = await BookThread.find({ 'stats.rating.overall': { $gte: 4 } });
//     if (!books.length) {
//       return res.status(404).json({ success: false, message: 'No books found' });
//     }
//     const shuffledBooks = shuffleArray(books); // Shuffle the array of books
//     res.status(200).json({ success: true, data: shuffledBooks });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookThread.find({}); // Fetch all books without any filter
    if (!books.length) {
      return res.status(404).json({ success: false, message: 'No books found' });
    }
    const shuffledBooks = shuffleArray(books); // Optionally shuffle the array of books if needed
    res.status(200).json({ success: true, data: shuffledBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.submitFiction = async (req, res) => {
  try {
    const { title, genres, tags, warnings, ownershipProof, manualRelease, chapters, description, author, synopsis, image } = req.body;

    // Check if the fiction title already exists
    const existingTitle = await BookThread.findOne({ title });
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

    // Create a new BookThread instance
    const newFiction = new BookThread({
      title,
      url: title.toLowerCase().replace(/\s+/g, '-'),
      image, // Save the image path exactly as sent
      genres: parsedGenres,
      tags: parsedTags,
      warnings: parsedWarnings,
      ownershipProof: ownershipProof === 'true',
      manualRelease: manualRelease === 'true',
      chapters: parsedChapters,
      description,
      author,
      synopsis
    });

    // Save the new fiction to the database
    await newFiction.save();
    res.status(201).json({ message: "Fiction submitted successfully!" });
  } catch (error) {
    console.error('Error submitting fiction:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAuthorDashboard = async (req, res) => {
  const { username } = req.params;
  try {
      const books = await BookThread.find({ author: username });
      if (!books.length) {
          return res.status(404).json({ success: false, message: 'No books found for this author' });
      }

      // Aggregate data calculation (this is a simple way, you might want to optimize or adjust based on exact needs)
      let totalChapters = 0, totalWords = 0;
      books.forEach(book => {
          totalChapters += book.chapters.length;
          book.chapters.forEach(chapter => {
              totalWords += chapter.content.split(' ').length; // Simple word count
          });
      });

      const data = {
          fictionsCount: books.length,
          totalChapters,
          totalWords,
          reviewsCount: books.reduce((acc, book) => acc + book.stats.reviewsCount, 0),
          followersCount: books.reduce((acc, book) => acc + book.stats.followersCount, 0)
      };

      res.status(200).json({ success: true, data });
  } catch (error) {
      console.error('Error fetching author dashboard data:', error);
      res.status(500).json({ success: false, error: error.message });
  }
};
