const loginService = require('../services/login.service');
const errorMap = require('../utils/mapError');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { message, type } = await loginService.postLogin(email, password);
    
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    return res.status(200).json(message);

  } catch (error) {
    console.log(error);
  }
};

module.exports = {postLogin};
