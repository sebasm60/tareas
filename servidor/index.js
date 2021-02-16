const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
require('./config/database');

//Setings
app.set('port', process.env.PORT || 3000);

//middwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({dest : path.join(__dirname,'/img/uploads')}).single('imagen'));


//Routes
app.use('/api', require('./routes/routerTareas'));
app.use('/api', require('./routes/routerUsuarios'));

//static files
app.use(express.static(path.join(__dirname, '../cliente/public')));

//Iniciando servidor.
app.listen(app.get('port'), () => {
    console.log(`Start on port: ${app.get('port')}`);
});