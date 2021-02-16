const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true},
    contraseña: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);