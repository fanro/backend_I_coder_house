const fs = require('fs');

class CartsManager {
  static rutaDatos = '';

  static async getCarts() {
    if (fs.existsSync(this.rutaDatos)) {
      return JSON.parse(await fs.promises.readFile(this.rutaDatos, 'utf-8'));
    } else {
      return [];
    }
  }

  static async getCartById(id) {
    let carts = await this.getCarts();

    let cart = carts.find((c) => c.id == id);
    if (!cart) {
      return `No existen carritos con id ${id}`;
    }

    return cart;
  }
}

module.exports = { CartsManager };
