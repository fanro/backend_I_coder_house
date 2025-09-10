const mongoose = require('mongoose');

const conectarDB = async (url, dbName) => {
  try {
    await mongoose.connect(url, {
      dbName,
    });

    console.log(`DB online!`);
  } catch (error) {
    console.log(`Error al conectar a db: ${error.message}`);
  }
};

module.exports = { conectarDB };
