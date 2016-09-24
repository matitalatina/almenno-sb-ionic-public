import {HourRange} from './hour-range'
export class DayHours {
  constructor(
    public day: number,
    public hourRanges: HourRange[]
    ) { }
}
