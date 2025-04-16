const PopularThread = require('../models/PopularThread');
const CommunityThread = require('../models/CommunityThread');

exports.getPopularThreads = async (req, res) => {
  try {
    const threads = await PopularThread.find({});
    res.json(threads);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCommunityThreads = async (req, res) => {
  try {
    const threads = await CommunityThread.find({});
    res.json(threads);
  } catch (error) {
    res.status(500).send(error);
  }
};
