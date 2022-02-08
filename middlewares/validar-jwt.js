// Middleware  - Validar un jwt
// importaciones
const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    // preguntamos si viene un token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    // preguntamos si el token es correcto
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid; // devolvemos el id del usuario que hizo la petición

        next(); // continuamos con la ejecución del programa

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT,
};