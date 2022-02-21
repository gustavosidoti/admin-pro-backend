// Rutas de Búsqueda
//Ruta: /api/todo/:busqueda

// importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');



// importaciones propias
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// código del archivo

const router = Router();

/* ========================== 
         OBTENER BUSQUEDA GENERAL
   ==========================
*/

router.get('/:busqueda', validarJWT, getTodo);


/* ========================== 
         OBTENER BUSQUEDA POR COLECCIÓN
   ==========================
*/

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

// Exportamos el módulo

module.exports = router;