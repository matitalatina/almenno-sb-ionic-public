import {NamedGroup} from '../models/named-group';
import {Office} from '../models/office';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable, Observer}     from 'rxjs';
import {Config} from '../config/config';
import {StaticDataProvider} from './static-data-provider';
import {Image} from '../models/image';
import * as _ from 'lodash';

@Injectable()
export class Cloudinary {
  constructor(
    private config: Config,
    private http: Http
    ) { }

  private apiEndpoint: string = this.config.imgUpload.endpoint;
  private uploadPreset: string = this.config.imgUpload.uploadPreset;

  uploadImage(src: string, onProgress?: (progress: number) => void): Observable<FileUploadResult> {
    let uploadOptions = {
      params: { 'upload_preset': this.uploadPreset }
    };
    let ft = new FileTransfer();
    if (onProgress) {
      ft.onprogress = (event: ProgressEvent) => {
        var percentage = event.loaded / event.total * 100;
        onProgress(percentage);
      }
    }

    return new Observable<FileUploadResult>((observer: Observer<FileUploadResult>) => {
      ft.upload(src, this.apiEndpoint + '/upload', (result) => {
        observer.next(result);
        observer.complete();
      }, observer.error, uploadOptions);
    });
  }

  deleteImage(image: Image): Observable<Response> {
    return this.http.post(this.apiEndpoint + '/destroy', 'public_id=' + image.id + '&api_key=' + this.config.imgUpload.apiKey);
  }
}
