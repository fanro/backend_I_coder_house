import mongoose from 'mongoose';

export const productosModelo = mongoose.model(
  'productos',
  new mongoose.Schema(
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
    }
  )
);
