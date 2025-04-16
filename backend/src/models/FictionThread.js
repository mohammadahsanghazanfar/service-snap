const mongoose = require('mongoose');

const fictionThreadSchema = new mongoose.Schema({
    title: String,
    description: String,
    topics: Number,
    posts: Number,
    note: String,
    lastPoster: String,
    lastActivityDate: String,
    avatarUrl: String
    
     
});

module.exports = mongoose.model('FictionThread', fictionThreadSchema, 'fictionthreads');
