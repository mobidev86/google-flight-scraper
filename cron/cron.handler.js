const initScrapping = require('../scrapper');
const {
    createNewScrape,
    findScrapeByRoute,
    createScrapeFlights,
    removeScrapeFlights,
    updateScrapeById
} = require('../services/scrapper.service');
const moment = require('moment');


const scrapeGoogleFlight = async () => {
    try {
        console.log("cron job hanler - scrapeGoogleFlight - called")
        let { flightResults, inputProps } = await initScrapping();
        console.log("Flights Length ===>", flightResults.length);
        if (flightResults.length) {
            let isScrapeRouteExist = await findScrapeByRoute({
                origin: inputProps.origin,
                destination: inputProps.destination
            })
            if (!isScrapeRouteExist) {
                console.log("New Route ==>", inputProps.origin, "<->", inputProps.destination)
                let orig = inputProps.origin.substring(0, 3);
                let dest = inputProps.destination.substring(0, 3);
                let current = moment().format('YYYY MMM Do h:mm a').replace(/\s+/g, '-');
                let tag = orig + '-' + dest + '-' + current;
                let { dataValues } = await createNewScrape({
                    origin: inputProps.origin,
                    destination: inputProps.destination,
                    tag
                })

                if (dataValues) {
                    let updatedFlights = flightResults.map(flight => {
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
                console.log("Old Route ==>", inputProps.origin, "<->", inputProps.destination)
                await removeScrapeFlights(isScrapeRouteExist.dataValues.id);
                let orig = inputProps.origin.substring(0, 3);
                let dest = inputProps.destination.substring(0, 3);
                let current = moment().format('YYYY MMM Do h:mm a').replace(/\s+/g, '-');
                let tag = orig + '-' + dest + '-' + current;
                let updateRes = await updateScrapeById(isScrapeRouteExist.dataValues.id, { tag })
                console.log("updateRes==>", updateRes)

                let updatedFlights = flightResults.map(flight => {
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
        } else {
            console.log("No flight for route")
        }
    } catch (error) {
        console.log("Scrape google flight error:", error)
    }
}

module.exports = {
    scrapeGoogleFlight
};