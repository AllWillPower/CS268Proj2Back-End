const mongoose = require('mongoose');

const torrentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 4,
        maxlength: 50
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        minlength: 5,
        maxlength: 25
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: 10,
        maxlength: 200
    },
    downloadPath: {
        type: String,
        required: [true, 'Download link is required']
    },
    distrobution: {
        type: String,
        required: false,
        maxlength: 20,
        distrobutionWebsite: {
            type: String,
            required: true,
            validate: [/^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+$/, 'Distrobution website must be of the format (http[s]://)(www.)url.com']
        }
    },
    seeders: {
        type: Number,
        default: 0,
        minlength: 0
    },
    leechers: {
        type: Number,
        default: 0,
        minlength: 0
    },
    fileSize: {
        type: Number,
        required: [true, 'File size is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Torrent', torrentSchema);