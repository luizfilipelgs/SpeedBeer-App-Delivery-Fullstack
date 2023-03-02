const { Products } = require('../database/models');

const getAll = async () => {
  try {
    const products = await Products.findAll();
    return { message: products };    
  } catch (error) {
    console.log(error);    
  }
};

module.exports = {
  getAll,
};