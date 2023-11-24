import * as React from 'react';
import Card from './card';
import useWeather from '../hooks/useWeather';

function Weather({ selectedCity }) {
    const [loading, setLoading] = React.useState(false);
    const [weatherForecast, setWeatherForecast] = React.useState([]);

    const { getWeather } = useWeather();

    React.useEffect(() => {
        if (selectedCity.lat && selectedCity.lng) {
            setLoading(true);
            getWeather(selectedCity.lat, selectedCity.lng)
                .then((forecast) => {
                    setWeatherForecast(forecast.data);
                })
                .then(() => {
                    setLoading(false);
                });
        }
    }, [selectedCity]);

    if (loading) {
        return <div>Loading weather forecast...</div>;
    }

    if (!weatherForecast || weatherForecast.length === 0) {
        return <div>No data</div>;
    }

    return (
        <div className="d-flex">
            {weatherForecast.map((day, index) => (
                <Card day={day} key={index} />
            ))}
        </div>
    );
}

export default Weather;
