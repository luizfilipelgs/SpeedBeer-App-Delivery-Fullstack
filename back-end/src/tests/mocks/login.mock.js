const md5 = require("md5");

const userMocks = {
  dataValues: {
    id: 1,
    name: 'Nome Qualquer',
    email: 'email@qualquer.com',
    password: md5('apenasUmaSenha')
  }
};

const validLogin = {
  email: "email@qualquer.com",
  password: "apenasUmaSenha"
};

const wrongEmail = {
  email: "emailqualquer.com",
  password: "apenasUmaSenha2"
};

const wrongPass = {
  email: "email@qualquer.com",
  password: "apenasUmaSenha2"
};

const loginWithoutEmail = {
  password: "apenasUmaSenha"
};

const loginWithoutPass = {
  email: "email@qualquer.com"
};

const loginInvalidEmail = {
  email: "email@qualquer.com",
  password: "apenasUmaSenha"
}

const loginInvalidPass = {
  email: "user@user.com",
  password: "apenasUmaSenha"
}

module.exports = {
  userMocks,
  validLogin,
  loginWithoutEmail,
  loginWithoutPass,
  loginInvalidEmail,
  loginInvalidPass,
  wrongPass,
  wrongEmail,
}