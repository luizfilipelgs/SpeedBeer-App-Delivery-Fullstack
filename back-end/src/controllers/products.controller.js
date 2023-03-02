const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  try {
    const { message } = await productsService.getAll();
    return res.status(200).json(message);    
  } catch (error) {
    console.log(error);    
  }
};

module.exports = {
  getAll,
};