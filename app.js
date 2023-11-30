const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
//authentication
app.use(express.static("client/build"));

app.get("/api/countries", (req, res) => {
    fs.readFile("countries.json", "utf8", (err, data) => {
        if (err) {
            res.send("Error with reading file");
            return;
        }
        const countries = JSON.parse(data);
        res.json(countries);
    });
});

app.get('/api/cities/:countryCode', (req, res) => {
    const countryCode = req.params.countryCode;

    fs.readFile('cities500.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading cities file');
            return;
        }
        const cities = JSON.parse(data);
        const foundCities = cities.filter(city => city.country === countryCode);
        if (foundCities.length == 0)
            return res.status(404).send("couldnt find cities");
        res.json(foundCities);
    });
});

app.listen(5000, () => {
    console.log("Server is running");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
