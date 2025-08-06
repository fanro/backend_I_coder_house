const fs = require('fs');
const { ProductsManager } = require('./ProductsManager');

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
      throw new Error(`No existen carrito con id ${id}`);
    }

    cart.products = await Promise.all(
      cart.products.map(async (item) => {
        return {
          product: await ProductsManager.getProductById(item.product),
          quantity: item.quantity,
        };
      })
    );

    return cart;
  }

  static async addCart() {
    let carts = await this.getCarts();

    let id = 1;
    if (carts.length > 0) {
      id = Math.max(...carts.map((d) => d.id)) + 1;
    }

    let nuevoCarrito = {
      id,
      products: [],
    };

    carts.push(nuevoCarrito);

    await fs.promises.writeFile(this.rutaDatos, JSON.stringify(carts, null, 5));

    return nuevoCarrito;
  }
}

module.exports = { CartsManager };
