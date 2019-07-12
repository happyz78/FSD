import { Component, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import { Video } from './model/video';
import { ControlsComponent } from './components/controls/controls.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements AfterViewInit {

  video: Video;
  videos: Video[];
  @ViewChild(ControlsComponent, { static: true })
  controls: ControlsComponent;

  constructor(private http: HttpClient) {
    this.video = new Video('', '', 0, 0);
  }


  ngAfterViewInit() {
    const player: any = document.getElementById('video');
    player.addEventListener('ended', () => {
      this.controls.playFlag = false;
    }, false);

    // Update the seek bar as the video plays
    player.addEventListener('timeupdate', () => {
      // Calculate the slider value
      this.controls.playPercent = (100 / player.duration) * player.currentTime;
    });
  }

  videoChange(event: Video) {
    const player: any = document.getElementById('video');
    if (this.video.url === '') {
      this.video = event;
      player.load();
      return;
    }
    this.video = event;
    player.load();
    this.controls.playPercent = 0;
    player.play();
    this.controls.playFlag = true;
  }

}
