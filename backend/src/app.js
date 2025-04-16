const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const threadRoutes = require('./routes/ForumThreadRoutes');  // Adjust the path as necessary
const bookThreadRoutes = require('./routes/BookThreadRoutes');

const session = require('express-session');
const path = require('path');
const passport = require('../Controller/Oauth'); // Import the passport configuration
// const Books = require('../model/BookThread');
const Review = require('../model/reviews');
const submissionRoutes = require('./routes/submissionRoutes');



// FOR DATA INSERTION INTO THE TABLES:
// const PopularThread = require('./models/PopularThread'); // Adjust path as necessary
// const CommunityThread = require('./models/CommunityThread'); // Adjust path as necessary
// const FictionThread = require('./models/FictionThread'); 
// const DiscussionThread = require('./models/DiscussionThread'); 
// const ForumThread = require('./models/ForumThread'); 
// const RecentThread = require('./models/RecentThreads'); 
// const MembersThread = require('./models/MembersThread'); 
const BookThread = require('./models/BookThread'); // Ensure the path is correct
const Book = require('./models/books');
const Submission = require('./models/Submission'); // Import the Submission model

/////////
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
  secret: '1234asas',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
    // Start the server only after the database is connected
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });



// const insertDummyData = async () => {
//     const dummyData = [
//         { username: "author1", title: "Fiction One", status: "Pending", submittedDate: new Date("2023-08-01") },
//         { username: "author2", title: "Fiction Two", status: "Pending", submittedDate: new Date("2023-07-22") },
//         { username: "author3", title: "Fiction Three", status: "Rejected", submittedDate: new Date("2023-06-15"), note: "Grammar issues in the first few chapters." },
//         { username: "author4", title: "Fiction four", status: "Pending", submittedDate: new Date("2023-08-01") },
//         { username: "author5", title: "Fiction five", status: "Pending", submittedDate: new Date("2023-07-22") },
//     ];

//     try {
//         await Submission.insertMany(dummyData);
//         console.log('Dummy data inserted successfully');
//     } catch (error) {
//         console.error('Error inserting dummy data:', error);
//     }
// };

// // Uncomment to insert dummy data
//  insertDummyData();



// Routes
app.get('/', (req, res) => {
  res.send('Welcome to RU-novel API');
});


app.get('/api/hello', (req, res) => {
  res.send('Hello World from the backend!');
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await BookThread.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    // console.log(`Fetching book with ID: ${req.params.id}`);
    const book = await BookThread.findById(req.params.id);
    if (!book) {
      console.log(`Book with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }
    // console.log("Book fetched successfully:", book);
    res.json(book);
  } catch (err) {
    console.error('Error occurred while fetching book:', err);
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/reviews', async (req, res) => {
  const { bookName } = req.query;

  try {
    const query = bookName ? { bookName: bookName } : {};
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { title, text, rating, datetime, user, profilepic, bookName } = req.body;

  try {
    const newReview = new Review({
      title,
      text,
      rating: {
        overall: rating.overall,
        style: rating.style,
        story: rating.story,
        grammar: rating.grammar,
        character: rating.character
      },
      datetime: datetime || new Date(),
      user,
      profilepic,
      bookName // Store bookName
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: err.message });
  }
});
app.get('/api/books/:fictionId/chapters/:chapterId', async (req, res) => {
  const { fictionId, chapterId } = req.params;

  try {
    // Fetch the book thread document by fictionId
    const book = await BookThread.findById(fictionId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the specific chapter within the book's chapters array
    const chapter = book.chapters.find(ch => ch._id.toString() === chapterId);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Return the chapter along with some additional book information
    res.json({
      ...chapter.toObject(),
      fictionTitle: book.title,
      authorName: book.author,
      authorId: book.authorId,  // Assuming this field exists in your BookThread schema
      fictionId: book._id,
      bannerImage: book.image // Assuming the banner image is the same as the book's image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/current-user', (req, res) => {
  console.log('Session:', req.session); // Log session data
  console.log('Authenticated user:', req.user); // Log the user data
  
  if (req.isAuthenticated()) {
    const user = {
      username: req.user.username,
      profilePicture: req.user.profilePicture,
      email: req.user.email
    };
    res.json(user);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const userEmail = req.user.user.email;
    if (req.user.isNewUser) {
      res.redirect(`http://localhost:3000?email=${encodeURIComponent(userEmail)}`);
    } else  {
      res.redirect(`http://localhost:3000?email=${encodeURIComponent(userEmail)}`);
      
    }
    
  }
);

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email','profile'] })
);

console.log('Client ID:', process.env.clientID);
console.log('Client Secret:', process.env.clientSecret);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/error' // Redirects if authentication fails
  }),
  (req, res) => {
    const userEmail = req.user.user.email; // Extract the email from req.user

    if (!userEmail) {
      // Redirect to an error page if the email is missing
      return res.redirect('http://localhost:3000/error');
    }

    // Handle redirection based on whether the user is new or returning
    if (req.user.isNewUser) {
      res.redirect(`http://localhost:3000/facebook/account?email=${encodeURIComponent(userEmail)}`);
    } else {
      res.redirect(`http://localhost:3000?name=${encodeURIComponent(userEmail)}`);
    }
  }
);
const Comment = require('../model/chaptercomments'); // Assuming the model is in the 'models' directory

app.get('/api/load/comment', async (req, res) => {
  try {
    const comments = await Comment.find(); // This will fetch all comments
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

app.use('/api', threadRoutes);
app.use('/api', bookThreadRoutes);
app.use('/api', submissionRoutes);
app.use('/', require('../router/routes'));

// const insertData = async () => {
//   try {
//     // Define book data
//     const bookData = {
//       title: "Super Supportive",
//       url: "/fiction/63759/super-supportive",
//       coverImage: "https://www.royalroadcdn.com/public/covers-large/63759-super-supportive.jpg?time=1691780497",
//       tags: ["Original", "LitRPG", "Progression", "Super Heroes", "Psychological", "Male Lead", "Adventure", "Fantasy", "Sci-fi", "First Contact", "Low Fantasy", "Magic", "School Life", "Slice of Life"],
//       stats: {
//           followers: "25,939",
//           rating: 3.84,
//           pages: "3,097",
//           views: "13,998,913",
//           chapters: "163",
//           updatedDate: "August 11, 2024"
//       },
//       description: "Readers can expect: slice of life, darkness, slice of life, comedy, slice of life, action, character focus, and tons of world building on multiple worlds. I like danger and also alien beverage etiquette. This story is about: a teenager named Alden growing up and finding his place in a universe with Systems, superheroes, and alien wizards. Super Supportive will be very, very long. The burn will be slow, and, I hope, better for it. Everyone wants superpowers, including Alden Thorn. But even if he's lucky enough to be one of the few humans granted magical abilities by the extraterrestrial System that's been running things on Earth for decades, his goal of being a battlefield support hero is still a long way off. He's got determination on his side and maybe a murderous alien desk clerk, too. The universe is a complicated place. Alden's about to meet it. I started writing this because I wanted to read a character-oriented superhero origin story every step of the way from the very beginning. And I also wanted to write as thoughtfully as I could about a System and aliens. It's grown from my initial vision, and it continues to grow. But the core remains the same. If you decide to come along for the ride, thank you!  I'm having a lot of fun here. I hope you will, too. ** This story has stats, but they don't appear in the early chapters. **Violence and darkness are present. Updates: Usually on Sundays and Wednesdays (Pacific Time Zone). I'm currently taking a couple of posting days off/month to give me more writing time per chapter and maintain quality."
//   };
  
//     // Create a new BookThread instance with the defined data
//     const bookThread = new BookThread(bookData);

//     // Save the new book thread to the database
//     await bookThread.save();

//     console.log('Book data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting book data:', error);
//   }
// };

// // Call the function to execute insertion
// insertData();
// const insertData = async () => {
//   try {
//     // Define avatar URLs for random assignment
//     const avatarURLs = [
//       'https://www.royalroadcdn.com/public/avatars/avatar-2-AADAeQUxBBU.png?time=1712665249',
//       'https://www.royalroadcdn.com/public/avatars/avatar-1057-AACAroJMTRM.png?time=1683211664',
//       'https://www.royalroadcdn.com/public/avatars/avatar-261647-AACAPYxZNRQ.png?time=1698784338',
//       'https://www.royalroadcdn.com/public/avatars/avatar-19990.jpg',
//       'https://www.royalroad.com/dist/img/anon.jpg'
//     ];

//     // Array to hold dummy member data
//     const data = Array.from({ length: 20 }, (_, index) => ({
//       username: `User${index}`,
//       role: index % 3 === 0 ? 'staff' : 'member',
//       avatarURL: avatarURLs[Math.floor(Math.random() * avatarURLs.length)],
//       joined: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleString(),
//       lastVisit: `${Math.floor(Math.random() * 24)} hours ago`,
//       fictions: Math.floor(Math.random() * 10),
//       posts: Math.floor(Math.random() * 5000),
//       level: Math.floor(Math.random() * 30) + 1
//     }));

//     for (const item of data) {
//       const membersThread = new MembersThread(item);
//       await membersThread.save();
//     }

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// };

// insertData();


// const insertData = async () => {
//   try {
//     const data = [
      
//       {
//         title: "The weight of 10k views",
//         author: "FauxPraetor",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Help remembering a book",
//         author: "Bigsexyman84",
//         profileUrl: "https://www.google.com",
//         novelName: "I forgot the title...",
//         createdAt: new Date(),
//       },
//       {
//         title: "Ever Wonder What Happened To John Brown? Well, this is it. *NOT MY STORY*",
//         author: "The Commentator",
//         profileUrl: "https://www.google.com",
//         novelName: "Marketing",
//         createdAt: new Date(),
//       },
//       {
//         title: "5 favorites on TCBS",
//         author: "Firniel",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "100 Favourites",
//         author: "Shocker",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Book 3 Complete, Book 1 Edit complete. Big scotch time.",
//         author: "AbnormalVAverage",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Help Me! Heroes Are Trying To Make Me",
//         author: "PheonixOfficial",
//         profileUrl: "https://www.google.com",
//         novelName: "Promt you fiction",
//         createdAt: new Date(),
//       },
//       {
//         title: "Been gone for a few years, how's RR?",
//         author: "Kamikoto",
//         profileUrl: "https://www.google.com",
//         novelName: "General",
//         createdAt: new Date(),
//       },
//     ];

//     for (const item of data) {
//       const recentThread = new RecentThread(item);
//       await recentThread.save();
//     }

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// };

// insertData();


// Define routes here
// const insertData = async () => {
//   try {
//     // // Inserting into PopularThreads
//     // const popularThread = new PopularThread({
//     //   title: "Marketing: Welcome to The Tavern. All MCs welcome! Come, have a drink.",
//     //   replies: 3440,
//     //   views: 42830,
//     //   author: "Mekanip",
//     //   date: new Date("2024-01-28T21:53:00Z"),
//     //   lastPoster: "Fluffy Marshmallow",
//     //   lastPostDate: new Date("2024-08-03T21:49:00Z"),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await popularThread.save();

//     // // Inserting into CommunityThreads
//     // const communityThread = new CommunityThread({
//     //   title: "Celebration",
//     //   description: "Something great just happened to you on Royal Road and you want to share it? do it here! YAY!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Thoughts on Ai novels",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await communityThread.save();

//     // const fictionThread = new FictionThread({
//     //   title: "Art",
//     //   description: "Submit your Art; Drawings, carvings, comics, poems... as long as it is art, and you wish to show it, this is the place!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Thoughts on Ai novels",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await fictionThread.save();
//     // const discussionThread = new DiscussionThread({
//     //   title: "Guides by the Community",
//     //   description: "",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Mastering AI-Directed Writing: The Ultimate Comprehensive Guide",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await discussionThread.save();
//     //   const forumThread = new ForumThread({
//     //   title: "Games",
//     //   description: "A special corner to talk about games or gaming!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Assiciations",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await forumThread.save();
//     const recentThread = new RecentThread({
//       title: "Review Swap: 3 Chapters. [1/1]",
//       author: "Merlin Pendragon",
//       profileUrl: "https://www.royalroad.com/profile/481525",
//       novelName: "Review Swaps",
//       createdAt:new Date(),
//       });
//       await recentThread.save();

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } 
// };

// insertData();