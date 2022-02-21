// Controlador de Busquedas

const { response } = require("express");


const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


// Código

// getTodo busquedas generales

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda; // esto es lo que atrapa de busqueda
    // busqueda se pide como parametro en la ruta - ver archivo de ruta

    const regex = new RegExp(busqueda, 'i'); // expresiones regulares busqueda insensible

    // Array de promesas que se ejecutan en forma simultanea las 3 consultas

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);


    res.json({
        ok: true,
        msg: 'getTodo',
        usuarios,
        medicos,
        hospitales
    });
};

// getDocumentosColeccion busquedas por coleccion

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla; // la coleccion o tabla deseada
    const busqueda = req.params.busqueda; // esto es lo que atrapa de busqueda
    // busqueda se pide como parametro en la ruta - ver archivo de ruta

    const regex = new RegExp(busqueda, 'i'); // expresiones regulares busqueda insensible

    let data = []; // resultado de la búsqueda

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }


    res.json({
        ok: true,
        resultado: data
    });
};


module.exports = {
    getTodo,
    getDocumentosColeccion

};