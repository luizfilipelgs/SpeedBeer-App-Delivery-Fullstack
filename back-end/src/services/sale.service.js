const Sequelize = require('sequelize');
const { Products, Sales, SalesProducts, User } = require('../database/models');
const config = require('../database/config/config');
const statusCode = require('../utils/statusCode');
const { processError } = require('../utils/handleError');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const register = async (newSale) => {
  const t = await sequelize.transaction();
  try {
    const { userId, sellerId, deliveryAddress, deliveryNumber, products, totalPrice } = newSale;
    const sale = await Sales.create(
      { userId, sellerId, deliveryAddress, deliveryNumber, status: 'Pendente', totalPrice }, 
      { transaction: t },
      );
      
    await SalesProducts
     .bulkCreate(products
      .map(({ id, quantity }) => ({ quantity, productId: id, saleId: sale.id })), 
     { transaction: t });

    await t.commit();

    return { message: sale };
  } catch (error) {
    await t.rollback();
    const { type, message } = processError(error);
    return { type, message };
  }
};

const getOrder = async (userId) => {
  try {
    const orderUser = await Sales.findAll({ where: { userId } });
    return { message: orderUser };    
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const getDetails = async (saleId) => {
  try {
    const saleDetails = await Sales.findByPk(saleId, {
      include: [
        { model: User, as: 'seller', attributes: ['id', 'name'] }, 
        { model: Products, as: 'products', through: { attributes: ['quantity'] } },
      ],
    });
  
    return { message: saleDetails };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const getAllSellers = async () => {
  try {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    return { message: sellers };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const getSeller = async (sellerId) => {
  try {
    const salesUser = await Sales.findAll({ where: { sellerId } });
    return { message: salesUser };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const update = async (saleId, newStatus) => {
  const allStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  if (!allStatus.includes(newStatus)) {
    return { type: statusCode.INVALID_VALUE, message: 'Invalid status' };
  }
  try {
    await Sales.update({ status: newStatus }, {
      where: { id: saleId },
    });
    return { message: 'Status updated' };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

module.exports = {
  register,
  getOrder,
  getDetails,
  getAllSellers,
  getSeller,
  update,
};