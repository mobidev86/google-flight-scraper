const moment = require('moment');
const { scrappingForRoute } = require('../scrapper');
const {
    createNewScrape,
    findScrapeByRoute,
    createScrapeFlights,
    removeScrapeFlights,
    updateScrapeById,
    saveScrapeDailyFlights,
    checkScrapeRouteTodayDataExists
} = require('../services/scrapper.service');
const chalk = require('chalk');
const utils = require('../utils');


const updateFlightsForRoute = async (flights, props) => {
    try {
        if (flights.length) {
            let isScrapeRouteExist = await findScrapeByRoute({
                origin: props.origin,
                destination: props.destination
            })
            if (!isScrapeRouteExist) {
                console.log("New Route ==>", props.origin, "<->", props.destination)
                let orig = props.origin.substring(0, 3);
                let dest = props.destination.substring(0, 3);
                let current = moment().format('YYYY MMM Do h:mm a').replace(/\s+/g, '-');
                let tag = orig + '-' + dest + '-' + current;
                let { dataValues } = await createNewScrape({
                    origin: props.origin,
                    destination: props.destination,
                    tag
                })

                if (dataValues) {
                    let updatedFlights = flights.map(flight => {
                        return {
                            _scrape_id: dataValues.id,
                            origin: flight.origin,
                            destination: flight.destination,
                            departure: flight.departTime,
                            arrival: flight.arrivalTime,
                            duration: flight.duration,
                            stops: flight.stops,
                            price: flight.price
                        }
                    })
                    await createScrapeFlights(updatedFlights);
                }
            }

            if (isScrapeRouteExist) {
                console.log("Old Route ==>", props.origin, "<->", props.destination)
                await removeScrapeFlights(isScrapeRouteExist.dataValues.id);
                let orig = props.origin.substring(0, 3);
                let dest = props.destination.substring(0, 3);
                let current = moment().format('YYYY MMM Do h:mm a').replace(/\s+/g, '-');
                let tag = orig + '-' + dest + '-' + current;
                await updateScrapeById(isScrapeRouteExist.dataValues.id, { tag })

                let updatedFlights = flights.map(flight => {
                    return {
                        _scrape_id: isScrapeRouteExist.dataValues.id,
                        origin: flight.origin,
                        destination: flight.destination,
                        departure: flight.departTime,
                        arrival: flight.arrivalTime,
                        duration: flight.duration,
                        stops: flight.stops,
                        price: flight.price
                    }
                })
                await createScrapeFlights(updatedFlights);
            }
            return;
        } else {
            console.log("No flight for route...");
            return;
        }
    } catch (error) {
        console.log("Update flight for route error:", error)
        return error;
    }
}

const saveFlightsForRoute = async (flights, props) => {
    try {
        let isScrapeRouteExist = await findScrapeByRoute({
            origin: props.origin,
            destination: props.destination
        })


        if (isScrapeRouteExist) {
            let current = moment().format('YYYY-MM-DD');
            let todaysScrapesExistForRoute = await checkScrapeRouteTodayDataExists(isScrapeRouteExist.dataValues.id, current);
            if (todaysScrapesExistForRoute.length === 0) {
                let updatedFlights = flights.map(flight => {
                    let price = 0;
                    if (flight && flight.price && typeof flight.price == 'string') {
                        price = Number(flight.price.replace(/[^0-9]/g, ''));
                    }
                    return {
                        _scrape_id: isScrapeRouteExist.dataValues.id,
                        origin: flight.origin,
                        destination: flight.destination,
                        departure: flight.departTime,
                        arrival: flight.arrivalTime,
                        duration: flight.duration,
                        stops: flight.stops,
                        price,
                        flight_datetime: current
                    }
                })
                await saveScrapeDailyFlights(updatedFlights);
            }
        }

        if (!isScrapeRouteExist) {
            let orig = props.origin.substring(0, 3);
            let dest = props.destination.substring(0, 3);
            let current = moment().format('YYYY MMM Do h:mm a').replace(/\s+/g, '-');
            let tag = orig + '-' + dest + '-' + current;
            let { dataValues } = await createNewScrape({
                origin: props.origin,
                destination: props.destination,
                tag
            })

            if (dataValues) {
                let current = moment().format('YYYY-MM-DD');
                let todaysScrapesExistForRoute = await checkScrapeRouteTodayDataExists(dataValues.id, current);
                if (todaysScrapesExistForRoute.length === 0) {
                    let updatedFlights = flights.map(flight => {
                        let price = 0;
                        if (flight && flight.price && typeof flight.price == 'string') {
                            price = Number(flight.price.replace(/[^0-9]/g, ''))
                        }
                        return {
                            _scrape_id: dataValues.id,
                            origin: flight.origin,
                            destination: flight.destination,
                            departure: flight.departTime,
                            arrival: flight.arrivalTime,
                            duration: flight.duration,
                            stops: flight.stops,
                            price,
                            flight_datetime: current
                        }
                    })
                    await saveScrapeDailyFlights(updatedFlights);
                }
            }
        }
        return;
    } catch (error) {
        console.log("Save daily flight for route error:", error)
        return error;
    }
}



const handleScrappingAndManipulation = async (args) => {
    try {
        let { flightResults, inputProps } = await scrappingForRoute(args);
        await updateFlightsForRoute(flightResults, inputProps);
        await saveFlightsForRoute(flightResults, inputProps);
        return;
    } catch (error) {
        console.log(chalk.red("Handle Scrapping Manipulation Error:", error.message))
        return Promise.resolve();
    }
}


const scrapeDailyFlightsForRoutes = async () => {
    try {
        console.log(chalk.green.bgWhite("Cron Job Scrapping Start..."))
        let cities = utils.getCitiesForStaticRoutes();
        let routes = utils.createUniqRoutesFromCities(cities);
        let promises = [];

        for (var i = 0; i < routes.length; i++) {
            let route = routes[i];
            let { departureDate, returnDate } = utils.getDepartureToReturnDate();
            let options = {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                debug: false,
                origin: route.origin,
                destination: route.destination,
                departureDate,
                returnDate,
                tripType: 'roundTrip',
                flightClass: 'economy',
            }
            promises.push(await handleScrappingAndManipulation(options))
        }

        await Promise.all(promises);
        console.log(chalk.green.bgWhite("Cron Job Scrapping Over..."))
    } catch (error) {
        console.log('Error Inital Scrapping For All Routes=>', error)
    }
}








module.exports = {
    scrapeDailyFlightsForRoutes,
    updateFlightsForRoute,
    saveFlightsForRoute
};