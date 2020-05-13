const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Torrent = require('./model/Torrent');
const TorrentFile = require('./model/TorrentFile');
const torrentRoute = require('./routes/torrents');
const torrentFileRoute = require('./routes/torrentfiles');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/torrents', torrentRoute);
app.use('/api/torrentfiles', torrentFileRoute);

mongoose.connect(process.env.DB_CONNECT, 
    {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, 
).then(() => {
    console.log('Connected to DB');
}).catch((err) =>{
    console.error('Something went wrong', err);
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));