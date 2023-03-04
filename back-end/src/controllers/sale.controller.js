const saleService = require('../services/sale.service');
const { verifyToken } = require('../auth/jsonWebToken');

const register = async (req, res) => {
  try {
    const newSale = req.body;
    const token = req.header('Authorization');
    const tokenValidate = verifyToken(token);

    if (tokenValidate.type) {
      return res.status(tokenValidate.type).json(tokenValidate.message);
    }
    const { type, message } = await saleService.register(newSale);
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await saleService.getOrder(+id);
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getDetails = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { type, message } = await saleService.getDetails(+saleId);
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getAllSellers = async (_req, res) => {
  try {
    const { type, message } = await saleService.getAllSellers();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { type, message } = await saleService.getSeller(+sellerId);
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { newStatus } = req.body;
    const { type, message } = await saleService.update(saleId, newStatus);
    if (type) return res.status(type).json({ message });
    return res.status(202).json(message);
  } catch (error) {
    console.log(error);
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