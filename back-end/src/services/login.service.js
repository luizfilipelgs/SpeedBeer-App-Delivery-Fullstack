const md5 = require("md5");
const { User } = require("../database/models");
const mapError = require("../utils/mapError");
const { createToken } = require("../auth/jsonWebToken");

const postLogin = async (email, password) => {
  try {
    const result = await User.findOne({ where: { email } });
    console.log(mapError.NOT_FOUND);
    if (!result) {
      return { message: "Usuario não cadastrado", type: mapError.NOT_FOUND };
    }
    const { dataValues } = result;

    const passwordDecoded = md5(password);

    if (dataValues && passwordDecoded === dataValues.password) {
      delete dataValues.password;
      const token = createToken(dataValues);
      const user = { ...dataValues, token };
      return { message: user };
    }

    return {
      message: "Email ou senha Incorretos",
      type: mapError.UNAUTHORIZED,
    };
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return { message: users };
  } catch (e) {
    console.log(e);
    return { type: mapError.INTERNAL_SERVER_ERROR, message: MSG_ERROR_500 };
  }
};

module.exports = { postLogin, getAllUsers };
