const { ScrapeMaster, ScrapeFlights } = require('../models');

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
    updateScrapeById
}