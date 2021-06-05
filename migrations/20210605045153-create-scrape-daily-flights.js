'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ScrapeDailyFlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _scrape_id: {
        type: Sequelize.INTEGER
      },
      origin: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.STRING
      },
      arrival: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      stops: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      flight_datetime: {
        type: Sequelize.DATE
      },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ScrapeDailyFlights');
  }
};