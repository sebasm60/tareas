const Joi = require('@hapi/joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string().required('El nombre es requerido').min(3).max(25),
    prioridad: Joi.string().required('El apellido es requerido').min(3).max(25),
    fecha_vencimiento: Joi.string().required('El correo es requerido').min(3).max(25),
    imagen: Joi.string().required('El correo es requerido').min(3).max(25),
    id_usuario: Joi.object()
});

module.exports = usuarioSchema;