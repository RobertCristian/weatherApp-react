import React from 'react';
import ForecastItem from './ForecastItem'

class Forecast extends React.Component {
    render() {
        let forecastButton;

        if (this.props.currentCity) {
            forecastButton =
                <button className="mb-4"
                        onClick={this.props.toggleForecast}>{this.props.forecast.length === 0 ? 'Show forecast for next ~9h' : 'Hide Forecast'}</button>
        }

        return (
            <div className="forecast__container">
                {forecastButton}
                <div className="row">
                    {this.props.forecast.map(function (result, index) {
                        return <ForecastItem
                            key={index}
                            dt={result.dt}
                            description={result.description}
                            temperature={result.temperature}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Forecast;