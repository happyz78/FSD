import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../model/video';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {
  @Input()
  currentVideo: Video;

  playFlag = false;
  playPercent = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  play() {
    const player: any = document.getElementById('video');
    player.play();
    this.playFlag = true;
  }

  pause() {
    const player: any = document.getElementById('video');
    player.pause();
    this.playFlag = false;
  }

  volumeUp() {
    const player: any = document.getElementById('video');
    let volume = player.volume + 0.1;
    if (volume > 1) {
      volume = 1;
    }
    player.volume = volume;
  }

  volumeDown() {
    const player: any = document.getElementById('video');
    let volume = player.volume - 0.1;
    if (volume < 0) {
      volume = 0;
    }
    player.volume = volume;
  }
  repeat() {
    const player: any = document.getElementById('video');
    player.load();
    player.play();
    this.playFlag = true;
  }
  mute() {
    const player: any = document.getElementById('video');
    if (player.muted === false) {
      // Mute the video
      player.muted = true;
    } else {
      // Unmute the video
      player.muted = false;
    }
  }

  like() {
    this.currentVideo.likeNum++;
    this.saveVideo();
  }

  dislike() {
    this.currentVideo.dislikeNum++;
    this.saveVideo();
  }

  saveVideo() {
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    );
    this.http.put('http://localhost:3000/youtube/' + this.currentVideo.id,
      this.currentVideo,
      { headers })
      .subscribe(
        val => {
          console.log('Put call successful value returned in body', val);
        },
        error => {
          console.log('Put call in error', error);
        },
        () => {
          console.log('The Put observable is now completed.');
        }
      );
  }
}
