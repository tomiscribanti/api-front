const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: String,
    created: {
        type: Date,
        default: Date.now,
    },
});

const Genero = mongoose.model('Genero', generoSchema);

module.exports = Genero;
