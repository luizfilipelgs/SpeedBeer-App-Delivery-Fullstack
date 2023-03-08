const md5 = require('md5');
const { User } = require('../database/models');
const mapError = require('../utils/mapError');
const { createToken } = require('../auth/jsonWebToken');

const createUser = async (name, email, password) => {
  try {
    const result = await User.findAll({ where: { name } });
    if (result.length > 0) return { message: 'Nome de usuário ja existe', type: mapError.CONFLICT };
    const newUser = await User.create({
      name, email, password: md5(password), role: 'customer',
    });
    if (newUser) {
      const { dataValues } = newUser;
      delete dataValues.password;
      const token = createToken(dataValues);
      return { message: { ...dataValues, token } };
    }
    return { message: 'Erro ao cadastrar usuário', type: mapError.UNAUTHORIZED };
  } catch (error) {
    console.log(error);
    return { message: 'Email ja está cadastrado', type: mapError.CONFLICT };
  }
};

const createUserByAdm = async (name, email, password, role) => {
  try {
    const result = await User.findOne({ where: { email } });
    if (result) return { message: 'Usuário já existe', type: mapError.CONFLICT };
    const newUser = await User.create({
      name, email, password: md5(password), role,
    });
    if (newUser) {
      const { dataValues } = newUser;
      delete dataValues.password;
      const token = createToken(dataValues);
      return { message: { ...dataValues, token } };
    }
    return { message: 'Erro ao cadastrar usuário', type: mapError.UNAUTHORIZED };
  } catch (error) {
    console.log(error);
    return { message: 'Email ja está cadastrado', type: mapError.CONFLICT };
  }
};

module.exports = { createUser, createUserByAdm };