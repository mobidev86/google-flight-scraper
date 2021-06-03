'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScrapeFlights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScrapeFlights.belongsTo(models.ScrapeMaster, {
        foreignKey: 'id',
        as: 'Scrape'
      });
    }
  };
  ScrapeFlights.init({
    _scrape_id: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
    duration: DataTypes.STRING,
    stops: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScrapeFlights',
  });
  return ScrapeFlights;
};