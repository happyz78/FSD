import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Video } from '../../model/video';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})

export class PlayListComponent implements OnInit {
  @Output()
  changeVideo: EventEmitter<Video> = new EventEmitter<Video>();

  videos: Video[];

  constructor() {
 }


  ngOnInit() {
  }

  play(video: Video) {
    this.changeVideo.emit(video);
  }
}
