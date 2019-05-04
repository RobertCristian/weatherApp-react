import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.form = React.createRef();
    }

    render() {
        return (
            <form className="flex" onSubmit={this.props.getWeather} ref={this.form}>
                <input type="text" name="city" placeholder="City"/>
                <input type="text" name="country" placeholder="Country"/>
                <button>Search</button>
                <button type="reset" onClick={this.props.showPrevious} disabled={this.props.searchCounter < 2}>Previous
                    Location
                </button>
            </form>
        )
    }
}

export default Form;