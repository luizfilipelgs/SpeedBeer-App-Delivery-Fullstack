const md5 = require('md5');
const { User } = require('../database/models');
const statusCode = require('../utils/statusCode');
const { createToken } = require('../auth/jsonWebToken');
const { processError } = require('../utils/handleError');

const postLogin = async (email, password) => {
  try {
    const result = await User.findOne({ where: { email } });
    if (!result) { return { message: 'Usuario não cadastrado', type: statusCode.NOT_FOUND }; }
    const { dataValues } = result;
    const passwordDecoded = md5(password);
    
    if (dataValues && passwordDecoded === dataValues.password) {
      delete dataValues.password;
      const token = createToken(dataValues);
      const user = { ...dataValues, token };
      return { message: user };
    }

    return { message: 'Email ou senha Incorretos', type: statusCode.UNAUTHORIZED };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return { message: users };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const remove = async (id) => {
  try {
    const destroyed = await User.destroy({ where: { id } });
    return destroyed > 0;
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

module.exports = { postLogin, getAllUsers, remove };
