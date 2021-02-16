const controllerUser = {};
const User = require('../schemas/userSchema');
const nodemailer = require('nodemailer');

//Agregar usuario.
controllerUser.add = async(req, res) => {
    const { nombre, apellido, correo, contraseña } = req.body;
    const user = new User({
        nombre,
        apellido,
        correo,
        contraseña
    });
    await user.save();

    contentHTML = `
        <h1>Informacion de usuario</h1>
            <ul>
                <li>Nombre: ${nombre}</li>
                <li>Apellido: ${apellido}</li>
                <li>Correo: ${correo}</li>
                <li>Contraseña: ${contraseña}</li>  
            </ul>
    `
    const trasnporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port : 587,
        secure : false,
        auth : { 
            user : 'sebasg1325@hotmail.com',
            pass : '97031410480LOL'
        }
    });

     const info = await trasnporter.sendMail({
        from: "'Gestor de tareas' <sebasg1325@hotmail.com>",
        to : correo,
        subject : "Welcome",
        html : contentHTML
    });
    res.json({ status: 'User saved' });
};

//Consultar Usuario.
controllerUser.search = async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

controllerUser.searchByMeail = async(req, res) => {
    const user = await User.find({correo : req.params.id});
    res.json(user);
};

//Actualizar Usuario.
controllerUser.update = async(req, res) => {
    const { nombre, apellido, correo, contraseña } = req.body;
    const newUser = {
        nombre,
        apellido,
        correo,
        contraseña
    };
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({ status: 'User updated'});
};
//Eliminar usuario.
controllerUser.delete = async(req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'User deleted' });
};
//Listar usuarios.
controllerUser.list = async(req, res) => {
    const user = await User.find();
    res.json(user);
};

module.exports = controllerUser;