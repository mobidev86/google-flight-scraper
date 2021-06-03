'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScrapeMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScrapeMaster.hasMany(models.ScrapeFlights, {
        foreignKey: '_scrape_id',
        as: 'Flights'
      });
    }
  };
  ScrapeMaster.init({
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScrapeMaster',
  });
  return ScrapeMaster;
};