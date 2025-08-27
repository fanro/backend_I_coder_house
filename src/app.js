const express = require('express');
const { ProductManager } = require('./dao/ProductManager');
const { CartManager } = require('./dao/CartManager');
const { logger } = require('./middlewares/logger.js');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');

// Importar router principal
const apiRouter = require('./routes/apiIndex');
const viewsRouter = require('./routes/views');

ProductManager.rutaDatos = './src/data/products.json';
CartManager.rutaDatos = './src/data/carts.json';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// paso socket.io para usar en rutas
app.use(
  '/api',
  (req, res, next) => {
    req.socket = io;
    next();
  },
  apiRouter
);
app.use('/', viewsRouter);

app.get('/', (req, res) => {
  res.send('Bienvenidos');
});

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});

// socket.io
const io = new Server(server);
