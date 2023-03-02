const { Product } = require('../database/models/products');

const getAll = async () => {
  try {
    const products = await Product.findAll();
    return { message: products };    
  } catch (error) {
    console.log(error);    
  }
};

module.exports = {
  getAll,
};