const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    // static associate(models) {
    //   // define association here
    //   Customer.belongsTo(models.Workspace, {
    //     foreignKey: 'workspaceId'
    //   });
    // }
  }

  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerEmail: DataTypes.STRING,
    signupDate: DataTypes.DATE,
    paymentUniqueId: DataTypes.STRING,
    // workspaceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });

  return Customer;
};
