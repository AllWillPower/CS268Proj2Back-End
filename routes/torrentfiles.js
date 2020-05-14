const router = require('express').Router();
const TorrentFile = require('../model/TorrentFile');
const torrentfilesRoute = require('./torrentfiles');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        TorrentFile.findOne({filename: file.originalname}, (err, torrentfile) => {
            if(!torrentfile && file.originalname.match(/\.torrent$/)){
                cb(null, file.originalname);
            } else{
                if(torrentfile) cb(new Error('File already exists'));
                else cb(new Error('Not a .torrent file'));
            }
        });
    }
});

const upload = multer({
    storage: storage,
}).single('torrentFile');

router.post("/upload", (req, res) => {
    upload(req, res, async (err) => {
        if(!err){
            const result = await TorrentFile.create({filename: req.file.filename});
            res.status(200).send(result);
        } else{
            res.send({error: err.message});
        }
    });
});

router.get("/:filename", async (req, res) => {
    res.download('./public/uploads/' + req.params.filename);
});

module.exports = router;
