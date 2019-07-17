import React from 'react';
import './Playlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid'

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos : [],
        };
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
        this.initVideos();
    };

    initVideos = () => {
        fetch("http://localhost:3001/youtube")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              videos: result,
            });
            this.props.initVideos(result);
            var breakflg = false;
            result.forEach(video => {
                if (breakflg) {
                    return false;
                }
                if (video.approved === 1) {
                    this.props.changeVideo(video);
                    breakflg = true;
                }
            });
          }
        )
    }

    render() {
        const list = []
        for (let video of this.state.videos) {
            list.push(
            <div key={video.id} className={video.approved === 1 ? 'show': 'hidden'}>
            <button 
                type="button"
                className="link-button" 
                onClick={() => { this.props.changeVideo(video)} }>
                <FontAwesomeIcon icon={faPlayCircle} />
                {video.name}
            </button>
            </div>
          )
        }

        return (
            <div className="middle">
                <font size="6">
                    {list}
                </font>
            </div>
        );
    }
}
export default Playlist;