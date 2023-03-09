const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    uniquie: true
  },
	title: {
		type: String,
    required: true
	},
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{ type: String }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = model('Product', productSchema);
module.exports = Product;
