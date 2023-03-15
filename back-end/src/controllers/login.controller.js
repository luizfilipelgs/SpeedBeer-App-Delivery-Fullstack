const loginService = require('../services/login.service');

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const { message, type } = await loginService.postLogin(email, password);

  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const getAllUsers = async (_req, res) => {
  const { type, message } = await loginService.getAllUsers();
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { type, message } = await loginService.remove(id);

  if (type) return res.status(type).json(message);
  return res.status(204).end();
};

module.exports = { postLogin, getAllUsers, remove };
