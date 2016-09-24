import {Pipe, PipeTransform} from 'angular2/core';
import {HourRange} from '../models/hour-range';
@Pipe({ name: 'hourRange' })
export class HourRangePipe implements PipeTransform {
  transform(value: HourRange): string {
    if (value) {
      var result = value.from || '';
      result += value.to && value.to.length > 0 ? ' - ' + value.to : '';
      result += value.appointment ? ' (appuntamento)' : '';
      return result;
    }
    return '';
  }
}
