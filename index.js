const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    const db = client.db(dbname);

    console.log('Connected correctly to server');
        dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes")
            .then((docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes")
                    .then((result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes")
                        .then((docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes")
                            .then((result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });
});