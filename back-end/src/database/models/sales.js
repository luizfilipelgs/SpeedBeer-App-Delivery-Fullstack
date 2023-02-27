'use strict';

const SalesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },{
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'sales',
  });
  return Sales;
};

module.exports = SalesModel;
