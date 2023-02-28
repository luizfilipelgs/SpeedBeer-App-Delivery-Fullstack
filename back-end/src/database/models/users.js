module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    modelName: 'users',
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sales, { foreignKey: 'userId', as: 'userSales' });
    User.hasMany(models.Sales, { foreignKey: 'sellerId', as: 'sellerSales' });
  };

  return User;
};

