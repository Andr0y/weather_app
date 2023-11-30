import * as React from 'react';

function useMyData() {
    const baseUrl = "/api/";

    const getCountries = async () => {
        const url = `${baseUrl}countries`;
        const response = await fetch(url);
        const data = await response.json();
        return data?.map(country => ({
            name: country.name,
            code: country.code
        }))
    }

    const getCities = async (selectedCountry) => {
        const url = `${baseUrl}cities/${selectedCountry.code}`
        const response = await fetch(url);
        const data = await response.json();
        return data?.map(city => ({
            name: city.name,
            lat: city.lat,
            lng: city.lon
        }))
    }

    return { getCities, getCountries };
}

export default useMyData;
