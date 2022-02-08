//Importaciones 
const mongoose = require('mongoose'); // referencia a la librería

// Conexión a la base de Datos
// mean_user
// To5G2BcH6EBd15CE

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,

        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }

};

module.exports = {
    dbConnection
};