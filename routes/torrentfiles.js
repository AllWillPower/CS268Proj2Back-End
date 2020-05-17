const router = require('express').Router();
const fs = require('fs');
const {promisify} = require('util');
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

const unlinkAsync = promisify(fs.unlink);

const upload = multer({
    storage: storage,
}).single('torrentFile');

router.post("/upload", (req, res) => {
    try{
        upload(req, res, async (err) => {
            if(!err){
                const result = await TorrentFile.create({filename: req.file.filename});
                res.status(200).send(result);
            } else{
                res.send({error: err});
            }
        });
    } catch(err){
        res.send({error: err});
    }  
});

router.get("/:filename", async (req, res) => {
    res.download('./public/uploads/' + req.params.filename);
});

router.delete('/:filename', async (req, res) => {
    try{
        TorrentFile.findOneAndDelete({filename: req.params.filename}, async (err, result) => {
            if(!err){
                if(!result){
                    res.send({error: 'TorrentFile with filename: ' + req.params.filename + ' not found'});
                } else{
                    await unlinkAsync('./public/uploads/' + req.params.filename);
                    res.send(result);
                }
            } else{
                res.send({error: err});
            }
        });
    } catch(err){
        res.send({error: err});
    }
});

module.exports = router;
