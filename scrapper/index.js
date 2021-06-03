const Browser = require('./browser');
const ScrapperService = require('./scrapper');
const FlightList = require('./page-parser/flight-list')
const chalk = require('chalk');
const utils = require('../utils');

async function initScrapping() {
    try {
        let flightResults = [];
        const args = utils.getInputParameters();
        console.log("--------Input arguments----")
        console.log(args)
        console.log("--------Input arguments----")

        var browser = new Browser(args);
        await browser.init();

        const scrapperInstance = new ScrapperService();
        scrapperInstance.attachBrowser(browser);

        await scrapperInstance.init({
            fakingUserInteraction: true,
            ua: args['ua'],
            'intercept-request': true
        });

        console.log(chalk.yellow('Fake user interaction..'));
        await utils.fakingUserInteraction(scrapperInstance.page);

        if (args['tripType']) {
            console.log(chalk.yellow.bgGrey("Set Trip Option: " + chalk.underline.bold(args['tripType'])));
            await scrapperInstance.setTripType(args['tripType']);
        }

        if (args['flightClass']) {
            console.log(chalk.yellow.bgGrey("Set Flight Class Option: " + chalk.underline.bold(args['flightClass'])));
            await scrapperInstance.setFlightClass(args['flightClass'])
        }

        if (args['origin']) {
            console.log(chalk.yellow.bgGrey("Set Origin Airport: " + chalk.underline.bold(args['origin'])));
            await scrapperInstance.setOriginAirport(args['origin'])
        }

        if (args['destination']) {
            console.log(chalk.yellow.bgGrey("Set Destination Airport: " + chalk.underline.bold(args['destination'])));
            await scrapperInstance.setDestinationAirport(args['destination'])
        }

        if (args['tripType'] && args['tripType'] == "oneWay" && args['departureDate']) {
            console.log(chalk.yellow.bgGrey("Set One Way Departure Date: " + chalk.underline.bold(args['departureDate'])));
            await scrapperInstance.setOneWayDepartureDate(args['departureDate'])
        }

        if (args['tripType'] && args['tripType'] == "roundTrip" && args['departureDate'] && args['returnDate']) {
            console.log(chalk.yellow.bgGrey("Set Round Trip Departure and Return Date: " + chalk.underline.bold(args['departureDate'], '<-->', args['returnDate'])));
            await scrapperInstance.setDepartureAndReturnDate(args['departureDate'], args['returnDate'])
        }

        //Search for inputs
        await scrapperInstance.submitSearch();

        console.log('Loading for search...')
        if (await scrapperInstance.loadResultPage()) {
            console.log('Find More Results...')
            await scrapperInstance.checkAndExpandMoreItems();

            const flightList = new FlightList(scrapperInstance);
            flightResults = await flightList.getData();
        }

        return {
            flightResults,
            inputProps: args
        };
    } catch (error) {
        console.log(chalk.red("Something goes wrong error:", error.message))
    }
}

module.exports = initScrapping;