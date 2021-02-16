const mongoose = require('mongoose');
const URI = 'mongodb+srv://sebastian:sebastian1997ñ@gestortareas.xzybe.mongodb.net/dbGestorTareas?retryWrites=true&w=majority';

mongoose.connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(db => console.log('Db online'))
    .catch(err => console.log(err));

module.exports = mongoose;