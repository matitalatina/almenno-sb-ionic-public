import {DayHours} from './day-hours';

export class Person {
  constructor(
    public id: string,
    public title: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public roleSecond: string,
    public img: string,
    public description: string,
    public reception: DayHours[],
    public phone?: string
    ) { }
}
