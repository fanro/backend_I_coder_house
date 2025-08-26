const express = require('express');
const router = express.Router();
const { uploader } = require('../utils/utils.js');

router.post('/upload', uploader.single('imagen'), (req, res) => {
  if (!req.file) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `Archivo requerido` });
  }

  let tipoArchivo = req.file.mimetype;
  tipoArchivo = tipoArchivo.split('/')[0];

  if (tipoArchivo.toLowerCase() != 'image') {
    setTimeout(() => {
      fs.unlinkSync(req.file.path);
    }, 2000);

    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `Solo se admiten imagenes` });
  }

  let datosRecibidos = {
    archivo: req.file.originalname,
    archivoServer: req.file.filename,
    tipoArchivo: req.file.mimetype,
  };

  // insertar heroe en DB, y guardar allí el path req.file.path

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(datosRecibidos);
});

module.exports = router;
