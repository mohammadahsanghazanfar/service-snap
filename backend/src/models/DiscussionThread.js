const mongoose = require('mongoose');

const discussionThreadSchema = new mongoose.Schema({
    title: String,
    description: String,
    topics: Number,
    posts: Number,
    note: String,
    lastPoster: String,
    lastActivityDate: String,
    avatarUrl: String
    
     
});

module.exports = mongoose.model('DiscussionThread', discussionThreadSchema, 'discussionthreads');
