import * as React from 'react';

function useWeather() {
    const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily";

    const getWeather = async (lat, lng) => {
        const apiKey = "d8a90003fcd04a849aeb46a1178fc9b5";
        const url = `${baseUrl}?lat=${lat}&lon=${lng}&days=7&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
    return { getWeather };
}
export default useWeather;
