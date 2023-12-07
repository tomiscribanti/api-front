const libroModel = require('../models/libroModel');
const jwt = require('jsonwebtoken');
const privPass = 'appKey'; 

exports.crear = async (req, res) => {
    try {
        const { title, body, genero, resena, image } = req.body;

        let autorId = null;
        const token = req.headers.authorization;
        if (token) {
            try {
                const decoded = jwt.verify(token.split(' ')[1], 'appKey');
                autorId = decoded.userId;
            } catch (error) {
                return res.status(403).json({ msg: 'Token inválido' });
            }
        }

        if (!title || !body || genero || resena ) {
            return res.status(400).json({ msg: 'Por favor, proporcione todos los datos requeridos.' });
        }

        if (title.length < 3) {
            return res.status(400).json({ msg: 'El título debe tener al menos 3 caracteres.' });
        }

        const nuevoLibro = new libroModel({ title, body, autorId, genero, resena, image });
        await nuevoLibro.save();

        res.status(201).json({
            msg: 'Libro creado',
            id: nuevoLibro._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};



exports.obtenerTodos = async (req, res) => {
    try {
        const libros = await libroModel.find();
        res.json({ libros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const libro = await libroModel.findById(req.params.id);
        res.json({ libro });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};



exports.actualizar = async (req, res) => {
    try {
        await libroModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: 'Libro actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await libroModel.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Libro eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};
