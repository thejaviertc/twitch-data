// Basic
import React, { Component } from "react";

// Components
import Statistics from "./Statistics";

// Form Component
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamer: null
        };
    }
    // submitHandler = (event) => {
    //     event.preventDefault();
    // }
    // changeHandler = (event) => {

    // }
    render() {
        return (
            <section id="statistics" className="bg-secondary py-5">
                <div className="container">
                    <h3 className="text-center">Enter the name of the Twitch Streamer</h3>
                    <form onSubmit={this.submitHandler}>
                        <div class="form-group d-flex justify-content-center">
                            <input type="text" className="form-control text-center my-4" style={{ width: "70%" }} onChange={this.changeHandler} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary" href="#statistics">Submit</button>
                        </div>
                    </form>
                    <Statistics streamer={this.state.streamer} />
                </div>
            </section>
        );
    }
}

export default Form;