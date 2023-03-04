'use strict';
module.exports = (sequelize, DataTypes) => {
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
    timestamps: false,
    modelName: 'sales_products',
  });
  
  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales, { 
      as: 'products', 
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
    models.Sales.belongsToMany(models.Products, { 
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
  }

  return SalesProducts;
};
