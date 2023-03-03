const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  // this field is for the qrcode.
  img: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  // this is for the product image 
  prodtImage:
  {
    type: String,
    required: true,
  },
  // color: String,
  price: { type: Number, required: true },
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Product", ProductSchema);
// avilableQty: { type: Number },
// size: String,