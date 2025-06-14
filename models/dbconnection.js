const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DbConnection extends Model {
    static associate(models) {
      // define association here
    }
  }
  DbConnection.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.STRING,
    connectionString: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DbConnection',
  });
  return DbConnection;
};