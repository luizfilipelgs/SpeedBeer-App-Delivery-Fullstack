'use strict';
const ProductsModel = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'url_image',
    },
  }, {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'products',
  });
  return Products;
};

module.exports = ProductsModel;