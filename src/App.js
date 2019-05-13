import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherUnit: 'metric',
            current: {
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: undefined
            },
            previous: {
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: undefined
            },
            forecast: [],
            searchCounter: 0,
            showPrevious: false
        };

        this.weatherFormRef = React.createRef();
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${this.state.weatherUnit}`);

        const data = await api_call.json();

        if (city && country) {
            if (this.state.searchCounter > 0 && this.state.current.city !== city) {
                this.setState({
                    previous: this.state.current
                })
            }
            this.setState({
                current: {
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: ""
                },
                searchCounter: this.state.current.city !== city ? this.state.searchCounter + 1 : this.state.searchCounter,
                showPrevious: false
            })
        } else {
            this.setState({
                current: {
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Please Enter the value"
                }
            })
        }
    };

    handlePreviousBtnClick = () => {
        this.setState({
            showPrevious: true
        })
    };

    handleSwitchWeatherUniBtnClick = async e => {
        e.preventDefault();

        let weatherUnit = this.state.weatherUnit;

        if (weatherUnit === 'metric') {
            weatherUnit = 'imperial'
        } else if (weatherUnit === 'imperial') {
            weatherUnit = 'metric'
        }

        await this.setState({
            weatherUnit: weatherUnit
        });

        this.weatherFormRef.current.form.current.click();
    };

    toggleForecast = async () => {
        let forecast = [];

        if (this.state.forecast.length === 0) {
            const city = this.state.current.city;
            const country = this.state.current.country;

            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=${this.state.weatherUnit}&cnt=3`);

            const data = await api_call.json();

            data.list.map(function (nextForecast) {
                return forecast.push({
                    dt: new Date(nextForecast.dt * 1000).getHours() + ':00',
                    temperature: nextForecast.main.temp,
                    description: nextForecast.weather[0].description
                })
            });
        }

        await this.setState({
            forecast: forecast
        })
    };

    render() {
        const showPrevious = this.state.showPrevious;

        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 title-container">
                                    <Titles/>
                                </div>

                                <div className="col-7 form-container">
                                    <Form
                                        searchCounter={this.state.searchCounter}
                                        getWeather={this.getWeather}
                                        showPrevious={this.handlePreviousBtnClick}
                                        ref={this.weatherFormRef}
                                    />
                                    <Weather
                                        temperature={(showPrevious ? this.state.previous : this.state.current).temperature}
                                        weatherUnit={this.state.weatherUnit}
                                        city={(showPrevious ? this.state.previous : this.state.current).city}
                                        country={(showPrevious ? this.state.previous : this.state.current).country}
                                        humidity={(showPrevious ? this.state.previous : this.state.current).humidity}
                                        description={(showPrevious ? this.state.previous : this.state.current).description}
                                        error={this.state.current.error}
                                        switchWeatherUnit={this.handleSwitchWeatherUniBtnClick}
                                    />
                                    <Forecast
                                        forecast={this.state.forecast}
                                        currentCity={this.state.current.city}
                                        toggleForecast={this.toggleForecast}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;