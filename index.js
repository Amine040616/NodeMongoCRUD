
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const mailvalidation = require("./verifIdentifiant").mailvalidation;
const birthdatevalidation = require("./verificage").birthdatevalidation;
const mdpvalidation = require('./verifPWD').mdpvalidation;
const nickname = require('./verifnm').nickname;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/', (req, res) => {

    var mdp = mdpvalidation(req.body.password, res);
    var identifiant = mailvalidation(req.body.identifiant, res);
    var age = birthdatevalidation(req.body.birthdate, res);
    var pseudo = nickname(req.body.pseudonyme, res);
    
    if (mdp != "Mot de passe invalide" && identifiant == "Votre Identifiant est valide" && age == "Bienvenue dans notre site web" && pseudo == "Votre pseudonyme est valide") {

        const MongoClient = require('mongodb').MongoClient;

        // Connection URL
        const url = 'mongodb://localhost:27017';

        // Database Name
        const dbName = 'ALLUSERS';

        const findDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Find some documents
            collection.find({}).toArray(function(err, docs) {
                if(err) throw new Error(err);
                console.log("Found the following records");
                console.log(docs)
                callback(docs);
                res.send(docs);
            });
          }

        const insertDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Insert some documents
            collection.insertOne({pseudonyme : req.body.pseudonyme, identifiant : req.body.identifiant, password : req.body.password, birthdate : req.body.birthdate}, function(err, result) {
                if(err) throw new Error(err);
                console.log("Inserted 1 documents into the collection");
                callback(result);
            });
        }

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            if(err) throw new Error(err);
            console.log("Connected successfully to server," + " database name : " + dbName);

            const db = client.db(dbName);

            insertDocuments(db, function() {
                findDocuments(db, function() {
                    client.close();
                });
            });
    });

    //res.send(/*'Hello Darna!'*/ findDocuments(db, callback));
} else {res.send('Hello Mouch Darna!');}
});

app.post('/update', (req, res) => {

        const MongoClient = require('mongodb').MongoClient;

        // Connection URL
        const url = 'mongodb://localhost:27017';

        // Database Name
        const dbName = 'ALLUSERS';

        const findDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Find some documents
            collection.find({birthdate : req.body.birthdate}).toArray(function(err, docs) {
                if(err) throw new Error(err);
                console.log("Found this record");
                console.log(docs)
                callback(docs);
            });
          }

        const updateDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Insert some documents
            collection.updateOne({ birthdate : req.body.birthdate }, { $set: { password : req.body.newpassword } }, function(err, result) {
                if(err) throw new Error(err);
                console.log("Updated the document with the field password equal to : " + req.body.newpassword);
                collection.find({birthdate : req.body.birthdate}).toArray(function(err, docs) {
                    if(err) throw new Error(err);
                    callback(err, docs);
                    //return res.send(docs);
                  });
            });
        }

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            if(err) throw new Error(err);
            console.log("Connected successfully to server," + " database name : " + dbName);

            const db = client.db(dbName);
        
        findDocuments(db, function() {
            updateDocuments(db, function(err, docs) {
                if(err) throw new Error(err);
                    client.close();
                    return res.send(docs);
            });
        });
    });
});

app.post('/delete', (req, res) => {

    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'ALLUSERS';

    const findDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find some documents
        collection.find({birthdate : req.body.birthdate}).toArray(function(err, docs) {
            if(err) throw new Error(err);
            console.log("Found this record");
            console.log(docs)
            callback(docs);

        });
      }

    const deleteDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        var birthdate = req.body.birthdate;
        // Insert some documents
        collection.deleteOne({ birthdate : req.body.birthdate }, function(err, result) {
            if(err) throw new Error(err);
            console.log("Removed the document with the : " + birthdate);
            callback(err, result);
        });
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        if(err) throw new Error(err);
        console.log("Connected successfully to server," + " database name : " + dbName);

        const db = client.db(dbName);
    
    
    
    findDocuments(db, function() {
        deleteDocuments(db, function(err, docs) {
            if(err) throw new Error(err);
                client.close();
                return res.send(docs);
        });
      });

});

});

app.get('/app', (req, res) => res.send('Hello mouch World!'));

app.listen(1500, () => console.log('Example app listening on port 1500!'));