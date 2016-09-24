import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({ name: 'toDayText' })
export class ToDayTextPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== null || value !== undefined) {
      switch (value) {
        case 0:
          return 'Domenica';
        case 1:
          return 'Lunedì';
        case 2:
          return 'Martedì';
        case 3:
          return 'Mercoledì';
        case 4:
          return 'Giovedì';
        case 5:
          return 'Venerdì';
        case 6:
          return 'Sabato';
        default:
          return '';
      }
    }
    return '';
  }
}
