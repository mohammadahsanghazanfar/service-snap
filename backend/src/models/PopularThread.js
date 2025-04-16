const mongoose = require('mongoose');

const popularThreadSchema = new mongoose.Schema({
    title: String,
    replies: Number,
    views: Number,
    author: String,
    date: String,
    lastPoster: String,
    lastPostDate: String,
    
    avatarUrl: String
   
});

module.exports = mongoose.model('PopularThread', popularThreadSchema, 'popularthreads');
