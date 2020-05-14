const router = require('express').Router();
const Torrent = require('../model/Torrent');
const torrentsRoute = require('./torrents');

router.get('/', async (req, res) => {
    const torrents = await Torrent.find();
    res.send(torrents);
});

router.post('/', async (req, res) => {
    try{
        let structure = {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            filename: req.body.filename,
            fileSize: req.body.fileSize,
            distrobution: req.body.distrobution
        };
        const result = await Torrent.create(structure);
        res.send(result);
    } catch(err){
        res.json({error: err});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const torrent = await Torrent.find({_id: req.params.id, isDeleted: false});
        res.status(200).send(torrent);
    } catch(err){
        res.status(400).send({error: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const removed = await Torrent.findByIdAndUpdate(req.params.id, {isDeleted: true});
        if(removed) res.send(removed);
        else res.send({error: 'Object with id: ' + req.params.id + ' not found'});
    } catch(err){
        res.json({error: err});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        let toUpdate = {};
        if(req.body.description) toUpdate.description = req.body.description;
        if(req.body.name) toUpdate.name = req.body.name;
        const updated = await Torrent.findByIdAndUpdate(req.params.id, toUpdate);
        if(updated) res.send(updated);
        else res.status(404).send({error: 'Object with id: ' + req.params.id + ' not found'});
    } catch(err){
        res.status(404).send({error: err});
    }
});

router.get('/name/:name', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({name: {$regex: req.params.name, $options: 'i'}, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({error: err});
    }
});

router.get('/distrobution/:distrobution', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({distrobution: {$regex: req.params.distrobution, $options: 'i'}, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({error: err});
    }
});

router.get('/author/:author', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({author: req.params.author, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({error: err});
    }
});

router.patch('/:id/seed', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {seeders: 1}});
        res.send(updated);
    } catch(err){
        res.json({error: err});
    }
});

router.patch('/:id/leech', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {leechers: 1}});
        res.send(updated);
    } catch(err){
        res.json({error: err});
    }
});

router.patch('/:id/unseed', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {seeders: -1}});
        res.send(updated);
    } catch(err){
        res.json({error: err});
    }
});

router.patch('/:id/unleech', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {leechers: -1}});
        res.send(updated);
    } catch(err){
        res.json({error: err});
    }
});

module.exports = router;