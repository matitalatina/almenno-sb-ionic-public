import {UploadingImage} from './uploading-image';

export class Image {
  constructor(
    public id: string,
    public src: string,
    public title?: string
    ) { }

  static fromUploadingImage(img: UploadingImage): Image {
    return new Image(img.id, img.src);
  }
}
