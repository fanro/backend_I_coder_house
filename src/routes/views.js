const express = require('express');
const router = express.Router();

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
  // res.setHeader('Content-Type','application/json')
  // res.status(200).json({})
});

module.exports = router;
