const { MongoClient } = require('mongodb');
const { DB_HOST, DB_PORT, DB_NAME } = require('../constants/configs');

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

let _client;

function connectMongo() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                return reject(err);
            }
            _client = client;

            console.log('Connected successfully to database');
            return resolve();
        });
    });
}

function getDb(dbName) {
    return _client.db(dbName);
}

module.exports = {
    connectMongo,
    getDb
};