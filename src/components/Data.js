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
            // Videos Section
            video_list: []
        };
        this.end = React.createRef();
    }

    fetchData() {
        fetch(`https://api.twitch.tv/helix/users?login=${this.props.streamer}`, {
            headers: { 'Authorization': process.env.REACT_APP_TOKEN, 'Client-ID': process.env.REACT_APP_CLIENT_ID }
        }).then(res => res.json()).then((result) => {
            if (result.data.length) {
                this.setState({
                    id: result.data[0].id,
                    steamer_name: result.data[0].display_name,
                    created_at: result.data[0].created_at.slice(0, 10).split("-").reverse().join("-"),
                    broadcaster_type: result.data[0].broadcaster_type.replace("partner", "Partner").replace("affiliate", "Affiliate"),
                    profile_image_url: result.data[0].profile_image_url,
                    total_viewers: result.data[0].view_count
                });
                fetch(`https://api.twitch.tv/helix/users/follows?to_id=${this.state.id}`, {
                    headers: { 'Authorization': process.env.REACT_APP_TOKEN, 'Client-ID': process.env.REACT_APP_CLIENT_ID }
                }).then(res => res.json()).then((result) => {
                    this.setState({
                        followers: result.total
                    });
                    fetch(`https://api.twitch.tv/helix/videos?user_id=${this.state.id}`, {
                        headers: { 'Authorization': process.env.REACT_APP_TOKEN, 'Client-ID': process.env.REACT_APP_CLIENT_ID }
                    }).then(res => res.json()).then((result) => {
                        this.setState({
                            video_list: result.data
                        });
                        console.log(this.state.video_list);
                    })
                })
            } else {
                alert("This Twitch Streamer doesn't exist, try again");
            }
        })
    }

    scrollToBottom = () => {
        setTimeout(() => { this.end.current.scrollIntoView({ behavior: 'smooth' }) }, 500);
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
            <div className="pt-5">
                <h2 className="text-center">Stats of {this.state.steamer_name}</h2>
                <img src={this.state.profile_image_url} className="img-fluid mx-auto d-block py-3" alt="" />
                <p className="text-center">
                    <span className="badge badge-info mx-2 my-2">Created at: {this.state.created_at}</span>
                    <span className="badge badge-primary mx-2 my-2">Type: {this.state.broadcaster_type}</span>
                    <span className="badge badge-success mx-2 my-2">Views: {this.state.total_viewers}</span>
                    <span className="badge badge-danger mx-2 my-2">Followers: {this.state.followers}</span>
                </p>
                <div ref={this.end} />
                <h2 className="text-center pt-4">Videos of {this.state.steamer_name}</h2>
                <div className="card-columns pt-5">
                    {this.state.video_list.map((data, i) => {
                        if (data.thumbnail_url) {
                            return (
                                <div key={'video_' + i} className="card" >
                                    <img className="card-img-top" src={data.thumbnail_url.replace("%{width}", "320").replace("%{height}", "180")} alt="Test" />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{data.title}</h5>
                                        <p className="text-center">
                                            <span className="badge badge-info mx-2 my-2">Published at: {data.published_at.slice(0, 10).split("-").reverse().join("-")}</span>
                                            <span className="badge badge-success mx-2 my-2">Views: {data.view_count}</span>
                                        </p>
                                        <div className="d-flex justify-content-center">
                                            <a href={data.url} target="_blank" rel="noreferrer" className="btn btn-primary">See Video</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Data;