const controller = {};
const { cnn_mysql } = require('../config/databaseMySql');

//Agregar tareas.
controller.add = async(req, res) => {
    try {
        const {
            id,
            nombre,
            prioridad,
            fecha_de_vencimiento,
            imagen
        } = req.body;
        const tarea = await cnn_mysql.promise().execute(`INSERT INTO tareas(id, nombre, prioridad, 
        fecha_de_vencimiento, imagen) VALUES(?, ?, ?, ?, ?)`, [id, nombre, prioridad, fecha_de_vencimiento, imagen]);
        (tarea.affectedRows > 0) ? res.json({
            id: id,
            nombre: nombre,
            prioridad: prioridad,
            fecha_de_vencimiento: fecha_de_vencimiento,
        }): res.json({});
    } catch (error) {
        res.status(500).json({ errorCode: error.err, message: 'Error en el servidor' });
    };
};

module.exports = controller;