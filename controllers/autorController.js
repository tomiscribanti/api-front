const autorModel = require('../models/autorModel');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const privPass = 'appKey';

exports.crear = async (req, res) => {
    let autorNew;  // Mover la declaración aquí

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Error' });
        }
        const hashPass = await bcrypt.hash(password, salt);
        autorNew = new autorModel({
            name: name,
            email: email,
            password: hashPass
        });
        await autorNew.save();
        res.status(201).json({
            msg: 'Autor creado',
            id: autorNew._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const autores = await autorModel.find();
        res.json({ autores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const autor = await autorModel.findOne({ email });

        if (!autor) {
            return res.status(401).json({ msg: 'Usuario inválido' });
        }

        const passwordValid = await bcrypt.compare(password, autor.password);

        if (!passwordValid) {
            return res.status(401).json({ msg: 'Contraseña inválida' });
        }

        const token = jwt.sign({ userId: autor.id }, privPass, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

function validateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: 'No se pasó el token' });
    }

    jwt.verify(token.split(' ')[1], privPass, (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
}


exports.obtenerPorId = async (req, res) => {
    try {
        const autor = await autorModel.findById(req.params.id);
        res.json({ autor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        await autorModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: 'Autor actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await autorModel.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Autor eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};
