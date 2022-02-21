// Rutas de Uploads
//Ruta: /api/uploads

// importaciones de terceros
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');

// importaciones propias
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// código del archivo

const router = Router();
router.use(expressFileUpload());

/* ========================== 
         CARGA DE ARCHIVO
   ==========================
*/

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);


// Exportamos el módulo

module.exports = router;