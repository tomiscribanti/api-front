const resenaModel = require('../models/resenaModel');

exports.obtenerTodos = async (req, res) => {
    try {
        const resenas = await resenaModel.find();
        res.json({ resenas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const resena = await resenaModel.findById(req.params.id);
        res.json({ resena });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.crear = async (req, res) => {
    try {
        const resenaNueva = new resenaModel(req.body);
        await resenaNueva.save();
        res.status(201).json({
            msg: 'Reseña creada',
            id: resenaNueva._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        await resenaModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: 'Reseña actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await resenaModel.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Reseña eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};
