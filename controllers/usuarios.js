// Controlador de usuarios
// Importaciones de terceros
const { response } = require('express');
const bcrypt = require('bcryptjs');

// importaciones locales
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response, next) => {

    const desde = Number(req.query.desde) || 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [usuarios, total] = await Promise.all([ // ARRAY DE PROMESAS
        Usuario
        .find({}, 'nombre email role google img') // los campos que queremos
        .skip(desde) // se saltea los anteriores a este número
        .limit(5), // nos muestra hasta este número

        Usuario.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid, // nos informa que usuario hizo la petición
        total
    });


};

const crearUsuarios = async(req, res = response, next) => {

    // definimos que queremos rescatar de lo que envía el cliente
    const { email, password } = req.body;

    try {

        // Revisamos si el email existe
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        // creamos una instancia del modelo de usuario
        const usuario = new Usuario(req.body);

        // Encriptar la contraseña del usuario
        const salt = bcrypt.genSaltSync(); //encripta de manera aleatoria
        usuario.password = bcrypt.hashSync(password, salt); // le enviamos los 2 parametros y encrita en el modelo

        // guardamos en DB
        await usuario.save();

        // Generar el TOKEN
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });

    }

};

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // verifico el id valido de ese usuario
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // actualizo el usuario
        // el correo, google, password los quito porque no se actualizan
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        // agrego email a campos sino existe el mail o viene actualizado

        campos.email = email;

        // actualizo en BD y devuelvo los datos actualizados
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {

    }
};

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // verifico el id valido de ese usuario
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // elimino en BD y devuelvo los datos actualizados
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
};