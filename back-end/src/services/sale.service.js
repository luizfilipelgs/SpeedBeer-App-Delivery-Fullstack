const Sequelize = require('sequelize');
const { Products, Sales, SalesProducts, User } = require('../database/models');
const config = require('../database/config/config');
const mapError = require('../utils/mapError');

const MSG_ERROR_500 = 'internal serve error';
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const register = async (newSale) => {
  const { userId, sellerId, deliveryAddress, deliveryNumber, products, totalPrice } = newSale;
  const t = await sequelize.transaction();
  try {
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
  } catch (e) {
    await t.rollback();
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const getOrder = async (userId) => {
  try {
    const orderUser = await Sales.findAll({ where: { userId } });
    return { message: orderUser };    
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
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
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};
const getAllSellers = async () => {
  try {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    return { message: sellers };
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const getSeller = async (sellerId) => {
  try {
    const salesUser = await Sales.findAll({ where: { sellerId } });
    return { message: salesUser };
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

const update = async (saleId, newStatus) => {
  const allStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  if (!allStatus.includes(newStatus)) {
    return { type: mapError.INVALID_VALUE, message: 'Invalid status' };
  }
  try {
    await Sales.update({ status: newStatus }, {
      where: { id: saleId },
    });
    return { message: 'Status updated' };
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
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