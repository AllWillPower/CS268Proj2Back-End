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
app.use('/api/torrents', torrentRoute);

mongoose.connect(process.env.DB_CONNECT, 
    {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, 
).then(() => {
    console.log('Connected to DB');
}).catch((err) =>{
    console.error('Something went wrong', err);
});

let newTorrent = new Torrent({name: "test", author: "Eric", fileSize: "3.5GB", downloadPath: "https://ubuntu.com", distrobutionWebsite: "htts://ubuntu.com"});

newTorrent.save()
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.errors);
    });

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));