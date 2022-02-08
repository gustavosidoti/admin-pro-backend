// Requires
require('dotenv').config(); // Lee las variables de entorno

// importaciones de terceros
const express = require('express');
const cors = require('cors');

// importaciones internas

const { dbConnection } = require('./database/config');




// Crear el servidor de express
const app = express();

// configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();



// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


// Escucuchar Peticiones

app.listen(process.env.PORT, () => {
    console.log('Express server puerto: ' + process.env.PORT);
});