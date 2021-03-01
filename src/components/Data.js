// Basic
import React, { Component } from "react";

// Components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data Component
class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: null,
            streamerName: null,
            createdAt: null,
            broadcasterType: null,
            profileImageUrl: null,
            totalViewers: null,
            followers: null,
            videoList: [],
            videoData: []
        };
        this.end = React.createRef();
    }

    async fetchData() {
        await fetch(`https://javiertcs-api.herokuapp.com/api/twitch-data?${this.props.streamer}`).then(res => res.json()).then((result) => {
            if (result) {
                this.setState({
                    id: result.id,
                    streamerName: result.streamerName,
                    createdAt: result.createdAt,
                    broadcasterType: result.broadcasterType,
                    profileImageUrl: result.profileImageUrl,
                    totalViewers: result.totalViewers,
                    followers: result.followers,
                    videoList: result.videoList,
                    videoData: result.videoData
                });
            } else {
                alert("This Twitch Streamer doesn't exist, try again");
            }
        })
        this.setState({ loading: true });
    }

    scrollToBottom = () => {
        this.end.current.scrollIntoView({ behavior: 'smooth' })
    }

    async componentDidMount() {
        await this.fetchData();
        await this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        if (this.props.streamer !== prevProps.streamer) {
            this.fetchData();
        }
    }

    render() {
        return (
            <div className="pt-5">
                <div ref={this.end} />
                { this.state.loading ? (
                    <div>
                        <h2 className="text-center">Stats of {this.state.streamerName}</h2>
                        <img src={this.state.profileImageUrl} className="img-fluid mx-auto d-block py-3" alt="" />
                        <p className="text-center">
                            <span className="badge badge-info mx-2 my-2">Created at: {this.state.createdAt}</span>
                            <span className="badge badge-primary mx-2 my-2">Type: {this.state.broadcasterType}</span>
                            <span className="badge badge-success mx-2 my-2">Views: {this.state.totalViewers}</span>
                            <span className="badge badge-danger mx-2 my-2">Followers: {this.state.followers}</span>
                        </p>
                        <h2 className="text-center pt-4">Videos of {this.state.streamerName}</h2>
                        <div className="card-columns pt-5">
                            {this.state.videoList.map((data, i) => {
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
                        <h2 className="text-center pt-4">Views Data of {this.state.streamerName}</h2>
                        <div className="d-flex justify-content-center pt-4">
                            <ResponsiveContainer width="90%" aspect={3}>
                                <LineChart width={400} height={400} data={this.state.videoData}>
                                    <Line type="monotone" dataKey="views" stroke="#9146FF" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : (
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
            </div >
        );
    }
}

export default Data;