import express from 'express';
import { CartMongoManager } from '../dao/CartMongoManager.js';

const router = express.Router();

// GET /api/carts - Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    let carts = await CartMongoManager.getCarts();
    res.send(carts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    let cart = await CartMongoManager.getCartById(req.params.cid);
    res.send(cart);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

// POST /api/carts - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    let nuevoCarrito = await CartMongoManager.addCart();
    res.send(nuevoCarrito);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  let { cid, pid } = req.params;

  try {
    let cart = await CartMongoManager.addProductToCart(cid, pid);
    res.send(cart);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  let { cid, pid } = req.params;

  try {
    let cart = await CartMongoManager.removeProductFromCart(cid, pid);
    res.send(cart);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

export default router;
