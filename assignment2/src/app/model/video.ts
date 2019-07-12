import { HttpClient, } from '@angular/common/http';

export class Video {
    public id: number;
    public name: string;
    public url: string;
    public likeNum: number;
    public dislikeNum: number;
    public status: string;
    public approved: number;
    public currentStatus: string;
    public exitplayprogress: number;

    constructor() {
    }

}
