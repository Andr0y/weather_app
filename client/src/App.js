import './App.css';
import Dropdown from './my_components/dropdown';
import CountryDropdown from './my_components/country_dropdown';
import CityDropdown from './my_components/city_dropdown';
import Weather from './my_components/weather';
import * as React from 'react';
import useFetch from './hooks/useFetch';

function App() {

    const [selectedCountry, setSelectedCountry] = React.useState({ name: "", code: "" });
    const [selectedCity, setSelectedCity] = React.useState({ name: "", lat: 0, lng: 0 });
    const [loadingCities, setLoadingCities] = React.useState(true);
    const [searched, setSearched] = React.useState(false);

    function handleCountry(selectedCountry) {
        setLoadingCities(true)
        setSelectedCountry(selectedCountry);
        setSelectedCity({ name: "", lat: 0, lng: 0 })
        setSearched(false);
    }

    function handleCity(selectedCity) {
        setSelectedCity(selectedCity);
        setSearched(false);
    }

    function handleSearchClick() {
        console.log(selectedCity.lat);
        console.log(selectedCity.lng);
        if (selectedCity.lat && selectedCity.lng) {
            console.log("clicked");
            setSearched(true);
        }
    }

    return (
        <div className="App">
            <CountryDropdown
                selectedCountry={selectedCountry}
                handleCountry={handleCountry}
            />

            <CityDropdown
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                handleCity={handleCity}
                loadingCities={loadingCities}
                setLoadingCities={setLoadingCities}
            />

            {selectedCity?.name &&
                <button onClick={handleSearchClick}>Search</button>
            }
            {searched && <Weather selectedCity={selectedCity} />}
        </div>
    );
}

export default App;
