import express from 'express';
import { ProductManager } from './dao/ProductManager.js';
import { ProductsMongoManager } from './dao/ProductMongoManager.js';
import { CartManager } from './dao/CartManager.js';
import { logger } from './middlewares/logger.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

// Importar router principal
import apiRouter from './routes/apiIndex.js';
import viewsRouter from './routes/views.js';
import { conectarDB } from './config/db.js';
import { config } from './config/config.js';

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
app.use(express.static('./src/public'));

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});

conectarDB(config.MONGO_URL, config.DB_NAME);

const io = new Server(server);

io.on('connection', async (socket) => {
  console.log('Cliente conectado:', socket.id);

  // lista actual de productos al cliente que se conecta
  try {
    const productos = await ProductsMongoManager.getProducts();
    socket.emit('productos-actualizados', productos);
  } catch (error) {
    console.error('Error al cargar productos iniciales:', error);
  }

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

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

setInterval(() => {
  let fecha = new Date().toISOString();
  io.emit('fecha', fecha);
}, 1000);
