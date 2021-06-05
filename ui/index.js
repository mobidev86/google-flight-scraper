const express = require('express');
const router = express.Router();
const { findAllScrapes, findFlightsByRoute, getRouteChartPrice } = require('../services/scrapper.service');

router.get('/', async (req, res) => {
    try {
        let results = await findAllScrapes();

        res.render('index', {
            page: 'dashboard',
            pageTitle: 'Dashboard',
            data: results
        });
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        let results = await findAllScrapes();
        res.render(
            'index', {
            page: 'dashboard',
            pageTitle: 'Scrapping Jobs',
            data: results
        });
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/search-flights', async (req, res) => {
    let { origin, destination } = req.query;
    let result = await findFlightsByRoute({ origin, destination })
    res.render(
        'index', {
        page: 'flights',
        pageTitle: 'Flights',
        show_modal: false,
        data: result || [],
        query: req.query
    });
})

router.get('/flights', (req, res) => {
    res.render(
        'index', {
        page: 'flights',
        pageTitle: 'Flights',
        show_modal: false,
        query: null,
        data: []
    });
})


router.get('/route-chart', async (req, res) => {
    try {
        let { inputOrigin, inputDestination } = req.query;
        let result = await findFlightsByRoute({ origin: inputOrigin, destination: inputDestination })
        let chartData = await getRouteChartPrice({ origin: inputOrigin, destination: inputDestination })

        res.render(
            'index', {
            page: 'flights',
            pageTitle: 'Flights',
            show_modal: true,
            query: req.query,
            data: result || [],
            chartData: chartData || []
        });
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;