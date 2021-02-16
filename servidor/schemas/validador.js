const Joi = require('@hapi/joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string().required('El nombre es requerido').min(3).max(25),
    apellido: Joi.string().required('El apellido es requerido').min(3).max(25),
    correo: Joi.string().required('El correo es requerido').min(3).max(25),
    contraseña: Joi.string().required('El correo es requerido').min(3).max(25)
});

module.exports = usuarioSchema;