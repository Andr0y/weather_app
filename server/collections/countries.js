// Create Update Delete Read CRUD
const { ObjectId } = require('mongodb');

async function get() {
    let countries = [];

    await global.dbConnection.collection('countries')
        .find()
        .sort({ name: 1 })
        .forEach(country => countries.push(country)) //async

    return countries;
}

async function create(countryData) {
    const result = await global.dbConnection.collection('countries').insertOne(countryData);
    return result.insertedId;
}

async function deleteCountry(countryId) {
    await global.dbConnection.collection('countries').deleteOne({ _id: new ObjectId(countryId) });
}

async function update(countryId, countryData) {
    await global.dbConnection.collection('countries').updateOne(
        { _id: new ObjectId(countryId) },
        { $set: countryData }
    );
}

async function deleteCountryByName(countryName) {
    await global.dbConnection.collection('countries').deleteOne({ name: countryName });
};

module.exports = { get, create, deleteCountry, update }
