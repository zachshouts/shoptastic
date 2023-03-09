const connection = require('../config/connection')
const mongoose = require('mongoose');
const { Category, Product, User, Order } = require ('../models');
const { 
  productData, 
  userData, 
  categoryData,
} = require ('./seeds')

connection.on('error', (err) => err);

connection.once('open', async () => {

  console.log('connected');

  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  const products = [];

  productData.map((item) => {
    const id = new mongoose.Types.ObjectId();
    item = { _id: id, ...item}
    productIds.push(id);
  })
  
  
})


