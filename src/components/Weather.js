import React from "react";

class Weather extends React.Component {
    getWeatherUnitEntity = (type) => {
        let weatherUnit = this.props.weatherUnit;

        switch (type) {
            case 'reverse':
                weatherUnit = weatherUnit === 'metric' ? String.fromCharCode(8457) : String.fromCharCode(8451);
                break;
            default:
                weatherUnit = weatherUnit === 'metric' ? String.fromCharCode(8451) : String.fromCharCode(8457);
        }

        return weatherUnit;
    };

    render() {
        return (
            <div className="weather__info">
                {
                    this.props.city && this.props.country && <p className="weather__key"> Location:
                        <span className="weather__value">
                        {this.props.city}, {this.props.country}
                    </span>
                    </p>
                }
                {
                    this.props.temperature && <p className="weather__key"> Temperature:
                        <span
                            className="weather__value mr-2">{this.props.temperature} {this.getWeatherUnitEntity()}
                    </span>
                        <button type="button" className="weather__key-button"
                                onClick={this.props.switchWeatherUnit}>Switch
                            to {this.getWeatherUnitEntity('reverse')}</button>
                    </p>
                }
                {
                    this.props.humidity && <p className="weather__key"> Humidity:
                        <span className="weather__value">
                        {this.props.humidity}
                    </span>
                    </p>
                }
                {
                    this.props.description && <p className="weather__key"> Conditions:
                        <span className="weather__value text-capitalize d-inline-block">
                        {this.props.description}
                    </span>
                    </p>
                }
                {
                    this.props.error && <p className="weather__error">
                        {this.props.error}
                    </p>
                }
            </div>
        )
    }
};

export default Weather;