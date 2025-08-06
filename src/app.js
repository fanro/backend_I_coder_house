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

// ************************************************************************************
// PRODUCTS
app.get('/api/products', async (req, res) => {
  let productos = await ProductsManager.getProducts();
  res.send(productos);
});

app.get('/api/products/:pid', async (req, res) => {
  let productos = await ProductsManager.getProducts();
  let producto = productos.find((p) => p.id == req.params.pid);
  if (!producto) {
    return res.status(404).send({ error: 'Producto no encontrado' });
  }
  res.send(producto);
});

app.post('/api/products', async (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category
  ) {
    return res.status(400).send({ error: 'Faltan datos del producto' });
  }

  try {
    let nuevoProducto = await ProductsManager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );

    res.send(nuevoProducto);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

app.put('/api/products/:pid', async (req, res) => {
  let productos = await ProductsManager.getProducts();

  let producto = productos.find((p) => p.id == req.params.pid);
  if (!producto) {
    return res.status(404).send({ error: 'Producto no encontrado' });
  }

  let camposActualizar = req.body;
  try {
    let productoActualizado = await ProductsManager.updateProduct(
      req.params.pid,
      camposActualizar
    );
    res.send(productoActualizado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

app.delete('/api/products/:pid', async (req, res) => {
  let productos = await ProductsManager.getProducts();

  let producto = productos.find((p) => p.id == req.params.pid);
  if (!producto) {
    return res.status(404).send({ error: 'Producto no encontrado' });
  }

  try {
    let resultado = await ProductsManager.deleteProduct(req.params.pid);
    res.send(resultado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});
