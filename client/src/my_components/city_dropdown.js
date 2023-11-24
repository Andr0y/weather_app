import { useEffect, useState } from 'react';
import Dropdown from './dropdown';
import useLocation from '../hooks/useLocation';
import useMyData from '../hooks/use_my_data';

function CityDropdown({ selectedCountry, selectedCity, handleCity, loadingCities, setLoadingCities }) {
    const [cities, setCities] = useState([]);

    const { getCities, getCountries } = useMyData();

    useEffect(() => {
        if (selectedCountry && selectedCountry?.code) {
            getCities(selectedCountry)
                .then((data) => {
                    setCities(data);
                    setLoadingCities(false);
                })
        }
    }, [selectedCountry]);


    /*const endpoint = selectedCountry?.code
    ? `http://api.geonames.org/searchJSON?country=${selectedCountry.code}&featureClass=P&maxRows=10&username=drej`
    : null;
  
    const { data } = useFetch(endpoint, setLoadingCities);
  
    React.useEffect(() => {
      if (data && data.geonames) {
        const citiesArray = data.geonames.map(city => ({
          name: city.name,
          lat: city.lat,
          lng: city.lng
        }));
        setCities(citiesArray);
      }
    }, [data]);
  
    React.useEffect(() => {
        async function getCities() {
          if (selectedCountry?.name) {
            const endpoint = `http://api.geonames.org/searchJSON?country=${selectedCountry.code}&featureClass=P&maxRows=10&username=drej`;
            const response = await fetch(endpoint);
            const data = await response.json();
            const cities = data.geonames.map(city => ({name: city.name, lat: city.lat, lng: city.lng}));
            setCities(cities);
            setLoadingCities(false);
          }
        }
    
      getCities();
      }, [selectedCountry?.name]);
  */
    return (
        selectedCountry?.name &&
        <div>
            <Dropdown
                items={cities}
                selectedItem={selectedCity}
                handleItem={handleCity}
                itemType="city"
                isLoading={loadingCities}
            />
        </div>
    )
}

export default CityDropdown;
