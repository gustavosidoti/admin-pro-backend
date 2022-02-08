// controlador de login

// importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

// importaciones internas
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // verificamos email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no registrado'
            });
        }

        // verificamos contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el TOKEN
        const token = await generarJWT(usuarioDB.id);

        return res.status(200).json({
            ok: true,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
};

module.exports = {
    login
};