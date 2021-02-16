const controllerTareas = {};
const Task = require('../schemas/TaskSchema');

//Agregar tareas.
controllerTareas.add = async(req, res) => {
    const { nombre, prioridad, fecha_vencimiento, imagen, id_usuario } = req.body;
    const task = new Task({
        nombre,
        prioridad,
        fecha_vencimiento,
        imagen,
        id_usuario
    });
    console.log(req.file);
    await task.save();
    
    res.json({ status: 'Task saved' });
};

//Consultar tareas.
controllerTareas.search = async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

//Consultar tareas.
controllerTareas.searchByUsuario = async(req, res) => {
    const task = await Task.find({id_usuario: req.params.id});
    res.json(task);
};

//Actualizar tareas.
controllerTareas.update = async(req, res) => {
    const { nombre, prioridad, fecha_vencimiento, imagen } = req.body;
    const newTask = {
        nombre,
        prioridad,
        fecha_vencimiento,
        imagen
    };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Task updated'});
};
//Eliminar tarea.
controllerTareas.delete = async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task deleted' });
};
//Listar tareas.
controllerTareas.list = async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

module.exports = controllerTareas;