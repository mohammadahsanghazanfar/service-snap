const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({

    title: { type: String, required: true,default: '' },
    author: { type: String, required: true ,default: ''},
    synopsis: { type: String, required: true ,default: ''},
    url: { type: String, required: true, default: '' },
    image: { type: String, required: true },
    genres: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    warnings: { type: [String], default: [] },
    ownershipProof: { type: Boolean, default: false },
    manualRelease: { type: Boolean, default: false },
    chapters: [{
        title: String,
        content: String,
        createdAt: { type: Date, default: Date.now }
    }],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    submittedDate: { type: Date, default: Date.now },
    note: { type: String, default: '' }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
