const fs = require('fs');

class ProductsManager {
  static rutaDatos = '';

  static async getProducts() {
    if (fs.existsSync(this.rutaDatos)) {
      return JSON.parse(await fs.promises.readFile(this.rutaDatos, 'utf-8'));
    } else {
      return [];
    }
  }
}

module.exports = { ProductsManager };
