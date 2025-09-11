import express from 'express';
const router = express.Router();
import { ProductManager } from '../dao/ProductManager.js';
import { ProductsMongoManager } from '../dao/ProductMongoManager.js';

router.get('/realtimeproducts', async (req, res) => {
  let productos = [];

  try {
    productos = await ProductsMongoManager.getProducts();
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }

  res.render('realTimeProducts', {
    productos,
  });
});

export default router;
