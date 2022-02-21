// Modelo de medicos

// importaciones
const { Schema, model } = require('mongoose');



const MedicoSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, },
    usuario: { // Necesitamos el usuario que lo crea
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: { // necesitamos el hospital u hospitales en los que trabaja
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },

}); // Definimos un objeto schema y cómo se llamará en BD

// formatear el schema y devolver al usuario lo que decidamos mostrarle
MedicoSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Medico', MedicoSchema); // con esto exportamos el schema y le damos el nombre 'Hospital'