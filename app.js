const express = require('express');
const fs = require('fs');
const cors = require('cors');
const exp = require('constants');

const app = express();

app.use(cors());

app.use(express.static("./client/build/index.html"))

app.get("/countries", (req, res) => {
    fs.readFile("countries.json", "utf8", (err, data) => {
        if (err) {
            res.send("Error with reading file");
            return;
        }
        const countries = JSON.parse(data);
        res.json(countries);
    });
});

app.get('/cities/:countryCode', (req, res) => {
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

app.all("*", (req, res) => {
    res.status(404).send("Doesn't exist");
})

app.listen(5000, () => {
    console.log("Server is running");
});
