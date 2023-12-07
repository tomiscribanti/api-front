const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const autorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now 
    } 
})

const Autor = mongoose.model('Autor', autorSchema);

module.exports = Autor;