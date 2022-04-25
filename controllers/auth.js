// controlador de login

// importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

// importaciones internas
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');




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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        //verificar si usuario existe
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            //si no existe usuario creamos uno
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en base de datos
        await usuario.save();

        // Generar el TOKEN
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: "Token incorrecto"
        });
    }



};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: false,
        token,
        usuario
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};