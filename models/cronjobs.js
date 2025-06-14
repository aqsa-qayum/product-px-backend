const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CronJobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CronJobs.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  CronJobs.init({
    userId: DataTypes.INTEGER,
    dbSyncLastTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CronJobs',
  });
  return CronJobs;
};