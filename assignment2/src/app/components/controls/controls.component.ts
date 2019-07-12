import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../model/video';

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

  constructor() { }

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
    if (player.muted == false) {
      // Mute the video
      player.muted = true;
    } else {
      // Unmute the video
      player.muted = false;
    }
  }

  like() {
    this.currentVideo.likeNum++;
    // localStorage.setItem('like', this.currentVideo.likeNum.toString());
  }

  dislike() {
    this.currentVideo.dislikeNum++;
    // localStorage.setItem('dislike', this.currentVideo.dislikeNum.toString());
  }
}
