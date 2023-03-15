const md5 = require('md5');
const { User } = require('../database/models');
const statusCode = require('../utils/statusCode');
const { createToken } = require('../auth/jsonWebToken');
const { processError } = require('../utils/handleError');

const tokenize = (newUser) => {
  const { dataValues } = newUser;
  delete dataValues.password;
  const token = createToken(dataValues);
  return { message: { ...dataValues, token } };
};

const createUser = async (name, email, password) => {
  try {
    const result = await User.findAll({ where: { name } });
    if (result.length > 0) {
      return { message: 'Nome de usuário ja existe', type: statusCode.CONFLICT }; 
    }
    const newUser = await User.create({
      name, email, password: md5(password), role: 'customer',
    });
    if (newUser) return tokenize(newUser);
    return { message: 'Erro ao cadastrar usuário', type: statusCode.UNAUTHORIZED };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

const createUserByAdm = async (name, email, password, role) => {
  try {
    const result = await User.findOne({ where: { email } });
    if (result) return { message: 'Usuário já existe', type: statusCode.CONFLICT };
    const newUser = await User.create({
      name, email, password: md5(password), role,
    });
    if (newUser) return tokenize(newUser);
    return { message: 'Erro ao cadastrar usuário', type: statusCode.UNAUTHORIZED };
  } catch (error) {
    const { type, message } = processError(error);
    return { type, message };
  }
};

module.exports = { createUser, createUserByAdm };