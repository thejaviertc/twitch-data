// Basic
import React, { Component } from "react";

// Components
import Statistics from "./Statistics";

// Form Component
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            streamer: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    handleSubmit(event) {
        this.setState({ isSubmitted: true, streamer: this.input.current.value });
        event.preventDefault();
    }

    render() {
        return (
            <section id="statistics" className="bg-secondary py-5" >
                <div className="container">
                    <h3 className="text-center">Enter the name of the Twitch Streamer</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group d-flex justify-content-center">
                            <input type="text" className="form-control text-center my-4" style={{ width: "70%" }} ref={this.input} placeholder="Enter Twitch Streamer" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    {this.state.isSubmitted && <Statistics streamer={this.state.streamer} />}
                </div>
            </section>
        );
    }
}

export default Form;