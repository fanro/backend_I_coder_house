const express = require('express');
const router = express.Router();
const { ProductManager } = require('../dao/ProductManager');

router.get('/realtimeproducts', async (req, res) => {
  let productos = [];

  try {
    productos = await ProductManager.getProducts();
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }

  res.render('realTimeProducts', {
    productos,
  });
});

module.exports = router;
