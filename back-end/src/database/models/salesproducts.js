'use strict';
const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'salesProducts',
    timestamps: false,
  });
  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale' });
    SalesProducts.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
  return SalesProducts;
};

module.exports = SalesProductsModel;