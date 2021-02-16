const { Router } = require('express');
const routerTareas = Router();
const validate = require('../middlewares/validateData');
const schema = require('../schemas/validadorTareas');

const controller = require('../controllers/controllerTareas');

routerTareas.get('/tarea/:id', controller.search);
routerTareas.get('/tareaByUsuario/:id', controller.searchByUsuario);
routerTareas.get('/tarea', controller.list);
routerTareas.post('/tarea', validate(schema), controller.add);
routerTareas.put('/tarea/:id',validate(schema), controller.update);
routerTareas.delete('/tarea/:id', controller.delete);

module.exports = routerTareas;