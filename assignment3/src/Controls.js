import React from 'react';
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeUp, faVolumeDown, faStop, faHeadphones, faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid'
import './Controls.css';

class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disableBtn : false,
            playPercent : 0,
            currentVideo : null,
        };
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }

    changeVideo = video => {
        this.setState({
            currentVideo : video
        });
    }

    disableBtn = () => {
        this.setState({
            disableBtn: !this.state.disableBtn
        })
    }

    playPercent = percent => {
        this.setState({
            playPercent: percent
        })
    }

    like = () => {
        var video = this.state.currentVideo;
        video.likeNum = video.likeNum + 1;
        this.setState({
            currentVideo : video
        });
        this.saveVideo(video);
    }

    dislike = () => {
        var video = this.state.currentVideo;
        video.dislikeNum = video.dislikeNum + 1;
        this.setState({
            currentVideo : video
        });
        this.saveVideo(video);
    }

    saveVideo = video => {
        fetch('http://localhost:3001/youtube/' + video.id,
            {
                body: JSON.stringify(video), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
                },
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then(response => response.json());
    }

    render() {
        return (
            <>
                <div className="center-block">
                    <Button type="button" variant="light" className="btn1" onClick={this.props.play} disabled={this.state.disableBtn}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.props.pause} disabled={!this.state.disableBtn}>
                        <FontAwesomeIcon icon={faPause} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.props.volumeUp}>
                        <FontAwesomeIcon icon={faVolumeUp} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.props.volumeDown}>
                        <FontAwesomeIcon icon={faVolumeDown} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.props.stop}>
                        <FontAwesomeIcon icon={faStop} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.props.mute}>
                        <FontAwesomeIcon icon={faHeadphones} />
                    </Button>
                    <Button type="button" variant="light" className="btn1" onClick={this.like}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </Button>
                    <label className="lab1">{this.state.currentVideo ? this.state.currentVideo.likeNum : 0}</label>
                    <Button type="button" variant="light" className="btn1" onClick={this.dislike}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </Button>
                    <label className="lab2">{this.state.currentVideo ? this.state.currentVideo.dislikeNum : 0}</label>
                </div>
                <div className="div1">
                    <ProgressBar variant="success" now={this.state.playPercent} />
                </div>
            </>
        );
    }
}
export default Controls;