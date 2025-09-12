import mongoose from 'mongoose';

const schemaProduct = new mongoose.Schema(
  {
    title: String,
    description: String,
    code: {
      type: String,
      unique: true,
    },
    price: Number,
    stock: {
      type: Number,
      default: 0,
    },
    descrip: String,
  },
  {
    timestamps: true,
    //strict: true, default true, para que no guarde campos no definidos en el schema
    // collection: 'productos',
  }
);

export const productsModelo = mongoose.model('products', schemaProduct);
