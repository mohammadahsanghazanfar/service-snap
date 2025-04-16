const mongoose = require('mongoose');

const communityThreadSchema = new mongoose.Schema({
    title: String,
    description: String,
    topics: Number,
    posts: Number,
    note: String,
    lastPoster: String,
    lastActivityDate: String,
    avatarUrl: String
    
     
});

module.exports = mongoose.model('CommunityThread', communityThreadSchema, 'communitythreads');
