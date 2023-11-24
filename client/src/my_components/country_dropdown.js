import * as React from 'react';
import Dropdown from './dropdown';
import useLocation from '../hooks/useLocation';
import useMyData from '../hooks/use_my_data';

function CountryDropdown({ selectedCountry, handleCountry }) {
    const [countries, setCountries] = React.useState([]);
    const [loadingCountries, setLoadingCountries] = React.useState(true);

    const { getCities, getCountries } = useMyData();


    React.useEffect(() => {
        getCountries()
            .then((data) => {
                setCountries(data);
                setLoadingCountries(false);
            })
    }, []);

    return (
        <div>
            <Dropdown
                items={countries}
                selectedItem={selectedCountry}
                handleItem={handleCountry}
                itemType="country"
                isLoading={loadingCountries}
            />
        </div>
    )
}

export default CountryDropdown;
