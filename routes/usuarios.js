// Rutas de usuario 
//Ruta: /api/usuarios

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');

// importaciones propias
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
// código del archivo

const router = Router();

/* ========================== 
         OBTENER USUARIOS
   ==========================
*/


router.get('/', validarJWT, getUsuarios);

/* ========================== 
         GUARDAR UN USUARIO
   ==========================
*/

router.post('/', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
], crearUsuarios);

/* =================================== 
         ACTUALIZAR UN USUARIO POR ID
   ===================================
*/

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

/* =================================== 
         ELIMINAR UN USUARIO POR ID
   ===================================
*/

router.delete('/:id', validarJWT, borrarUsuario);


// Exportamos el módulo

module.exports = router;