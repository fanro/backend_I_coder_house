const express = require('express');
const { ProductManager } = require('../dao/ProductManager');
const router = express.Router();

// GET /api/products - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    let productos = await ProductManager.getProducts();
    res.send(productos);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// GET /api/products/:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
  try {
    let producto = await ProductManager.getProductById(req.params.pid);
    res.send(producto);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

// POST /api/products - Crear nuevo producto
router.post('/', async (req, res) => {
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
    let nuevoProducto = await ProductManager.addProduct(
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

// PUT /api/products/:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  let camposActualizar = req.body;
  try {
    let productoActualizado = await ProductManager.updateProduct(
      req.params.pid,
      camposActualizar
    );
    res.send(productoActualizado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// DELETE /api/products/:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    let resultado = await ProductManager.deleteProduct(req.params.pid);
    res.send(resultado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
