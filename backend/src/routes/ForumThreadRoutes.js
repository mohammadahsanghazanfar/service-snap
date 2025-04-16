const express = require('express');
const router = express.Router();
const PopularThread = require('../models/PopularThread');
const CommunityThread = require('../models/CommunityThread');
const FictionThread = require('../models/FictionThread');
const DiscussionThread = require('../models/DiscussionThread');
const ForumThread = require('../models/ForumThread');
const RecentThread = require('../models/RecentThreads');
const MembersThread = require('../models/MembersThread');

// Fetch all popular threads
router.get('/popularthreads', async (req, res) => {
    try {
        const threads = await PopularThread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch all community threads
router.get('/communitythreads', async (req, res) => {
    try {
        const threads = await CommunityThread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/fictionthreads', async (req, res) => {
    try {
        const threads = await FictionThread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/discussionthreads', async (req, res) => {
    try {
        const threads = await DiscussionThread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/forumthreads', async (req, res) => {
    try {
        const threads = await ForumThread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/recent-threads', async (req, res) => {
    try {
        // const threads = await RecentThread.find();
        // res.json(threads);
        const recentThreads = await RecentThread.find().sort({ createdAt: -1 }).limit(7);
        res.json(recentThreads);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recent threads', error });
      }
});

router.get('/members', async (req, res) => {
    try {
      const members = await MembersThread.find().sort({ joined: -1 }).limit(20);
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
