import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({ name: 'postTypeIcon' })
export class PostTypeIconPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      switch (value) {
        case 'party':
          return 'fa fa-smile-o';
        case 'animals':
          return 'ion ion-md-paw';
        case 'issue':
          return 'fa fa-warning';
        case 'event':
          return 'fa fa-calendar';
        case 'reminder':
          return 'ion ion-md-information-circle';
        default:
          return '';
      }
    }
    return '';
  }
}
