import express from 'express';
const router = express.Router();
import { ProductManager } from '../dao/ProductManager.js';
import { ProductsMongoManager } from '../dao/ProductMongoManager.js';

router.get('/realtimeproducts', async (req, res) => {
  try {
    let { docs: productos } = await ProductsMongoManager.getProducts();
    res.render('realTimeProducts', {
      productos,
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send({ error: 'Error al obtener productos' });
  }
});

export default router;
