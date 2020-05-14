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
    filename: {
        type: String,
        required: [true, 'filename is required'],
        unique: [true, 'filename is already in use']
    },
    distrobution: {
        required: [true, 'distrobution is required'],
        distrobutionName: {
            type: String,
            required: [true, 'distrobution name is required']
        },
        distrobutionWebsite: {
            type: String,
            required: true,
            validate: [/^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+$/, 'Distrobution website must be of the format (http[s]://)(www.)url.com']
        }
    },
    fileSize: {
        type: Number,
        required: [true, 'File size is required']
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