// Rutas de Medicos 
//Ruta: /api/medicos

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');


// importaciones propias
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// código del archivo

const router = Router();

/* ========================== 
         OBTENER MEDICOS
   ==========================
*/


router.get('/', validarJWT, getMedicos);

/* ========================== 
         GUARDAR UN MEDICO
   ==========================
*/

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().notEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos

], crearMedico);

/* =================================== 
         ACTUALIZAR UN MEDICO POR ID
   ===================================
*/

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().notEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos
], actualizarMedico);

/* =================================== 
         ELIMINAR UN MEDICO POR ID
   ===================================
*/

router.delete('/:id', borrarMedico);


// Exportamos el módulo

module.exports = router;