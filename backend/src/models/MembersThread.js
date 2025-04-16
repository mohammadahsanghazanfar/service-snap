const mongoose = require('mongoose');

const membersThreadSchema = new mongoose.Schema({
    username: String,
    role: String,
    avatarURL: String,
    joined: String,
    lastVisit: String,
    fictions: Number,
    posts: Number,
    level: Number,
   
});

module.exports = mongoose.model('MembersThread', membersThreadSchema, 'membersthreads');
