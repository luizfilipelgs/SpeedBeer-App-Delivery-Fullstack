const loginService = require('../services/login.service');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { message, type } = await loginService.postLogin(email, password);

    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, message } = await loginService.getAllUsers(+userId);

    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, message } = await loginService.remove(id);

    if (type) return res.status(type).json({ message });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { postLogin, getAllUsers, remove };
