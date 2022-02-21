// Controlador de medicos

const { response } = require("express");

const Medico = require('../models/medico');


// Código

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');


    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        // guardamos en DB
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};