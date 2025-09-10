import express from 'express';
import { CartManager } from '../dao/CartManager.js';
const router = express.Router();

// GET /api/carts - Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    let carts = await CartManager.getCarts();
    res.send(carts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    let cart = await CartManager.getCartById(req.params.cid);
    res.send(cart);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

// POST /api/carts - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    let nuevoCarrito = await CartManager.addCart();
    res.send(nuevoCarrito);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  let { cid, pid } = req.params;

  try {
    let cart = await CartManager.addProductToCart(parseInt(cid), parseInt(pid));
    res.send(cart);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

export default router;
