import { Component, OnInit, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { Video } from '../../model/video';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input()
  currentVideo: Video;

  constructor() {
  }

  ngOnInit() {
  }

}
