import { productsModel } from './models/productsModel.js';

export class ProductsMongoManager {
  static async getProducts(limit = 10, page = 1, sort = null, query = null) {
    // return await productsModel.find().lean();
    return await productsModel.paginate(query, {
      lean: true,
      limit,
      page,
      sort,
    });
  }

  static async getProductBy(filtro = {}) {
    return await productsModel.findOne(filtro).lean(); // {color:"green"}
  }

  static async createProduct(product) {
    return await productsModel.create(product);
  }

  static async updateProduct(id, product) {
    // return await productsModel.updateOne({_id: id}, product)
    // return await productsModel.findOneAndUpdate({_id:id}, product)
    return await productsModel.findByIdAndUpdate(id, product, { new: true });
  }

  static async deleteProduct(id) {
    // return await productsModel.deleteOne({_id: id})
    return await productsModel.findByIdAndDelete(id);
  }
}
