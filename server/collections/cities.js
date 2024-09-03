const { ObjectId } = require('mongodb');

async function getCities(countryCode) {
    let cities = [];

    await global.dbConnection.collection('cities')
        .find({ country: countryCode })
        .sort({ name: 1 })
        .forEach(city => cities.push(city));
    return cities;
}

async function createCity(cityData) {
    const result = await global.dbConnection.collection('cities').insertOne(cityData);
    return result.insertedId;
}

async function updateCity(cityId, cityData) {
    await global.dbConnection.collection('cities').updateOne(
        { _id: new ObjectId(cityId) },
        { $set: cityData }
    );
}

async function deleteCity(cityId) {
    await global.dbConnection.collection('cities').deleteOne({ _id: new ObjectId(cityId) });
}

module.exports = { getCities, createCity, updateCity, deleteCity };
