// helpers que genera tokens
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {

        // llenamos el cuerpo del token con el/los datos del usuario
        const payload = {
            uid,
        };

        // realizamos la firma con el payload y la firma
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h' // vence en 12 horas
        }, (err, token) => {
            // si no funciona retorna el error
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                // si todo está bien devuelve el token
                resolve(token);
            }
        });
    });
};

// exportamos la función
module.exports = {
    generarJWT,
};