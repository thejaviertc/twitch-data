// Basic
import React, { Component } from "react";

// Data Component
class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Login Section
            id: null,
            steamer_name: null,
            created_at: null,
            broadcaster_type: null,
            profile_image_url: null,
            total_viewers: null,
            // Follow Section
            followers: null,
        };
        this.end = React.createRef();
    }

    fetchData() {
        fetch(`https://api.twitch.tv/helix/users?login=${this.props.streamer}`,
            {
                headers:
                {
                    'Authorization': process.env.REACT_APP_TOKEN,
                    'Client-ID': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(res => res.json()).then(
            (result) => {
                console.log(result);
                if (result.data.length) {
                    this.setState({
                        id: result.data[0].id,
                        steamer_name: result.data[0].display_name,
                        created_at: result.data[0].created_at.slice(0, 10),
                        broadcaster_type: result.data[0].broadcaster_type,
                        profile_image_url: result.data[0].profile_image_url,
                        total_viewers: result.data[0].view_count
                    });
                    fetch(`https://api.twitch.tv/helix/users/follows?to_id=${this.state.id}`,
                        {
                            headers:
                            {
                                'Authorization': process.env.REACT_APP_TOKEN,
                                'Client-ID': process.env.REACT_APP_CLIENT_ID
                            }
                        }
                    ).then(res => res.json()).then(
                        (result) => {
                            this.setState({
                                followers: result.total
                            });
                        }
                    )
                } else {
                    alert("This Twitch Streamer doesn't exist, try again");
                }
            }
        )
    }

    scrollToBottom = () => {
        setTimeout(() => { this.end.current.scrollIntoView({ behavior: 'smooth' }) }, 400);
    }

    componentDidMount() {
        this.fetchData();
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        if (this.props.streamer !== prevProps.streamer) {
            this.fetchData();
        }
    }

    render() {
        return (
            <section id="data" className="bg-secondary py-5">
                <div className="container">
                    <h2 className="text-center">Stats of {this.state.steamer_name}</h2>
                    <img src={this.state.profile_image_url} className="img-fluid mx-auto d-block py-3" alt="" />
                    <p className="text-center">
                        <span className="badge badge-info mx-2 my-2">Created at: {this.state.created_at}</span>
                        <span className="badge badge-primary mx-2 my-2">Type: {this.state.broadcaster_type}</span>
                        <span className="badge badge-success mx-2 my-2">Views: {this.state.total_viewers}</span>
                        <span className="badge badge-danger mx-2 my-2">Followers: {this.state.followers}</span>
                    </p>
                    <div ref={this.end} />
                </div>
            </section>
        );
    }
}

export default Data;