const mongoose = require('mongoose');

const recentThreadSchema = new mongoose.Schema({
    title: String,
    author: String,
    profileUrl: String,
    novelName: String,
    createdAt: Date,
        
});

module.exports = mongoose.model('RecentThread', recentThreadSchema, 'recentthreads');
