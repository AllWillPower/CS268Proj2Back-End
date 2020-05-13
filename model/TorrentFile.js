const mongoose = require('mongoose');

const torrentFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, 'filename is required'],
        unique: [true, 'filename already exists']
    }
});

module.exports = mongoose.model('TorrentFile', torrentFileSchema);