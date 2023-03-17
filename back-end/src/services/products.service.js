const { Products } = require('../database/models');
const { processError } = require('../utils/handleError');

const getAll = async () => {
  try {
    const products = await Products.findAll();
    return { message: products };    
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };   
  }
};

module.exports = {
  getAll,
};