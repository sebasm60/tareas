const { Router } = require('express');
const routerUsuarios = Router();
const validate = require('../middlewares/validateData');
const schema = require('../schemas/validador');

const controller = require('../controllers/controllerUsuarios');

routerUsuarios.get('/usuario/:id', controller.search);
routerUsuarios.get('/usuarioByMail/:id', controller.searchByMeail);
routerUsuarios.get('/usuario', controller.list);
routerUsuarios.post('/usuario',validate(schema), controller.add);
routerUsuarios.put('/usuario/:id',validate(schema), controller.update);
routerUsuarios.delete('/usuario/:id', controller.delete);

module.exports = routerUsuarios;