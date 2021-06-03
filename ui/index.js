const express = require('express');
const router = express.Router();
const { findAllScrapes, findFlightsByRoute } = require('../services/scrapper.service');

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

//get-flights
router.get('/search-flights', async (req, res) => {
    let { origin, destination } = req.query;
    let result = await findFlightsByRoute({ origin, destination })
    res.render(
        'index', {
        page: 'flights',
        pageTitle: 'Flights',
        data: result
    }
    );
})

router.get('/flights', (req, res) => {
    res.render(
        'index', {
        page: 'flights',
        pageTitle: 'Flights',
        data: []
    });
})




module.exports = router;