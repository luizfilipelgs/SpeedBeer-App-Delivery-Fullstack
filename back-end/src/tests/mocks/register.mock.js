const validRegister = {
  name: 'Nome Qualquer',
  email: 'email@qualquer.com',
  password: 'senhaQualquer',
};

const registerWithoutName = {
  email: 'email@qualquer.com',
  password: 'senhaQualquer',
};

const registerWithoutEmail = {
  name: 'Nome Qualquer',
  password: 'senhaQualquer',
};

const registerWithoutPass = {
  name: 'Nome Qualquer',
  email: 'email@qualquer.com',
};

const registerMocks = {
  user: {
    name: 'Nome Qualquer',
    email: 'email@qualquer.com',
    password: 'senhaQualquer',
  },
};
const newUserMock = {
  dataValues: {
    id: 4,
    name: 'Nome Qualquer',
    email: 'email@qualquer.com',
    password: 'senhaQualquer',
    role: 'customer',
  },
};

const registerDuplicate = {
  user: {
    name: 'Fulana Pereira ',
    email: 'fulana@deliveryapp.com',
    password: 'senhaQualquer',
  },
}

module.exports = {
  validRegister,
  registerWithoutName,
  registerWithoutEmail,
  registerWithoutPass,
  registerMocks,
  newUserMock,
  registerDuplicate,
};
