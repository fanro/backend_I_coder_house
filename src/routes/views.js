const express = require('express');
const router = express.Router();
const { ProductManager } = require('../dao/ProductManager');

router.get('/pruebas', (req, res) => {
  let { nombre } = req.query;

  let titulo = `Prueba motor de plantillas`;
  let mensaje = `Pruebas...`;
  if (nombre) {
    mensaje += `. Hola ${nombre}`;
  }

  res.render('prueba', {
    titulo,
    mensaje,
  });
});

router.get('/productos', async (req, res) => {
  let productos = [];

  let { orden, total } = req.query;

  if (!orden) {
    orden = '1234';
  }

  if (!total) {
    total = '4500';
  }

  try {
    productos = await ProductManager.getProducts();
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }

  res.render('productos', {
    productos,
    orden,
    total,
  });
});

module.exports = router;
