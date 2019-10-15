const express = require('express');
let db = require('./db/dummy_db');
let DB_ROUTES = require('./api/db_api');

const APP = express();
const PORT = 5000;

APP.use('/api', DB_ROUTES);

APP.listen(PORT, () => {
    console.log(`Server running on port:${PORT}.`);
});