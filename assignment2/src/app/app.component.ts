import { Component, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import { Video } from './model/video';
import { ControlsComponent } from './components/controls/controls.component';
import { HttpClient } from '@angular/common/http';
import { PlayListComponent } from './components/play-list/play-list.component';
import { PlayerComponent } from './components/player/player.component';
import { AddListComponent } from './components/add-list/add-list.component';

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
  @ViewChild(PlayListComponent, { static: true })
  playList: PlayListComponent;
  @ViewChild(PlayerComponent, { static: true })
  player: PlayerComponent;
  @ViewChild(AddListComponent, { static: true })
  addList: AddListComponent;

  constructor(private http: HttpClient) {

    this.initData().then(data => {
      this.videos = data as Video[];
      this.video = this.videos[0];
      this.playList.videos = this.videos;
      this.player.currentVideo = this.video;
      this.addList.videos = this.videos;

      this.videoChange(this.video, false);
    });
    console.log('finish Constructor');
  }

  async initData() {
    const data: any = await this.getData();
    console.log(data);
    return data;
  }

  getData() {
    const data: any = this.http.get('http://localhost:3000/youtube').toPromise();
    return data;
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

  videoChange(event: Video, flag: boolean = true) {
    const player: any = document.getElementById('video');
    if (!flag) {
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

  videoListChange(event: Video[]) {
  }
}
