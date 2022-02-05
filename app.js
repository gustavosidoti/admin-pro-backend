// Requires
require('dotenv').config(); // Lee las variables de entorno

// impportaciones
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');




// Crear el servidor de express
const app = express();

// configurar CORS
app.use(cors());

// Base de datos
dbConnection();



// Rutas
app.get('/', (request, response, next) => {

    response.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    });


});


// Escucuchar Peticiones

app.listen(process.env.PORT, () => {
    console.log('Express server puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});