import {Component, Output, EventEmitter, OnInit, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, ActionSheet} from 'ionic-angular';
import {Image} from '../../models/image';
import {ImagePicker} from 'ionic-native';
import {Config} from '../../config/config';
import * as _ from 'lodash';
import {Cloudinary} from '../../storage/cloudinary';
import {UploadingImage} from '../../models/uploading-image';
import {Subject} from 'rxjs';
import 'progressbar.js';

@Component({
  selector: 'asb-img-uploader-input',
  templateUrl: 'build/components/img-uploader-input/img-uploader-input.html',
  directives: [IONIC_DIRECTIVES]
})
export class ImgUploaderInput implements OnInit {
  @Input() images: Image[];
  @Output() uploadComplete: EventEmitter<Image> = new EventEmitter<Image>();
  @Output() onDeleteImg: EventEmitter<Image> = new EventEmitter<Image>();
  uploadingImages: UploadingImage[] = [];

  constructor(
    private config: Config,
    private cloudinary: Cloudinary,
    private nav: NavController
    ) {
  }

  ngOnInit() { }

  pickNewImgs() {
    ImagePicker.getPictures({
      width: this.config.imgUpload.maxWidth,
      height: this.config.imgUpload.maxHeight,
      quality: this.config.imgUpload.quality
    }).then((results) => {
      console.log(results);
      let newImages = _.map(results, (src, index) => new UploadingImage(index, src, 0));
      this.uploadingImages = this.uploadingImages.concat(newImages);
      let imgObservables = _.map(newImages, (i: UploadingImage) => {
        return this.uploadImage(i);
      });
      console.log(this.uploadingImages);
    });
  }

  uploadImage(image: UploadingImage) {
    return this.cloudinary
      .uploadImage(image.src, (progress: number) => {
      console.log('PROGRESSS' + progress)
      image.progress = progress;
    })
      .subscribe((f) => {
      console.log(f);
      let jsonResponse = JSON.parse(f.response);
      image.id = jsonResponse.public_id;
      image.src = jsonResponse.url;
      image.progress = 100;
      this.onUploadComplete(image);
    })
  }

  onUploadComplete(image: UploadingImage) {
    this.uploadingImages = _.reject(this.uploadingImages, i => i.id === image.id);
    this.uploadComplete.emit(Image.fromUploadingImage(image));
  }

  showImgActions(img: Image) {
    let actionSheet = ActionSheet.create({
      title: 'Immagine',
      buttons: [
        {
          text: 'Cancella',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.onDeleteImg.emit(img);
          }
        },
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }

}
