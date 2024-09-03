const express = require('express');
const router = express.Router();
const cities = require('../collections/cities');

router.get('/:countryCode', async (req, res) => {
    try {
        const countryCode = req.params.countryCode;
        const list = await cities.getCities(countryCode);
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cityData = req.body;
        const id = await cities.createCity(cityData);
        res.status(200).json({ id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const cityId = req.params.id;
        const cityData = req.body;
        await cities.updateCity(cityId, cityData);
        res.status(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cityId = req.params.id;
        await cities.deleteCity(cityId);
        res.status(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
