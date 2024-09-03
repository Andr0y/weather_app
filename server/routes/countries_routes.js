const express = require('express');
const router = express.Router();
const countries = require('../collections/countries');

router.get('/', async (req, res) => {
    try {
        const list = await countries.get();
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const countryData = req.body;
        const id = await countries.create(countryData);
        res.status(200).json(id);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const countryId = req.params.id;
        const updateData = req.body;
        const result = await countries.update(countryId, updateData);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const countryId = req.params.id;
        const result = await countries.deleteCountry(countryId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
