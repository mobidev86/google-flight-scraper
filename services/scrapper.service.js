const { ScrapeMaster, ScrapeFlights, ScrapeDailyFlights, sequelize } = require('../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const findScrapeByRoute = async ({ origin, destination }) => {
    try {
        return await ScrapeMaster.findOne({
            returning: true,
            where: {
                origin,
                destination
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

const findAllScrapes = async () => {
    try {
        return await ScrapeMaster.findAll({
            include: [
                {
                    model: ScrapeFlights,
                    as: 'Flights',
                    required: false,
                },
            ],
            order: [
                ['updatedAt', 'DESC'],
            ],
        })
    } catch (error) {
        throw new Error(error);
    }
}

const findFlightsByRoute = async ({ origin, destination }) => {
    try {
        let scrape = await findScrapeByRoute({ origin, destination })
        if (scrape && scrape.dataValues) {
            return await ScrapeFlights.findAll({
                where: {
                    _scrape_id: scrape.dataValues.id
                }
            })
        } else {
            return []
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getRouteChartPrice = async ({ origin, destination }) => {
    try {
        let scrape = await findScrapeByRoute({ origin, destination })
        if (scrape && scrape.dataValues) {
            let scrapeId = scrape.dataValues.id;
            let data = await ScrapeDailyFlights.findAll({
                attributes: [
                    [sequelize.fn('date_trunc', 'day', sequelize.col('flight_datetime')), 'flightDate'],
                    [sequelize.fn('AVG', sequelize.col('price')), 'price_average']
                ],
                where: {
                    _scrape_id: scrapeId
                },
                group: 'flightDate'
            })
            return data;
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
}

const createNewScrape = async (data) => {
    try {
        return await ScrapeMaster.create(data);
    } catch (error) {
        throw new Error(error);
    }
}

const createScrapeFlights = async (flights) => {
    try {
        return await ScrapeFlights.bulkCreate(flights);
    } catch (error) {
        throw new Error(error);
    }
}

const saveScrapeDailyFlights = async (flights) => {
    try {
        return await ScrapeDailyFlights.bulkCreate(flights);
    } catch (error) {
        throw new Error(error);
    }
}

const checkScrapeRouteTodayDataExists = async (scrapeId, flightDate) => {
    try {
        let todaysScrapeForRoute = await ScrapeDailyFlights.findAll({
            returning: true,
            where: {
                [Op.and]: [
                    { _scrape_id: scrapeId },
                    {
                        flight_datetime: {
                            [Op.gte]: flightDate,
                        }
                    }
                ]
            }
        })
        return todaysScrapeForRoute;
    } catch (error) {
        throw new Error(error);
    }
}


const removeScrapeFlights = async (scrapeId) => {
    try {
        return await ScrapeFlights.destroy({
            where: {
                _scrape_id: scrapeId
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

const updateScrapeById = async (scrapeId, data) => {
    return await ScrapeMaster.update(data, {
        returning: true,
        where: {
            id: scrapeId
        }
    })
}

module.exports = {
    createNewScrape,
    findScrapeByRoute,
    createScrapeFlights,
    removeScrapeFlights,
    findFlightsByRoute,
    findAllScrapes,
    updateScrapeById,
    saveScrapeDailyFlights,
    getRouteChartPrice,
    checkScrapeRouteTodayDataExists
}