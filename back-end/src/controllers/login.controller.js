const loginService = require("../services/login.service");

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

module.exports = { postLogin, getAllUsers };
