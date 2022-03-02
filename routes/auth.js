// Rutas de login
//Ruta: /api/login

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');

// importaciones internas
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


// codigo
const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);



// exports
module.exports = router;