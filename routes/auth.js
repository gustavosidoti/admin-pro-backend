// Rutas de login
//Ruta: /api/login

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');

// importaciones internas
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


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

router.get('/renew', validarJWT, renewToken);


// exports
module.exports = router;