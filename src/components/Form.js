import React from "react";

const Form = props => (
    <form className="flex" onSubmit={props.getWeather}>
        <input type="text" name="city" placeholder="City"/>
        <input type="text" name="country" placeholder="Country"/>
        <button>Search</button>
        <button type="reset" onClick={props.showPrevious}>Previous</button>
    </form>
);

export default Form;