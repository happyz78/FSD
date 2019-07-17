import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css';
import Player from './Player'
import Controls from './Controls';
import Playlist from './Playlist';
import Addlist from './Addlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onRefPlayer = (ref) => {
    this.player = ref;
  }

  onRefControls = (ref) => {
    this.controls = ref;
  }

  onRefPlaylist = (ref) => {
    this.playlist = ref;
  }

  onRefAddlist = (ref) => {
    this.addlist = ref;
  }
  
  componentDidMount () {
  }

  render() {
    return (
      <Container fluid="true">
        <Row className="row1">
          <Col lg={6}>
            <Player onRef={this.onRefPlayer} disableBtn={
              () => {
                this.controls.disableBtn && this.controls.disableBtn();
              }
            } playPercent={
              percent => {
                this.controls.playPercent && this.controls.playPercent(percent);
              }
            }/>
            <Controls onRef={this.onRefControls} play={
              () => {
                this.player.play && this.player.play()
              }
            } pause={
              () => {
                this.player.pause && this.player.pause()
              }
            } volumeUp={
              () => {
                this.player.volumeUp && this.player.volumeUp()
              }
            } volumeDown={
              () => {
                this.player.volumeDown && this.player.volumeDown()
              }
            } stop={
              () => {
                this.player.stop && this.player.stop()
              }
            } mute={
              () => {
                this.player.mute && this.player.mute()
              }
            }/>
          </Col>

          <Col lg={6}>
            <Playlist onRef={this.onRefPlaylist} changeVideo={
              video => {
                this.player.changeVideo && this.player.changeVideo(video)
                this.controls.changeVideo && this.controls.changeVideo(video)
              }
            } initVideos={
              data => {
                this.addlist.initVideos(data);
              }
            }/>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Addlist onRef={this.onRefAddlist}
            initVideos={
              () => {
                this.playlist.initVideos();
              }
            }/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
