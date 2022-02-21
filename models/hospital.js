// Modelo de Hospitales

// importaciones
const { Schema, model } = require('mongoose');



const HospitalSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

}, { collection: 'hospitales' }); // Definimos un objeto schema y cómo se llamará en BD

// formatear el schema y devolver al usuario lo que decidamos mostrarle
HospitalSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Hospital', HospitalSchema); // con esto exportamos el schema y le damos el nombre 'Hospital'