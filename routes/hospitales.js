// Rutas de Hospitales 
//Ruta: /api/hospitales

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');


// importaciones propias
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// código del archivo

const router = Router();

/* ========================== 
         OBTENER HOSPITALES
   ==========================
*/


router.get('/', validarJWT, getHospitales);

/* ========================== 
         GUARDAR UN USUARIO
   ==========================
*/

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().notEmpty(),

], crearHospital);

/* =================================== 
         ACTUALIZAR UN USUARIO POR ID
   ===================================
*/

router.put('/:id', [

], actualizarHospital);

/* =================================== 
         ELIMINAR UN USUARIO POR ID
   ===================================
*/

router.delete('/:id', borrarHospital);


// Exportamos el módulo

module.exports = router;