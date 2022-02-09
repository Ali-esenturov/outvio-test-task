const bodyParser = require('body-parser');
const express = require('express');

require('dotenv').config();

const { APP_PORT } = require('./constants/configs');
const mongoClient = require('./db/mongo-client');


function run() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    mongoClient.connectMongo()
        .then((res) => {
            const publicRouter = require('./routers/public-router');
            app.use('/public', publicRouter);
        
            const privateRouter = require('./routers/private-router');
            app.use('/private', privateRouter);

            app.listen(APP_PORT, () => {
                console.log(`Rate limiter test app listening on port ${APP_PORT}!`);
            });
        })
        .catch((err) => {
            console.log('Can NOT start app without MongoDb');
            console.log(err.message);
        });
}

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

run();
