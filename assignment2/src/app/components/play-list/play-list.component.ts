import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Video } from '../../model/video';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})

@Injectable()
export class PlayListComponent implements OnInit {
  @Output()
  change: EventEmitter<Video> = new EventEmitter<Video>();

  videos: Video[];

  constructor(private http: HttpClient) {
    // const v1 = new Video('Introduction to HTML5',
    //                           '/assets/video/Introduction to HTML5.mp4', 0, 0);
    // const v2 = new Video('Introduction to Styling with CSS3',
    //                           '/assets/video/Introduction to Styling with CSS3.mp4', 0, 0);
    // const v3 = new Video('Introduction to Bootstrap 4',
    //                           '/assets/video/Introduction to Bootstrap 4.mp4', 0, 0);
    // const v4 = new Video('Learn to create website with HTML5, CSS3 and Bootstrap4',
    //                           '/assets/video/Learn to create website with HTML5, CSS3 and Bootstrap4.mp4', 0, 0);
    // const v5 = new Video('Introduction to Javascript',
    //                           '/assets/video/Introduction to Javascript.mp4', 0, 0);
    // this.videos = [v1, v2, v3, v4, v5];
    this.getData();
 }

 async getData() {
  await this.http.get('http://localhost:3000/youtube')
    .subscribe(res => {
      this.videos = res as Video[];
      console.log(res);
      this.change.emit(this.videos[0]);
    });
}

  ngOnInit() {
  }

  play(video: Video) {
    this.change.emit(video);
  }
}
