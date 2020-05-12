const router = require('express').Router();
const Torrent = require('../model/Torrent');
const torrentsRoute = require('./torrents');
const fs = require('fs');
const grid = require('gridfs-stream');

router.get('/', async (req, res) => {
    const torrents = await Torrent.find();
    res.send(torrents);
});

router.post('/', async (req, res) => {
    const result = await Torrent.create(req.body);
    res.send(result);
});

router.get('/:id', async (req, res) => {
    try{
        const torrent = await Torrent.find({_id: req.params.id, isDeleted: false});
        res.send(torrent);
    } catch(err){
        res.json({message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const removed = await Torrent.findByIdAndUpdate(req.params.id, {isDeleted: true});
        if(removed) res.send(removed);
        else res.send({error: 'Object with id: ' + req.params.id + ' not found'});
    } catch(err){
        res.json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, req.body);
        if(updated) res.send(updated);
        else res.status(404).send({error: 'Object with id: ' + req.params.id + ' not found'});
    } catch(err){
        res.status(404).send(err);
    }
});

router.get('/name/:name', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({name: {$regex: req.params.name, $options: 'i'}, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({message: err});
    }
});

router.get('/distrobution/:distrobution', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({distrobution: {$regex: req.params.distrobution, $options: 'i'}, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({message: err});
    }
});

router.get('/author/:author', async (req, res) => {
    try{
        const resultQuery = await Torrent.find({author: req.params.author, isDeleted: false});
        res.send(resultQuery);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:id/seed', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {seeders: 1}});
        res.send(updated);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:id/leech', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {leechers: 1}});
        res.send(updated);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:id/unseed', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {seeders: -1}});
        res.send(updated);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:id/unleech', async (req, res) => {
    try{
        const updated = await Torrent.findByIdAndUpdate(req.params.id, {$inc: {leechers: -1}});
        res.send(updated);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;