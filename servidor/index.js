'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/routes'));

app.set('port', process.env.PORT || 6060);

app.listen(app.get('port'), () => {
    console.log(`Start on port: ${app.get('port')}`);
});