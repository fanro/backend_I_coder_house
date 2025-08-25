const express = require('express');
const { ProductManager } = require('./dao/ProductManager');
const { CartManager } = require('./dao/CartManager');

// Importar router principal
const apiRouter = require('./routes/index');

ProductManager.rutaDatos = './src/data/products.json';
CartManager.rutaDatos = './src/data/carts.json';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Bienvenidos');
});

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});
