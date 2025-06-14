/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerEmail: {
        type: Sequelize.STRING
      },
      signupDate: {
        type: Sequelize.DATE
      },
      paymentUniqueId: {
        type: Sequelize.STRING
      },
    // workspaceId: {
    //   type: Sequelize.INTEGER
    // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};