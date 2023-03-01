const registerService = require('../services/register.service');
const errorMap = require('../utils/mapError');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { message, type } = await registerService.createUser(name, email, password);
    
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };