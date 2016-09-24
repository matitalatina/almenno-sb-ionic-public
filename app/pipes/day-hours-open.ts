import {Pipe, PipeTransform} from 'angular2/core';
import {DayHours} from '../models/day-hours';
import {HourRange} from '../models/hour-range';
import * as _ from 'lodash';
import * as moment from 'moment';

@Pipe({ name: 'dayHoursOpen' })
export class DayHoursOpenPipe implements PipeTransform {
  transform(dayHoursList: DayHours[]): boolean {
    if (dayHoursList) {
      const today = moment();
      const todayDayHours = _.find(dayHoursList, (d: DayHours) => d.day === today.weekday());

      if (!todayDayHours) {
        return false;
      }

      return _.some(todayDayHours.hourRanges, (h: HourRange) => {
        const splittedTimeFrom = h.from.split(':');
        const splittedTimeTo = h.to.split(':');
        if (splittedTimeFrom.length < 2 || splittedTimeTo.length < 2) {
          return false;
        }

        return parseInt(splittedTimeFrom[0]) <= today.hours() && today.hours() <= parseInt(splittedTimeTo[0]) &&
          parseInt(splittedTimeFrom[1]) <= today.minutes() && today.minutes() <= parseInt(splittedTimeTo[1]);

      });
    }
    return false;
  }
}
