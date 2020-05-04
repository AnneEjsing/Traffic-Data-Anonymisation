import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import * as global from "./dispatcherConnection.service";
import { videoSettings, recorded_video } from '../_models/video';
import { Observable } from 'rxjs';
import { Http, ResponseContentType } from '@angular/http';

@Injectable()
export class VideoService {
    constructor(
        private http: HttpClient,
        private other: Http,
    ) { }

    readonly dispatcherUrl = global.dispatcherUrl;

    async getSettings(): Promise<videoSettings> {
        return this.http.get<videoSettings>(this.dispatcherUrl + "settings/get", this.constructHttpOptions()).toPromise();
    }

    async updateSettings(newSettings: videoSettings): Promise<any> {
        return this.http.post<any>(this.dispatcherUrl + "settings/update", newSettings, this.constructHttpOptions()).toPromise();
    }

    async list_recorded_videos(): Promise<recorded_video[]> {
        return this.http.get<recorded_video[]>(this.dispatcherUrl + "video/list/user_id", this.constructHttpOptions()).toPromise();
    }

    downloadFile(video_id: string): Observable<any> {
        return this.other.get(this.dispatcherUrl + 'video/download/' + video_id, { responseType: ResponseContentType.Blob });
    }

    constructHttpOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('session_token'),
            })
        };

        return httpOptions;
    }
}

