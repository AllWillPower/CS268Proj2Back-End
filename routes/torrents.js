const router = require('express').Router();
const Torrent = require('../model/Torrent');
const torrentsRoute = require('./torrents');

router.get('/', async (req, res) => {
    try{
        Torrent.find({isDeleted: false}, (err, results) => {
            if(!err){
                res.send(results);
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try{
        let structure = {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            filename: req.body.filename,
            filesize: req.body.filesize,
            distribution: req.body.distribution
        };
        Torrent.create(structure, (err, result) => {
            if(!err){
                res.send(result);
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.json({error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        Torrent.find({_id: req.params.id, isDeleted: false}, (err, result) => {
            if(!err){
                if(!result){
                    res.status(404).send({error: 'Torrent with the id: ' + req.params.id + ' not found'});
                } else{
                    res.send(result);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, {isDeleted: true}, (err, result) => {
            if(!err){
                if(!result){
                    res.status(404).send({error: 'Torrent with the id: ' + req.params.id + ' not found'});
                } else{
                    res.send(result);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        let toUpdate = {};
        if(req.body.description) toUpdate.description = req.body.description;
        if(req.body.name) toUpdate.name = req.body.name;
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, toUpdate, (err, result) => {
            if(!err){
                if(!result){
                    res.status(404).send({error: 'Torrent with the id: ' + req.params.id + ' not found'});
                } else{
                    if(toUpdate.description) result.description = toUpdate.description;
                    if(toUpdate.name) result.name = toUpdate.name;
                    res.send(result);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.get('/name/:name', async (req, res) => {
    try{
        Torrent.find({name: {$regex: req.params.name, $options: 'i'}, isDeleted: false}, (err, result) => {
            if(!err){
                res.send(result);
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.get('/distribution/:distribution', async (req, res) => {
    try{
        Torrent.find({distrobution: {$regex: req.params.distribution, $options: 'i'}, isDeleted: false}, (err, result) => {
            if(!err){
                if(!result){
                    res.status(404).send({error: 'Torrents with in the distribution: ' + req.params.distribution + ' not found'});
                } else{
                    res.send(result);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.json({error: err.message});
    }
});

router.get('/author/:author', async (req, res) => {
    try{
        Torrent.find({author: req.params.author, isDeleted: false}, (err, result) => {
            if(!err){
                if(!result){
                    res.status(404).send({error: 'Torrents with the author: ' + req.params.author + ' not found'});
                } else{
                    res.send(result);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.patch('/:id/seed', async (req, res) => {
    try{
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, {$inc: {seeders: 1}}, (err, updated) => {
            if(!err){
                if(!updated){
                    res.status(404).send({error: 'Torrent with id: ' + req.params.id + ' not found'});
                } else{
                    updated.seeders++;
                    res.send(updated);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.patch('/:id/leech', async (req, res) => {
    try{
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, {$inc: {leechers: 1}}, (err, updated) => {
            if(!err){
                if(!updated){
                    res.status(404).send({error: 'Torrent with id: ' + req.params.id + ' not found'});
                } else{
                    updated.leechers++;
                    res.send(updated);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.patch('/:id/unseed', async (req, res) => {
    try{
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, {$inc: {seeders: -1}}, (err, updated) => {
            if(!err){
                if(!updated){
                    res.status(404).send({error: 'Torrent with id: ' + req.params.id + ' not found'});
                } else{
                    updated.seeders--;
                    res.send(updated);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

router.patch('/:id/unleech', async (req, res) => {
    try{
        Torrent.findOneAndUpdate({_id: req.params.id, isDeleted: false}, {$inc: {leechers: -1}}, (err, updated) => {
            if(!err){
                if(!updated){
                    res.status(404).send({error: 'Torrent with id: ' + req.params.id + ' not found'});
                } else{
                    updated.leechers--;
                    res.send(updated);
                }
            } else{
                res.status(400).send({error: err.message});
            }
        });
    } catch(err){
        res.status(400).send({error: err.message});
    }
});

module.exports = router;