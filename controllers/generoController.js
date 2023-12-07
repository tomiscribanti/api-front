const generoModel = require('../models/generoModel');

exports.obtenerTodos = async (req, res) => {
    try {
        const generos = await generoModel.find();
        res.json({ generos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const genero = await generoModel.findById(req.params.id);
        res.json({ genero });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.crear = async (req, res) => {
    try {
        const generoNuevo = new generoModel(req.body);
        await generoNuevo.save();
        res.status(201).json({
            msg: 'Género creado',
            id: generoNuevo._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        await generoModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: 'Género actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await generoModel.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Género eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};
