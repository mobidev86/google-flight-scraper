'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class ScrapeDailyFlights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScrapeDailyFlights.belongsTo(models.ScrapeMaster, {
        foreignKey: 'id',
        as: 'Scrape'
      });
    }
  };
  ScrapeDailyFlights.init({
    _scrape_id: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
    duration: DataTypes.STRING,
    stops: DataTypes.STRING,
    price: DataTypes.INTEGER,
    flight_datetime: {
      type: DataTypes.DATE,
      get() {
        const val = this.getDataValue('flight_datetime');
        return moment(val).format('YYYY-MM-DD')
      }
    }
  }, {
    sequelize,
    modelName: 'ScrapeDailyFlights',
  });
  return ScrapeDailyFlights;
};