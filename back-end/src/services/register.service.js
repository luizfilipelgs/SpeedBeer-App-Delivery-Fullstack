import mapError from '../utils/mapError';

const md5 = require('md5');
const { User } = require('../database/models');

const createUser = async (name, email, password) => {
  try {
    const result = await User.findAll({ where: { name } });
    if (result.length > 0) { 
      return { message: 'Nome de usuário ja existe', type: mapError.CONFLICT };
    }

    const newUser = await User.create({
      name, email, password: md5(password), role: 'customer',
    });

    if (newUser) {
      const { dataValues } = newUser;
      delete dataValues.password;
      return { message: dataValues };
    }

    return { message: 'Erro ao cadastrar usuário', type: mapError.UNAUTHORIZED };
  } catch (error) {
    console.log(error);
    return { message: 'Email ja está cadastrado', type: mapError.CONFLICT };
  }
};

module.exports = { createUser };