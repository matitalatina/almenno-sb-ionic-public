import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Post} from '../../models/post';
import {LocationInput} from '../location-input/location-input';
import {Location} from '../../models/location';
import {Geolocator} from '../../services/geolocator';
import {ImgUploaderInput} from '../img-uploader-input/img-uploader-input';
import {Subject} from 'rxjs';
import {Image} from '../../models/image';

@Component({
  selector: 'asb-post-form',
  templateUrl: 'build/components/post-form/post-form.html',
  directives: [IONIC_DIRECTIVES, LocationInput, ImgUploaderInput]
})
export class PostForm {
  @Input() post: Post;

  constructor(
    private geolocator: Geolocator
    ) {
  }

  onTogglePosition(enabled: boolean) {
    console.log(enabled)
    if (!enabled) {
      this.post.location = null;
    }
  }

  onLocationChange(location: Location) {
    console.log('CHANGEEEEE')
    console.log(location);
    this.post.location = location;
  }

  imgUploadComplete(image: Image) {
    this.post.photos.push(image);
  }

  imgDelete(image: Image) {
    this.post.photos = _.reject(this.post.photos, i => i.id == image.id);
  }


}
