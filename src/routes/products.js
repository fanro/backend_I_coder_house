import express from 'express';
import { ProductManager } from '../dao/ProductManager.js';
import { ProductsMongoManager } from '../dao/ProductMongoManager.js';
const router = express.Router();

// GET /api/products - Obtener todos los productos
router.get('/', async (req, res) => {
  const { limit, page, sort, query } = req.query;
  try {
    let productos = await ProductsMongoManager.getProducts(
      limit,
      page,
      sort,
      query
    );

    res.send({
      status: 'success',
      payload: productos.docs,
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      page: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.prevLink,
      nextLink: productos.nextLink,
    });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: error.message });
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

  const typeErrors = [];

  if (typeof title !== 'string')
    typeErrors.push(`title debe ser string, recibido: ${typeof title}`);
  if (typeof description !== 'string')
    typeErrors.push(
      `description debe ser string, recibido: ${typeof description}`
    );
  if (typeof code !== 'string')
    typeErrors.push(`code debe ser string, recibido: ${typeof code}`);
  if (typeof price !== 'number')
    typeErrors.push(`price debe ser number, recibido: ${typeof price}`);
  if (typeof status !== 'boolean')
    typeErrors.push(`status debe ser boolean, recibido: ${typeof status}`);
  if (typeof stock !== 'number')
    typeErrors.push(`stock debe ser number, recibido: ${typeof stock}`);
  if (typeof category !== 'string')
    typeErrors.push(`category debe ser string, recibido: ${typeof category}`);

  if (typeErrors.length > 0) {
    return res
      .status(400)
      .send({ error: `Tipos de datos incorrectos: ${typeErrors.join(', ')}` });
  }

  if (
    thumbnails &&
    (!Array.isArray(thumbnails) ||
      !thumbnails.every((thumb) => typeof thumb === 'string'))
  ) {
    return res
      .status(400)
      .send({ error: 'Thumbnails debe ser un array de strings' });
  }

  try {
    let nuevoProducto = await ProductsMongoManager.createProduct({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    // evento de producto agregado a todos los clientes
    if (req.socket) {
      req.socket.emit('producto-agregado', nuevoProducto);

      // También emito la lista actualizada de productos a todos los clientes
      const productos = await ProductsMongoManager.getProducts();
      req.socket.emit('productos-actualizados', productos);
    }

    res.send(nuevoProducto);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// PUT /api/products/:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  let camposActualizar = req.body;
  try {
    let productoActualizado = await ProductsMongoManager.updateProduct(
      req.params.pid,
      camposActualizar
    );

    // evento de producto actualizado a todos los clientes
    if (req.socket) {
      req.socket.emit('producto-actualizado', productoActualizado);

      // También emito la lista actualizada de productos a todos los clientes
      const productos = await ProductsMongoManager.getProducts();
      req.socket.emit('productos-actualizados', productos);
    }

    res.send(productoActualizado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// DELETE /api/products/:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    // Obtener el producto antes de eliminarlo para tener el ID
    const productoAEliminar = await ProductsMongoManager.getProductBy({
      _id: req.params.pid,
    });

    let resultado = await ProductsMongoManager.deleteProduct(req.params.pid);

    if (!resultado) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }

    // Emitir evento de producto eliminado a todos los clientes
    if (req.socket) {
      req.socket.emit('producto-eliminado', productoAEliminar._id);

      // También emito la lista actualizada de productos a todos los clientes
      const productos = await ProductsMongoManager.getProducts();
      req.socket.emit('productos-actualizados', productos);
    }

    res.send(resultado);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

export default router;
