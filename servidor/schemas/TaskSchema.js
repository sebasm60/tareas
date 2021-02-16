const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    nombre: { type: String, required: true },
    prioridad: { type: String, required: true },
    fecha_vencimiento: { type: String, required: true},
    imagen: { type: String, required: true },
    id_usuario: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);