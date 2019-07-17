import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Addlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos : [],
            msg : '',
            showflg : false,
            show : false,
            url : '',
        };
    }

  
    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }
        
    initVideos = videos => {
        this.setState({
            videos : videos
        })
    }

    edit = video => {
        this.editVideo = video;
        this.name.value = video.name;
        this.url.value = video.url;
    }

    delete = video => {
        this.saveVideo(video, 'DELETE');
    }

    approve = video => {
        video.approved = 1;
        this.updateVidoe(video);
    }

    add = () => {
        var name = this.name.value;
        var url = this.url.value;
    
        if (!name) {
            this.setState({
                msg : 'Please input title!',
                showflg : true
            })
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(
                () => {
                  this.setState({showflg : false})
                },
                3000
            );
            return;
        }
    
        if (!this.check(url)) {
          this.setState({
              msg : 'Please input correct url!' + url,
              showflg : true
          })
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(
              () => {
                this.setState({showflg : false})
              },
              3000
          );
          return;
        }
    
        if (this.editVideo) {
          if (url !== this.editVideo.url) {
            this.editVideo.approved = 0;
          }
    
          this.editVideo.name = this.name.value;
          this.editVideo.url = this.url.value;
          this.editVideo.status = 'edited';
          
          this.updateVidoe(this.editVideo);
        } else {
          const newVideo = this.getNewVideo();
          this.saveVideo(newVideo, 'POST');
        }
        
        this.name.value = '';
        this.url.value = '';
        
    }

    updateVidoe = video => {
        this.saveVideo(video, 'PUT');
    }

    getNewVideo = () => {
        const newVideo = {};
        newVideo.name = this.name.value;
        newVideo.url = this.url.value;
        newVideo.approved = 0;
        newVideo.likeNum = 0;
        newVideo.dislikeNum = 0;
        newVideo.exitplayprogress = 0;
        newVideo.currentStatus = 'stopped';
        newVideo.status = 'added';
        newVideo.id = this.getNextId();
        return newVideo;
    }
    
    getNextId = () => {
        let result = 0;
        this.state.videos.forEach(video => {
          if (video.id > result) {
            result = video.id;
          }
        });
        result++;
        return result;
    }

    check = (url) => {
        if (!url) {
          return false;
        }
        if (!url.startsWith('/video/')) {
          return false;
        }
        if (!url.endsWith('.mp4')) {
          return false;
        }
        return true;
    }

    saveVideo = (video, methodType) => {
        var url = 'http://localhost:3001/youtube/';
        if (methodType !== 'POST') {
            url = url + video.id
        }
        fetch(url,
            {
                body: JSON.stringify(video), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
                },
                method: methodType, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            }).then(response => response.json())
            .then(result => {
                this.props.initVideos();
            });
    }

    showModal = video => {
        this.setState ({
            show : true,
            url : video.url
        })
    }

    handleClose = () => {
        this.setState ({
            show : false,
        })
    }

    render() {
        const list = []
        for (let video of this.state.videos) {
            list.push(
            <tr key={video.id}>
                <th scope="row">{ video.id }</th>
                <td>
                    { video.name }
                </td>
                <td>
                    <button 
                        type="button"
                        className="link-button" 
                        onClick={() => { this.showModal(video) } }>
                        { video.url }
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-primary btn2" onClick={() => { this.edit(video)} }>
                    Edit
                    </button>
                    <button type="button" className="btn btn-primary btn2" onClick={() => { this.delete(video)} }>
                    Delete
                    </button>
                    <button type="button" className="btn btn-success btn2" disabled={video.approved === 1}
                    onClick={() => { this.approve(video)} }>
                    Approve
                    </button>
                </td>
            </tr>
          )
        }

        return (
            <>
            <Container fluid="true">
            <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                    <Alert variant='danger' show={this.state.showflg}>
                        {this.state.msg}
                    </Alert>
                </Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={1}>
                    <label className="col-sm-2 col-form-label">Title:</label>
                </Col>
                <Col lg={5}>
                    <input ref={input => this.name = input} type="text" className="form-control" />
                </Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={1}>
                    <label className="col-sm-2 col-form-label">URL:</label>
                </Col>
                <Col lg={5}>
                    <input ref={input => this.url = input} type="text" className="form-control" />
                </Col>
                <Col lg={3}></Col>
            </Row>
            <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                    <button type="button" className="btn btn-primary" onClick={() => { this.add()} }>Add</button>
                </Col>
                <Col lg={3}></Col>
            </Row>
            </Container>


            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">S.no</th>
                <th scope="col">Title</th>
                <th scope="col">URL</th>
                <th scope="col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
            </table>

            
            <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="dialog1">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <video id="demoPlayer" controls className="center-block" width="600" height="340" src={this.state.url}>
                    </video>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}
export default Addlist;