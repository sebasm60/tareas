const { Router } = require('express');
const router = Router();

const controller = require('../controllers/controller');

router.post('/nuevatarea', controller.add);

module.exports = router;