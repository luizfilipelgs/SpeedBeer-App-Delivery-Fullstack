const saleService = require('../services/sale.service');
const { verifyToken } = require('../auth/jsonWebToken');

const register = async (req, res) => {
  const newSale = req.body;
  const token = req.header('Authorization');
  const tokenValidate = verifyToken(token);
  if (!tokenValidate.data) {
    return res.status(tokenValidate.type).json(tokenValidate.message);
  }
  const { type, message } = await saleService.register(newSale);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getOrder = async (req, res) => {
  const { userId } = req.params;
  const { type, message } = await saleService.getOrder(+userId);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getDetails = async (req, res) => {
  const { saleId } = req.params;
  const { type, message } = await saleService.getDetails(+saleId);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getSeller = async (req, res) => {
  const { sellerId } = req.params;
  const { type, message } = await saleService.getSeller(+sellerId);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const update = async (req, res) => {
  const { saleId, newStatus } = req.body;
  const { type, message } = await saleService.update(saleId, newStatus);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  register,
  getOrder,
  getDetails,
  getSeller,
  update,
};