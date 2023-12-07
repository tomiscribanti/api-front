const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resenaSchema = new Schema({
    contenido: {
        type: String,
        required: true,
    },
    calificacion: {
        type: Number,
        min: 1,
        max: 5,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Resena = mongoose.model('Resena', resenaSchema);

module.exports = Resena;
