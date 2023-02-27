'use strict';
const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer', 'seller'),
      allowNull: false,
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  });
  return User;
};

module.exports = UserModel;