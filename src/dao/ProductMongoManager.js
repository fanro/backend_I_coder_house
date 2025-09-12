import { productsModelo } from './models/productsModel.js';

export class ProductsMongoManager {
  static async getProducts() {
    return await productsModelo.find().lean();
  }

  static async getProductBy(filtro = {}) {
    return await productsModelo.findOne(filtro).lean(); // {color:"green"}
  }

  static async createProduct(product) {
    return await productsModelo.create(product);
  }

  static async updateProduct(id, product) {
    // return await productsModelo.updateOne({_id: id}, product)
    // return await productsModelo.findOneAndUpdate({_id:id}, product)
    return await productsModelo.findByIdAndUpdate(id, product, { new: true });
  }

  static async deleteProduct(id) {
    // return await productsModelo.deleteOne({_id: id})
    return await productsModelo.findByIdAndDelete(id);
  }
}
