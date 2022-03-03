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

const actualizarMedico = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        // otra forma de actualizar
        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedicos, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico borrado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};