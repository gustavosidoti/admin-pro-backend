// Requires
require('dotenv').config(); // Lee las variables de entorno

// importaciones de terceros
const express = require('express');
const cors = require('cors');

// importaciones internas
const { dbConnection } = require('./database/config');

/*
    Código del archivo
*/



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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


// Escucuchar Peticiones

app.listen(process.env.PORT, () => {
    console.log('Express server puerto: ' + process.env.PORT);
});