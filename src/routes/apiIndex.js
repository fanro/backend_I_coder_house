const express = require('express');
const router = express.Router();

// Importar routers específicos
const productsRouter = require('./products');
const cartsRouter = require('./carts');

// Configurar rutas
router.use('/products', productsRouter);
router.use('/carts', cartsRouter);

module.exports = router;
