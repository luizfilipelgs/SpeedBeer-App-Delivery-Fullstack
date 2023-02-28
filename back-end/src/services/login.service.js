const { User } = require('../database/models');
const md5 = require('md5');

const postLogin = async (email, password) => {
  try {
    const result = await User.findOne({ where: { email } });
    if (!result) return { message: 'Usuario não cadastrado', type: 'NOT_FOUND' };
    const { dataValues } = result;
    
    const passwordDecoded = md5(password);
  
    if (dataValues && passwordDecoded === dataValues.password) {
      delete dataValues.password
      return { message: dataValues };
    }

    return { message: 'Email ou senha Incorretos', type: 'UNAUTHORIZED' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {postLogin};
