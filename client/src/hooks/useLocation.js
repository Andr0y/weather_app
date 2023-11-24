import * as React from 'react';

function useLocation() {
    const baseUrl = "http://api.geonames.org/";

    const getCountries = async () => {
        const url = `${baseUrl}countryInfoJSON?username=drej`;
        const response = await fetch(url);
        const data = await response.json();
        return data?.geonames.map(country => ({
            name: country.countryName,
            code: country.countryCode
        }))
    }

    const getCities = async (selectedCountry) => {
        const url = `${baseUrl}searchJSON?country=${selectedCountry.code}&featureClass=P&maxRows=10&username=drej`
        const response = await fetch(url);
        const data = await response.json();
        return data?.geonames.map(city => ({
            name: city.name,
            lat: city.lat,
            lng: city.lng
        }))
    }


    return { getCities, getCountries };
}

export default useLocation;
