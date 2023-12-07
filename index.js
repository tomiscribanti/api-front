const express = require('express');
const dataBase = require('./dataBase');
const autorController = require('./controllers/autorController');
const libroController = require('./controllers/libroController');
const generoController = require('./controllers/generoController');
const resenaController = require('./controllers/resenaController');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const salt = 10;
const privPass = 'appKey';
const PORT = process.env.PORT || 3000;
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Servidor API en ejecución en el puerto ${PORT}`);
  });


  function validateToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: 'No se pasó el token' });
    }
    token = token.split(' ')[1];
    jwt.verify(token, privPass, (error, decoded) => {
        if (error) {
            return res.status(403).json({ msg: 'Token inválido' });
        }
        req.userId = decoded.userId;
    });
    next();
}


dataBase.on('error', () => {
    console.error('Error de conexión con MongoDB');
});

dataBase.once('open', () => {
    console.log('Conexión con MongoDB establecida correctamente');
});

app.get('/', (req, res) => {
    res.send('<h1>Los libros de Tom</h1>');
});

app.get('/api/autor', autorController.obtenerTodos);
app.get('/api/autor/:id', autorController.obtenerPorId);
app.post('/api/autor', autorController.crear);
app.post('/api/auth', autorController.auth);

app.use('/api/autor', validateToken);
app.put('/api/autor/:id', autorController.actualizar);
app.delete('/api/autor/:id', autorController.eliminar);

app.get('/api/libro', libroController.obtenerTodos);
app.get('/api/libro/:id', libroController.obtenerPorId);
app.post('/api/libro', validateToken, libroController.crear);

app.put('/api/libro/:id', libroController.actualizar);
app.delete('/api/libro/:id', libroController.eliminar);

app.get('/api/genero', generoController.obtenerTodos);
app.get('/api/genero/:id', generoController.obtenerPorId);
app.post('/api/genero', generoController.crear);
app.put('/api/genero/:id', generoController.actualizar);
app.delete('/api/genero/:id', generoController.eliminar);

app.get('/api/resena', resenaController.obtenerTodos);
app.get('/api/resena/:id', resenaController.obtenerPorId);
app.post('/api/resena', resenaController.crear);
app.put('/api/resena/:id', resenaController.actualizar);
app.delete('/api/resena/:id', resenaController.eliminar);
