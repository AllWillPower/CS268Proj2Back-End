const router = require('express').Router();
const TorrentFile = require('../model/TorrentFile');
const torrentfilesRoute = require('./torrentfiles');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: '../public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.filename);
    }
});

const upload = multer({
    storage: storage,
}).single('torrentFile');

router.post("api/torrentfile/upload", (req, res) => {
    if(!TorrentFile.find({filename: req.file.filename})){
        upload(req, res, async (err) => {
            if(!err){
                const result = await TorrentFile.create({filename: file.filename});
                res.status(200).send(result);
            }
        });
    } else{
        res.status(500).send({error: 'File already exists'});
    }
});

router.get("api/torrentfile/:filename", async (req, res) => {
    res.download('./public/uploads/' + req.params.filename);
});

module.exports = router;