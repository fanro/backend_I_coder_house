const express = require('express');
const { ProductsManager } = require('./dao/ProductsManager');
ProductsManager.rutaDatos = './src/data/products.json';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Bienvenidos');
});

// PRODUCTS
app.get('/api/products', async (req, res) => {
  let productos = await ProductsManager.getProducts();
  res.send(productos);
});

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});
