const chalk = require('chalk');
const utils = require('./index');
const { scrappingForRoute } = require('../scrapper');
const { updateFlightsForRoute, saveFlightsForRoute } = require('../cron/cron.handler');


const handleScrappingAndManipulation = async (args) => {
    try {
        let { flightResults, inputProps } = await scrappingForRoute(args);
        await updateFlightsForRoute(flightResults, inputProps)
        await saveFlightsForRoute(flightResults, inputProps);
        return;
    } catch (error) {
        console.log(chalk.red("Handle Scrapping Manipulation Error:", error.message))
        return Promise.resolve();
    }
}


(async () => {
    try {
        console.log(chalk.green.bgWhite("Initial Scrapping Start..."))
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
        console.log(chalk.green.bgWhite("Initial Scrapping Over..."))
    } catch (error) {
        console.log('Error Inital Scrapping For All Routes=>', error)
    }
})();

