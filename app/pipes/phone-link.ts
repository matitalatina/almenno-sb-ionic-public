import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({ name: 'phoneLink' })
export class PhoneLinkPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return 'tel://' + value.replace(/[^0-9+]/g, '');
    }
    return '';
  }
}
