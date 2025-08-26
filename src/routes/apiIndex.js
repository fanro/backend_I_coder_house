const express = require('express');
const router = express.Router();

// Importar routers específicos
const productsRouter = require('./products');
const cartsRouter = require('./carts');
const filesRouter = require('./files');

// Configurar rutas
router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/files', filesRouter);

module.exports = router;
