const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const { connectToDb, getDb } = require('./db');
const countries = require("./server/collections/countries");
const countriesRoutes = require("./server/routes/countries_routes");
const bodyParser = require('body-parser');
const cityRoutes = require('./server/routes/cities_routes');

global.dbConnection = null;

app.use(cors());
app.use(bodyParser.json());
//->authentication
app.use(express.static("client/build"));

let db;

connectToDb((err) => {
    if (!err) {
        const PORT = process.env.port || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        db = getDb();
    }
})

app.use('/api/countries', countriesRoutes);
app.use('/api/cities', cityRoutes);


/*
app.get("/api/cities/:countryCode", (req, res) => {
    const countryCode = req.params.countryCode;
    let cities = [];

    db.collection('cities')
        .find({ country: countryCode })
        .sort({ name: 1 })
        .forEach(city => cities.push(city)) //async
        .then(foundCities => {
            res.status(200).json(cities)
        })
        .catch(() => {
            res.status(500).json({ error: "Could not fetch the cities" })
        })
});
*/
/*
app.get("/api/countries", (req, res) => {
    countries.get()
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Could not fetch the countries",
                error: err
            })
        })

});
*/

/*
fs.readFile("countries.json", "utf8", (err, data) => {
    if (err) {
        res.send("Error with reading file");
        return;
    }
    const countries = JSON.parse(data);
    res.json(countries);
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
*/


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
