import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({ name: 'emailLink' })
export class EmailLinkPipe implements PipeTransform {
  transform(email: string): string {
    if (email) {
      return 'mailto:' + email;
    }
    return '';
  }
}
