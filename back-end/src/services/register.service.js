const md5 = require('md5');
const { User } = require('../database/models');

const createUser = async (name, email, password) => {
  try {
    const result =  await User.findAll({ where: { name } });
    console.log(result);
    if (result.length > 0) { return { message: 'Nome de usuário ja existe', type: 'CONFLICT' }; }

    const newUser = await User.create({
      name,
      email,
      password: md5(password),
      role: 'customer',
    });

    if (newUser) {
      const { dataValues } = newUser;
      console.log(dataValues);
      delete dataValues.password;
      return { message: dataValues };
    }

    return { message: 'Erro ao cadastrar usuário', type: 'UNAUTHORIZED' };
  } catch (error) {
    console.log(error);
    return { message: 'Email ja está cadastrado', type: 'CONFLICT' };
  }
};

module.exports = { createUser };