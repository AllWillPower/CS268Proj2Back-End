const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const dbURL = "mongodb://localhost:27017/";

MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, db){
    if(err) throw err;
    let dbo = db.db("268Project2DB");
    dbo.createCollection("torrents", function(err, res){
        if(err) throw err;
        console.log("Collection created");
        db.close();
    });
});