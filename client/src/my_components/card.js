import * as React from 'react';

function Card({ day }) {
    return (
        <div className="card m-2" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{new Date(day.valid_date).toLocaleDateString()}</h5>
                <p className="card-text">{day.weather.description}</p>
                <p className="card-text">Max Temp: {day.max_temp}°C</p>
                <p className="card-text">Min Temp: {day.min_temp}°C</p>
            </div>
        </div>
    )
}

export default Card;
