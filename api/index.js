const express = require('express');
const router = express.Router();
const { findFlightsByRoute, findAllScrapes } = require('../services/scrapper.service');

router.get('/get-flights', async (req, res) => {
    try {
        const { origin, destination } = req.query;

        let result = await findFlightsByRoute({ origin, destination })
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/get-scraps', async (req, res) => {
    try {
        let result = await findAllScrapes();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;