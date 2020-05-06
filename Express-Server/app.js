const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Torrent = require('./model/Torrent');
const torrentRoute = require('./routes/torrents');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, res) => {
        if(err) throw err;
        console.log('Connected to DB');
    }
);