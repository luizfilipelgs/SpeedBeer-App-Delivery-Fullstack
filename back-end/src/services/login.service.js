import mapError from '../utils/mapError';

const md5 = require('md5');
const { User } = require('../database/models');

const postLogin = async (email, password) => {
  try {
    const result = await User.findOne({ where: { email } });
    if (!result) { return { message: 'Usuario não cadastrado', type: mapError.NOT_FOUND }; }
    const { dataValues } = result;

    const passwordDecoded = md5(password);

    if (dataValues && passwordDecoded === dataValues.password) {
      delete dataValues.password;
      return { message: dataValues };
    }

    return { message: 'Email ou senha Incorretos', type: mapError.UNAUTHORIZED };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postLogin };
