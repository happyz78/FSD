import React from 'react';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: '/video/Introduction to Styling with CSS3.mp4'
        };
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
        
        var player = document.getElementById('video');
        player.addEventListener('ended', () => {
            this.props.disableBtn();
        }, false);

        // Update the seek bar as the video plays
        player.addEventListener('timeupdate', () => {
            // Calculate the slider value
            this.props.playPercent((100 / player.duration) * player.currentTime);
        });
    }

    play = () => {
        var player = document.getElementById('video');
        player.play();
        this.props.disableBtn();
    }

    pause = () => {
        var player = document.getElementById('video');
        player.pause();
        this.props.disableBtn();
    }

    volumeUp = () => {
        var player = document.getElementById('video');
        let volume = player.volume + 0.1;
        if (volume > 1) {
          volume = 1;
        }
        player.volume = volume;
    }

    volumeDown = () => {
        var player = document.getElementById('video');
        let volume = player.volume - 0.1;
        if (volume < 0) {
          volume = 0;
        }
        player.volume = volume;
    }

    stop = () => {
        var player = document.getElementById('video');
        this.props.playPercent(0);
        player.load();
        player.play();
    }

    mute = () => {
        var player = document.getElementById('video');
        if (player.muted === false) {
          // Mute the video
          player.muted = true;
        } else {
          // Unmute the video
          player.muted = false;
        }
    }

    changeVideo(video) {
        var player = document.getElementById('video');
        this.setState({
            src : video.url
        });
        player.load();
        this.props.playPercent(0);
    }

    render() {
        return (
            <video id="video" className="center-block" width="600" height="340" src={this.state.src}>
            </video>
        );
    }
}
export default Player;