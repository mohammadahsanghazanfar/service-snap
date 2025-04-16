// models/UtmTag.js
const mongoose = require('mongoose');

const UtmTagSchema = new mongoose.Schema({
    utm_source: { type: String, required: true },
    utm_medium: { type: String, required: true },
    utm_campaign: { type: String, required: true },
    utm_term: { type: String },
    utm_content: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UtmTag', UtmTagSchema);
