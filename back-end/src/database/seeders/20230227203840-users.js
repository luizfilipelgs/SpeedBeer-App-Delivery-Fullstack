const md5 = require('md5');

const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: md5('--adm2@21!!--', saltRounds),
        role: 'admin',
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: md5('fulana@123', saltRounds),
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: md5('$#zebirita#$', saltRounds),
        role: 'customer',
      },
    ];

    await queryInterface.bulkInsert('users', usersData, {timestamps: false});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
