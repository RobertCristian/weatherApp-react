import React from "react";

const ForecastItem = props => (
    <div className="col-4">
        <div className="forecast__item">
            <p className="forecast__timestamp">{props.dt}</p>
            <p className="forecast__description">{props.description}</p>
            <p className="forecast__temperature">{props.temperature}</p>
        </div>
    </div>
);

export default ForecastItem;