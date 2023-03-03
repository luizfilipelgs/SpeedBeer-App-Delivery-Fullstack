const Sequelize = require('sequelize');
const { Product, Sale, SalesProduct, User } = require('../database/models');
const config = require('../database/config/config');
const mapError = require('../utils/mapError');

const MSG_ERROR_500 = 'internal serve error';
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const priceCalculator = (products, cart) => Number((products.reduce((accumulator, product) => {
  const { quantity } = cart.find(({ productId }) => product.id === productId);
    return quantity * product.price + accumulator;
  }, 0)).toFixed(2));

const register = async (newSale) => {
  const { userId, sellerId, deliveryAddress, deliveryNumber, cart } = newSale;

  const products = await Product.findAll({ where: { id: cart.map(({ productId }) => productId) } });

  const t = await sequelize.transaction();
  try {
    const totalPrice = priceCalculator(products, cart);
    const sale = await Sale.create(
      { userId, sellerId, deliveryAddress, deliveryNumber, status: 'Pendente', totalPrice }, 
      { transaction: t },
    );
  
    await SalesProduct
     .bulkCreate(cart.map(({ productId, quantity }) => ({ quantity, productId, saleId: sale.id })), 
     { transaction: t });

    await t.commit();

    return { message: sale };
  } catch (_e) {
    await t.rollback();
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const getOrder = async (userId) => {
  try {
    const orderUser = await Sale.findAll({ where: { user: userId } });
    return { message: orderUser };    
  } catch (_e) {
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const getDetails = async (saleId) => {
  try {
    const saleDetails = await Sale.findOne(
      { 
        where: { id: saleId },
        attributes: { exclude: ['sellerId'] },
        include: [
          { model: User, as: 'seller', attributes: ['id', 'name'] }, 
          { model: Product, as: 'products', through: { attributes: ['quantity'] } },
        ],
      },
    );
    return { message: saleDetails };  
  } catch (_e) {
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const getSales = async (sellerId) => {
  try {
    const salesUser = await Sale.findAll({ where: { seller: sellerId } });
    return { message: salesUser };
  } catch (_e) {
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const update = async (saleId, newStatus) => {
  const allStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  if (!allStatus.includes(newStatus)) {
    return { type: mapError.INVALID_VALUE, message: 'Invalid status' };
  }
  try {
    await Sale.update({ status: newStatus }, {
      where: {
        id: saleId,
      },
    });
    return { message: 'Status updated' };
  } catch (error) {
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

module.exports = {
  register,
  getOrder,
  getDetails,
  getSales,
  update,
};