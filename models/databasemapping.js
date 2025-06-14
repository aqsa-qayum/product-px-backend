const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatabaseMapping extends Model {
    static associate(models) {
      // DatabaseMapping belongs to Organization
    }
  }
  
  DatabaseMapping.init({
    userId: DataTypes.INTEGER,
    tableName: DataTypes.STRING,
    mappingFields: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'DatabaseMapping',
  });
  return DatabaseMapping;
};