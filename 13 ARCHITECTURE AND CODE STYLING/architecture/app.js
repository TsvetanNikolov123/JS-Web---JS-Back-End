const express = require('express');

const envConfig = require('./config/env-config');
const initDb = require('./config/db-config');
const initMiddleware = require('./config/middleware-config');
const initViews = require('./config/views-config');
const initRoutes = require('./config/routes-config.js');

const environment = process.env.NODE_ENV || 'development';
const envOpts = envConfig[environment];
const app = express();

initMiddleware(app, envOpts.rootPath);
initViews(app, envOpts.rootPath);
initRoutes(app);

initDb(envOpts.dbConnectionStr)
    .then(() => {
        console.log('Successfully connected to database');
        const port = envOpts.port;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
