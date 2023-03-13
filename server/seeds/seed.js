const connection = require('../config/connection')
const mongoose = require('mongoose');
const { Category, Product, User, Order } = require ('../models');
const productData  = require ('../seeds/productData.json');
const [ userData ] = require ('../seeds/userData.json');
const categoryData = require ('../seeds/categoryData.json');
const { insertMany } = require('../models/User');

connection.on('error', (err) => err);

connection.once('open', async () => {

  console.log('connected');
  // console.log([productData]);
  // console.log([userData]);
  // console.log([categoryData]);

  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  const products = [];
  const category = [];

  productData.map( async (item) => {
    const id = new mongoose.Types.ObjectId();
    item = { _id: id, ...item}
    console.log(item)
    products.push(id);    
    await Product.collection.insertOne(item)
  })
  // console.log(products);
  // console.log([productData])

  // categoryData.map( async () => {
  //   category = {this.name}
  //   await Catefory.collection.insertOne()
  

  // })

})


