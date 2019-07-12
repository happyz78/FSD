import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Video } from '../../model/video';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  videos: Video[];
  editVideo: Video;
  title = '';
  url = '';
  staticAlertClosed = true;
  alertType = '';
  alertMessage = '';
  private success = new Subject<string>();
  @ViewChild('titleInput', { static: true })
  titleInput: ElementRef;
  @ViewChild('urlInput', { static: true })
  urlInput: ElementRef;
  demoVideo: Video;

  @Output()
  changeVideos: EventEmitter<Video[]> = new EventEmitter<Video[]>();

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.success.subscribe((message) => this.alertMessage = message);
    this.success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.alertMessage = null);
  }

  open(content, video) {
    this.demoVideo = video;
    const modalRef = this.modalService.open(content, { windowClass: 'my-class' });

    const player: any = document.getElementById('demoPlayer');
    player.play();

    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  add() {
    this.title = this.titleInput.nativeElement.value;
    this.url = this.urlInput.nativeElement.value;

    if (!this.title) {
      this.success.next('Please input title!');
      this.alertType = 'danger';
      return;
    }

    if (!this.check(this.url)) {
      this.success.next('Please input correct url!');
      this.alertType = 'danger';
      return;
    }

    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    );

    if (this.editVideo) {
      if (this.url !== this.editVideo.url) {
        this.editVideo.approved = 0;
      }

      this.editVideo.name = this.title;
      this.editVideo.url = this.url;
      this.editVideo.status = 'edited';

      this.http.put('http://localhost:3000/youtube/' + this.editVideo.id,
        this.editVideo,
        { headers })
        .subscribe(
          val => {
            this.editVideo = null;
            console.log('Put call successful value returned in body', val);
          },
          error => {
            console.log('Put call in error', error);
            this.success.next(error);
            this.alertType = 'danger';
          },
          () => {
            console.log('The Put observable is now completed.');
          }
        );
    } else {
      const newVideo = this.getNewVideo();
      this.videos.push(newVideo);

      this.http.post('http://localhost:3000/youtube',
        newVideo,
        { headers })
        .subscribe(
          val => {
            console.log('Post call successful value returned in body', val);
          },
          error => {
            console.log('Post call in error', error);
            this.success.next(error);
            this.alertType = 'danger';
          },
          () => {
            console.log('The Post observable is now completed.');
          }
        );
    }

    this.title = '';
    this.url = '';
    this.titleInput.nativeElement.value = '';
    this.urlInput.nativeElement.value = '';
  }

  getNewVideo(): Video {
    const newVideo = new Video();
    newVideo.name = this.title;
    newVideo.url = this.url;
    newVideo.approved = 0;
    newVideo.likeNum = 0;
    newVideo.dislikeNum = 0;
    newVideo.exitplayprogress = 0;
    newVideo.currentStatus = 'stopped';
    newVideo.status = 'added';
    newVideo.id = this.getNextId();
    return newVideo;
  }

  getNextId(): number {
    let result = 0;
    this.videos.forEach(video => {
      if (video.id > result) {
        result = video.id;
      }
    });
    result++;
    return result;
  }

  check(url: string): boolean {
    if (!url) {
      return false;
    }
    if (!url.startsWith('/assets/video/')) {
      return false;
    }
    if (!url.endsWith('.mp4')) {
      return false;
    }
    return true;
  }

  edit(video: Video) {
    this.editVideo = video;
    this.title = video.name;
    this.url = video.url;
  }

  delete(video: Video) {
    if (this.editVideo && this.editVideo.id === video.id) {
      this.editVideo = null;
      this.title = '';
      this.url = '';
      this.titleInput.nativeElement.value = '';
      this.urlInput.nativeElement.value = '';
    }
    this.videos.splice(this.videos.indexOf(video), 1);

    this.http.delete('http://localhost:3000/youtube/' + video.id)
      .subscribe(
        val => {
          this.changeVideos.emit(this.videos);
          console.log('Delete call successful value returned in body', val);
        },
        error => {
          console.log('Delete call in error', error);
          this.success.next(error);
          this.alertType = 'danger';
        },
        () => {
          console.log('The Delete observable is now completed.');
        }
      );

  }

  approve(video: Video) {
    video.approved = 1;

    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    );
    this.http.put('http://localhost:3000/youtube/' + video.id,
      video,
      { headers })
      .subscribe(
        val => {
          this.changeVideos.emit(this.videos);
          console.log('Put call successful value returned in body', val);
        },
        error => {
          console.log('Put call in error', error);
          this.success.next(error);
          this.alertType = 'danger';
        },
        () => {
          console.log('The Put observable is now completed.');
        }
      );
  }
}
